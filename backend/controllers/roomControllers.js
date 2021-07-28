import gameroomModel from '../models/gameroomModel.cjs';
import categoryModel from '../models/categoryModel.cjs';

const roomController = { findingRoom, getCategoryForRoom };

async function findingRoom(req, res) {
  try {
    const all = await gameroomModel.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ msg: "Can't find any room!" });
  }
}

async function getCategoryForRoom(req, res) {
  try {
    const categories = await categoryModel.find();
    if (categories.length === 0)
      res.status(404).json({ message: "Can't find category" });

    const categoriesRefactor = categories.map((category) => ({
      id: category._id,
      name: category.categoryName,
    }));

    res.status(200).json({
      message: 'successfully',
      categories: categoriesRefactor,
    });
  } catch (err) {
    res.status(500).json({ message: 'error from server' });
  }
}

export default roomController;
