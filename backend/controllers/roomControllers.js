import gameroomModel from '../models/gameroomModel.cjs';

const roomController = { findingRoom };

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
    res.status(500).json({
      message: "Can't find any room!",
    });
  }
}

export default roomController;
