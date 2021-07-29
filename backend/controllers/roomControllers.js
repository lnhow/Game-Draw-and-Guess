import gameroomModel from '../models/gameroomModel.cjs';
import categoryModel from '../models/categoryModel.cjs';

const roomController = { findingRoom, getCategories };

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
    // const all = await category.find();
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

async function getCategories(req, res) {
  try {
    const categories = await categoryModel.find();

    const formattedCategories = categories.map((category) => ({
      id: category._id,
      name: category.categoryName,
    }));

    res.status(200).json({
      message: 'successfully',
      categories: formattedCategories,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default roomController;
