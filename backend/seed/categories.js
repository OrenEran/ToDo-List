const mongoose = require('mongoose');
const Category = require('../models/Category');

const seedCategories = async () => {
  try {
    const existingCategories = await Category.find({});

    if (existingCategories.length > 0) {
      console.log('Categories already exist. Skipping seeding.');
      return;
    }

    const categories = [
      { name: 'Work', icon: '📁' },
      { name: 'Personal', icon: '🏠' },
      { name: 'Urgent', icon: '⚠️' },
      { name: 'Shopping', icon: '🛒' },
      { name: 'Scheduled', icon: '⏳' }
    ];
    
    for (let category of categories) {
      await Category.updateOne({ name: category.name }, category, { upsert: true });
    }

    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Failed to seed categories', error);
  }
};

module.exports = seedCategories;
