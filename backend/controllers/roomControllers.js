import gameroomModel from '../models/gameroomModel.cjs';
import categoryModel from '../models/categoryModel.cjs';

const roomController = { findingRoom, getCategories };

async function findingRoom(req, res) {
  try {
    const all = await gameroomModel.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ msg: "Can't find any room!" });
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
    res.status(500).json({ message: 'error from server' });
  }
}

export default roomController;
