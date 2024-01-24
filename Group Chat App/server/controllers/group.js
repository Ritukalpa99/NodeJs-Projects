const UserGroup = require("../model/usergroup");

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
