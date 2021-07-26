import gameroomModel from '../models/gameroomModel.cjs';

const roomController = { findingRoom };

async function findingRoom(req, res) {
  try {
    const all = await gameroomModel.findOne({ maxPlayer: 10 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ msg: "Can't find any room!" });
  }
}

export default roomController;
