import wordModel from '../models/wordModel.cjs';

const wordController = {
  getWords,
  createWord,
  deleteWord,
  updateWord,
};

async function getWords(req, res) {
  const all = await wordModel.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: 'categoryId',
        as: 'category1',
      },
    },
    {
      $unwind: '$category1',
    },
    {
      $lookup: {
        from: 'gamerooms',
        localField: 'categoryId',
        foreignField: 'categoryId',
        as: 'category2',
      },
    },
    {
      $unwind: '$category2',
    },
  ]);
  res.json(all);
}

async function createWord(req, res) {
  const existedWword = await wordModel.findOne({
    id: req.body._id,
  });

  if (existedWword) {
    res.status(400).json({ message: 'Word already exists' });
  }

  const word = new wordModel(req.body);

  try {
    await word.save();

    res.status(200).json({
      message: 'Create word successfully',
      word: word.word,
      category: word.category,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateWord(req, res) {
  try {
    const word = wordModel.findByIdAndUpdate(req.params.id);

    if (!word) {
      res.status(404).json({ message: 'Word not found' });
    } else {
      word.category = req.body.category;
      word.word = req.body.word;
      word.save();
      res.status(200).json({
        wordId: word._id,
        category: word.category,
        message: 'Update word successfully',
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteWord(req, res) {
  try {
    const word = wordModel.findByIdAndDelete(req.params.id);

    if (!word) {
      res.status(404).json({ message: 'Word does not exist' });
    }

    await word.save();

    res.status(200).json({ message: 'Delete word successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Invalid word. Cannot delete word' });
  }
}

export default wordController;
