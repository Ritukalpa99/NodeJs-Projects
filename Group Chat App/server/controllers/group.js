const Group = require("../model/group");
const UserGroup = require("../model/usergroup");
const User = require("../model/user");
const Chat = require("../model/chat");
const { Op } = require("sequelize");

exports.createGroup = async (req, res) => {
	try {
		const { name, isAdmin } = req.body;
		const group = await req.user.createGroup({ name });
		await UserGroup.update({ isAdmin }, { where: { groupId: group.id } });
		res.status(201).json({ message: "created successfully", group });
	} catch (err) {
		res.status(500).json({ message: "server error" });
	}
};

exports.makeAdmin = async (req, res) => {
	try {
		const { email, gId } = req.body;
		console.log(`${email}, ${gId}`);
		const user = await User.findOne({ where: { email: email } });
		await UserGroup.update(
			{ isAdmin: true },
			{ where: { userId: user.id, groupId: gId } }
		);
		res.status(200).json({ message: "user is now admin" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const { email, gId } = req.body;
		const adminCheck = await UserGroup.findOne({
			where: { userId: req.user.id, groupId: gId },
		});
		if (adminCheck === false) {
			return res.status(400).json({ message: "You are not an admin" });
		}
		const userToRemove = await User.findOne({ where: { email } });
		const result = await UserGroup.destroy({
			where: { userId: userToRemove.id, groupId: gId },
		});
		if (result == 0)
			return res
				.status(404)
				.json({ message: "User not present in the group" });
		res.status(200).json({
			success: true,
			message: "User removed from the group",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, message: err });
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

exports.getGroupById = async (req, res) => {
	try {
		const gId = req.params.gId;
		const group = await req.user.getGroups({
			attributes: ["id", "name"],
			where: { id: gId },
		});
		res.status(200).json({ success: true, group });
	} catch (err) {
		res.status(500).json({ message: "server error" });
	}
};

exports.getUsers = async (req, res) => {
	try {
		const gId = req.query.gId;
		// const gId = req.params.gId;
		// console.log(gId);
		if (gId != null) {
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
		} else if (gId == null) {
			const user = await User.findAll({
				attributes: ["id", "name", "email"],
				where: { id: { [Op.ne]: req.user.id } },
			});
			res.status(200).json({ success: true, user });
		}
	} catch (err) {
		console.log(err);
	}
};

exports.addUserToGroup = async (req, res) => {
	try {
		const { groupId, email, isAdmin } = req.body;
		const adminCheck = await UserGroup.findOne({
			where: { userId: req.user.id, groupId: groupId },
		});
		if (adminCheck === false) {
			return res.status(400).json({ message: "You are not an admin" });
		}

		const userToAdd = await User.findOne({ where: { email } });
		const userGroup = await UserGroup.create({
			userId: userToAdd.id,
			groupId: groupId,
		});

		if (isAdmin === true) {
			await UserGroup.update(
				{ isAdmin: isAdmin },
				{ where: { userId: userToAdd.id, groupId: groupId } }
			);
		}
		res.status(201).json({ message: "added user to the group", userGroup });
	} catch (err) {
		console.log(err);
		res.status(404).json({ message: "user already in group" });
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
