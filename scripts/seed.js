const mongoose = require('mongoose');
const Task = require('./models/task');
const User = require('./models/users');
const Category = require('./models/category');

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/todolist', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Task.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});

    const users = await User.insertMany([
      { username: 'Alice', email: 'alice@example.com', password: 'password1' },
      { username: 'Bob', email: 'bob@example.com', password: 'password2' },
    ]);

    const categories = await Category.insertMany([
      { name: 'Personal' },
      { name: 'Work' },
    ]);

    const tasks = await Task.insertMany([
      { title: 'Buy groceries', completed: false, category: categories[0]._id, user: users[0]._id },
      { title: 'Complete assignment', completed: true, category: categories[1]._id, user: users[1]._id },
    ]);

    console.log('Database seeded');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();