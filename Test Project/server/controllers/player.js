const Player = require("../model/player");

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
    const {name} = req.params;
	try {
		const player = await Player.findOne({where: {name}})
		res.json(player);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.updatePlayer = async (req, res) => {
  
};
