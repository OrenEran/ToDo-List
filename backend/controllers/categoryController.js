const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
  const { name, icon } = req.body;
  
  try {
    const newCategory = new Category({ name, icon });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};
