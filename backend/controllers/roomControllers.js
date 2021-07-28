import gameroomModel from '../models/gameroomModel.cjs';
import categoryModel from '../models/categoryModel.cjs';

const roomController = { findingRoom };

async function findingRoom(req, res) {
  try {
    const all = await gameroomModel.aggregate([
      {
        $lookup: {
          from: 'items',
          localField: 'item', // field in the orders collection
          foreignField: 'item', // field in the items collection
          as: 'fromItems',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$fromItems', 0] }, '$$ROOT'],
          },
        },
      },
      { $project: { fromItems: 0 } },
    ]);
    // element.categoryName = category.categoryName;
    res.json(all);
  } catch (err) {
    res.status(500).json({ msg: "Can't find any room!" });
  }
}

export default roomController;
