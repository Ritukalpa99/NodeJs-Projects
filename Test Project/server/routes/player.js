const express = require('express');
const router = express.Router();

const playerController = require('../controllers/player');

router.get('/', playerController.getAllPlayers);

router.post('/', playerController.createPlayer);

router.get('/:name', playerController.getPlayerByName);

router.put('/:id', playerController.updatePlayer);