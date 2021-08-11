import categoryModel from '../models/categoryModel.cjs';

const categoryController = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

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

async function createCategory(req, res) {
  const categoryName = req.body.categoryName;
  if (!categoryName) return res.status(400).json({ message: 'no data' });

  const category = new categoryModel({ categoryName });

  try {
    await category.save();
    res.status(201).json({ message: 'create success' });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}

async function updateCategory(req, res) {
  const categoriesId = req.params.id;
  const categoryName = req.body.categoryName;
  if (!categoriesId || !categoryName)
    return res.status(400).json({ message: 'no data' });

  const category = await categoryModel.findById(categoriesId);
  if (!category) return res.status(404).json({ message: 'no data' });
  category.categoryName = categoryName;

  try {
    await category.save();
    res.status(200).json({ message: 'update success' });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}

async function deleteCategory(req, res) {
  const categoriesId = req.params.id;
  if (!categoriesId) return res.status(400).json({ message: 'no data' });

  try {
    await categoryModel.deleteById(categoriesId);
    res.status(200).json({ message: 'delete success' });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
}

export default categoryController;
