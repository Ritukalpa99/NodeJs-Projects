const Player = require("../model/player");
const { Op } = require("sequelize");

exports.createPlayer = async (req, res) => {
	try {
		const player = await Player.create(req.body);
		res.json(player);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getAllPlayers = async (req, res) => {
	try {
		const player = await Player.findAll();
		res.json(player);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getPlayerByName = async (req, res) => {
	const { name } = req.params;
	console.log(name);
	try {
		// const player = await Player.findAll({where: {name}})
		const player = await Player.findAll({
			where: { name: { [Op.like]: `%${name.trim()}%` } },
		});
		res.json(player);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.updatePlayer = async (req, res) => {
	const { id } = req.params;
	try {
		const [updated] = await Player.update(req.body, {
			where: { id },
		});
		if (updated) {
			const updatedPlayer = await Player.findOne({ where: { id } });
			return res.json(updatedPlayer);
		}
		throw new Error("Player not found");
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
