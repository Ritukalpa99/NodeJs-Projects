const Chat = require("../model/chat");
const { Op } = require("sequelize");
const S3Service = require("../services/S3services");
const fs = require("fs");

exports.getMessage = async (req, res) => {
	try {
		const lastId = req.query.id;
		const gId = req.query.gId;
		// console.log(lastId);
		const chat = await Chat.findAll({
			attributes: ["id", "username", "message", "userId", "groupId"],
			where: { id: { [Op.gt]: lastId }, groupId: gId },
		});
		res.status(200).json({ success: true, chat });
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
};

exports.postMessage = async (req, res) => {
	try {
		const { message, username, groupId } = req.body;
		const chat = await req.user.createChat({ message, username, groupId });
		res.status(201).json({
			success: true,
			message: "Group message sent",
			chat,
		});
	} catch (err) {
		res.status(400).json({ success: false, message: err });
	}
};

exports.uploadFile = async (req, res) => {
	try {
		// console.log(req.file)
		const filename = `user-${req.user.id}/${
			req.file.filename
		}_${new Date()}.png`;
		// const filename =  `user-test`
		const filePath = req.file.path;
		const fileData = fs.readFileSync(filePath);
		const fileURL = await S3Service.uploadToS3(fileData, filename);
		res.status(200).json({ success: true, fileURL });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
};
