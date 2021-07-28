import gameroomModel from '../models/gameroomModel.cjs';
import { createRoomValidation } from '../utils/validation.cjs';

const mongoose_delete = require('mongoose-delete');

const roomController = {
  findingRoom,
  createRoom,
  deleteRoom,
  updateRoom,
};

async function findingRoom(req, res) {
  try {
    const all = await gameroomModel.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ msg: "Can't find any room!" });
  }
}

async function createRoom(req, res) {
  const { error } = createRoomValidation(req.body);

  if (error) return res.status(400).json({ msg: error.details[0].message });

  const gameroom = new gameroomModel(req.body);

  try {
    await gameroom.save();

    res.status(200).json({
      msg: 'create room successfully',
      roomId: gameroom._id,
      hostId: gameroom.hostUserId,
    });
  } catch (err) {
    res.status(500).json({ msg: 'server error' });
  }
}

async function updateRoom(req, res) {
  try {
    const gameroom = gameroomModel.findByIdAndUpdate(req.params.id);

    if (!gameroom) {
      res.status(404).json({ msg: 'Room not found!' });
    } else {
      gameroom.roomName = req.body.roomName;
      gameroom.hostUserId = req.body.hostUserId;
      gameroom.maxPlayer = req.body.maxPlayer;
      gameroom.timePerRound = req.body.timePerRound;
      gameroom.private = req.body.private;
      gameroom.save();
      res.status(200).json({
        roomId: gameroom._id,
        roomName: gameroom.roomName,
        hostId: gameroom.hostUserId,
        msg: 'Update room successfully!',
      });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Invalid room. Cannot update room!' });
  }
}

async function deleteRoom(req, res) {
  try {
    const gameroom = gameroomModel.findById(req.params.id);

    if (!gameroom) {
      res.status(404).json({ msg: 'Room does not exist!' });
    }

    gameroom.plugin(mongoose_delete, { deletedAt: true });
    await gameroom.save();

    res.status(200).json({ msg: 'Delete room successfully!' });
  } catch (err) {
    res.status(500).json({ msg: 'Invalid room. Cannot delete room!' });
  }
}

export default roomController;
