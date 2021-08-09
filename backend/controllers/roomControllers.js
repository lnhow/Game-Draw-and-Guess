import gameroomModel from '../models/gameroomModel.cjs';
import { createRoomValidation } from '../utils/validation.cjs';
import { getUserInfosInRoom } from '../socket/controllers/room.js';
import RoomState from '../models/roomStateModel.js';

const roomController = {
  findingRoom,
  createRoom,
  deleteRoom,
  updateRoom,
};

async function findingRoom(req, res) {
  const all = await gameroomModel.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
  ]);

  const allRoom = all.map((room) => ({
    _id: room._id,
    roomName: room.roomName,
    currentPlayer: getUserInfosInRoom(room._id.toString()).length,
    maxPlayer: room.maxPlayer,
    timePerRound: room.timePerRound,
    categoryName: room.category.categoryName,
    categoryId: room.categoryId,
    roomStatus: room.roomStatus,
  }));
  res.status(200).json({
    rooms: allRoom,
  });
}

async function createRoom(req, res) {
  //const { error } = createRoomValidation(req.body);

  //if (error) return res.status(400).json({ message: error.details[0].message });

  const roomName = req.body.roomName;
  const hostUserId = req.body.hostUserId;
  const maxPlayer = req.body.maxPlayer;
  const timePerRound = req.body.timePerRound;
  const isPrivate = req.body.isPrivate;
  const categoryId = req.body.category;
  const roomStatus = RoomState.CREATED;

  const gameroom = new gameroomModel({
    roomName,
    hostUserId,
    maxPlayer,
    timePerRound,
    isPrivate,
    categoryId,
    roomStatus,
  });

  console.log(gameroom);

  try {
    await gameroom.save();

    res.status(201).json({
      message: 'Create room successfully',
      roomId: gameroom._id,
      hostId: gameroom.hostUserId,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateRoom(req, res) {
  const { error } = createRoomValidation(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const gameroom = gameroomModel.findByIdAndUpdate(req.params.id);

    if (!gameroom) {
      res.status(404).json({ message: 'Room not found' });
    } else {
      gameroom.roomName = req.body.roomName;
      gameroom.hostUserId = req.body.hostUserId;
      gameroom.maxPlayer = req.body.maxPlayer;
      gameroom.timePerRound = req.body.timePerRound;
      gameroom.isPrivate = req.body.isPrivate;
      gameroom.categoryId = req.body.categoryId;
      gameroom.save();
      res.status(200).json({
        roomId: gameroom._id,
        roomName: gameroom.roomName,
        hostId: gameroom.hostUserId,
        message: 'Update room successfully',
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteRoom(req, res) {
  try {
    const gameroom = gameroomModel.findById(req.params.id);

    if (!gameroom) {
      res.status(404).json({ message: 'Room does not exist' });
    }

    await gameroom.save(gameroom.delete(req.params.id));

    res.status(200).json({ message: 'Delete room successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

export default roomController;
