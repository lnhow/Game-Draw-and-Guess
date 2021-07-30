import gameroomModel from '../models/gameroomModel.cjs';
import { createRoomValidation } from '../utils/validation.cjs';

const roomController = {
  findingRoom,
  createRoom,
  deleteRoom,
  updateRoom,
};

async function findingRoom(req, res) {
  try {
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
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$category', 0] }, '$$ROOT'],
          },
        },
      },
      { $project: { category: 0 } },
    ]);

    res.json({
      message: 'Get all rooms success',
      rooms: all,
    });
  } catch (err) {
    res.status(500).json({ message: "Can't find any room!" });
  }
}

async function createRoom(req, res) {
  // const { error } = createRoomValidation(req.body);
  
  // if (error) return res.status(400).json({ message: error.details[0].message });

  const gameroom = new gameroomModel(req.body);

  try {
    await gameroom.save();

    res.status(200).json({
      message: 'create room successfully',
      roomId: gameroom._id,
      hostId: gameroom.hostUserId,
    });
  } catch (err) {
    res.status(500).json({ message: 'server error' });
  }
}

async function updateRoom(req, res) {
  const { error } = createRoomValidation(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const gameroom = gameroomModel.findByIdAndUpdate(req.params.id);

    if (!gameroom) {
      res.status(404).json({ message: 'Room not found!' });
    } else {
      gameroom.roomName = req.body.roomName;
      gameroom.hostUserId = req.body.hostUserId;
      gameroom.maxPlayer = req.body.maxPlayer;
      gameroom.timePerRound = req.body.timePerRound;
      gameroom.private = req.body.private;
      gameroom.categoryId = req.body.categoryId;
      gameroom.save();
      res.status(200).json({
        roomId: gameroom._id,
        roomName: gameroom.roomName,
        hostId: gameroom.hostUserId,
        message: 'Update room successfully!',
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Invalid room. Cannot update room!' });
  }
}

async function deleteRoom(req, res) {
  try {
    const gameroom = gameroomModel.findById(req.params.id);

    if (!gameroom) {
      res.status(404).json({ message: 'Room does not exist!' });
    }

    await gameroom.save(gameroom.delete(req.params.id));

    res.status(200).json({ message: 'Delete room successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Invalid room. Cannot delete room!' });
  }
}

export default roomController;
