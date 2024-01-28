const Group = require("../model/group");
const UserGroup = require("../model/usergroup");
const User = require("../model/user");
const Chat = require("../model/chat");

exports.createGroup = async (req, res) => {
	try {
		const { name, isAdmin } = req.body;
		const group = await req.user.createGroup({ name });
		const groupUser = await UserGroup.update(
			{ isAdmin },
			{ where: { groupId: group.id } }
		);
		res.status(201).json({ message: "created successfully", group });
	} catch (err) {
		res.status(500).json({ message: "server error" });
	}
};

exports.getGroups = async (req, res) => {
	try {
		const groups = await req.user.getGroups({ attributes: ["id", "name"] });
		res.status(200).json({ success: true, groups });
	} catch (err) {
		res.status(500).json({ message: "server error" });
	}
};

exports.getUsers = async (req, res) => {
	try {
		// const gId = req.query.gId;
		const gId = req.params.gId;
		console.log(gId);
		const userGroupRes = await UserGroup.findAll({
			attributes: ["userId"],
			where: { groupId: gId },
		});
		let userIdArray = [];
		userGroupRes.forEach((id) => {
			userIdArray.push(id.userId);
		});
		const userData = await User.findAll({
			attributes: ["id", "name", "email"],
			include: [{ model: Group, where: { id: gId } }],
			where: { id: userIdArray },
		});
		res.status(200).json(userData);
	} catch (err) {
		console.log(err);
	}
};

exports.deleteGroup = async (req, res) => {
	try {
		const gId = req.params.gId;

		const adminCheck = await UserGroup.findOne({
			where: { userId: req.user.id, groupId: gId },
		});
		if (adminCheck.isAdmin === false) {
			return res.status(400).json({ message: "You are not admin" });
		}

		const chats = await Chat.findAll({
			attributes: ["id"],
			where: { groupId: gId },
		});
		let chatIdArray = [];
		chats.forEach((chat) => {
			chatIdArray.push(chat.id);
		});
		await Chat.destroy({ where: { id: chatIdArray } });
		await Group.destroy({ where: { id: gId } });
		res.status(200).json({ message: "Successfully deleted" });
	} catch (err) {
		console.log(err);
		res.status(500);
	}
};
