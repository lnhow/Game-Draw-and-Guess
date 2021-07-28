import gameroomModel from '../models/gameroomModel.cjs';

const roomController = {
  findingRoom,
  createRoom,
  getSingleRoom,
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
  try {
    const gameroom = new gameroomModel(req.body);
    await gameroom.save();

    res.status(200).json({
      message: 'create room successfully',
      gameroomInfo: gameroom,
    });
  } catch (err) {
    res.status(500).json({ message: 'server error' });
  }
}

async function getSingleRoom(req, res) {
  try {
    const gameroom = gameroomModel.findById(req.params.id);
    res.json(gameroom);
  } catch (err) {
    res.status(500).json({ msg: 'Unavailable room!' });
  }
}

async function updateRoom(req, res) {
  try {
    const gameroom = gameroomModel.findByIdAndDelete(req.params.id);

    if (!gameroom) {
      res.status(404).json({ msg: 'Room not found!' });
    } else {
      gameroom.roomName = req.body.roomName;
      gameroom.hostUserId = req.body.hostUserId;
      gameroom.maxPlayer = req.body.maxPlayer;
      gameroom.timePerRound = req.body.timePerRound;
      gameroom.private = req.body.private;
      gameroom.save();
      res.status(200).json({ gameroom, msg: 'Update room successfully!' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Invalid room. Cannot update room!' });
  }
}

async function deleteRoom(req, res) {
  try {
    gameroomModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Delete room successfully!' });
  } catch (err) {
    res.status(500).json({ msg: 'Invalid room. Cannot delete room!' });
  }
}

export default roomController;
