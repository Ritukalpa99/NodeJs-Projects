const Chat = require("../model/chat");
const { Op } = require("sequelize");

exports.getMessage = async (req, res) => {
	try {
		const lastId = req.query.id;
		const gId = req.query.gId;
		const chat = await Chat.findAll({
			where: { id: { [Op.gt]: lastId }, groupdId: gId },
		});
		res.status(200).json({ success: true, chat });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
};

exports.postMessage = async (req, res) => {
	try {
		const { message, username, groupdId } = req.body;
		const chat = await req.user.createChat({ message, username, groupdId });
		res.status(201).json({
			success: true,
			message: "Group message sent",
			chat,
		});
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
};
