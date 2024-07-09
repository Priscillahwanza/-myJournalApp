// src/config/sync.ts
import sequelize from './database';
import User from '../models/user';
import JournalEntry from '../models/journalEntry';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Use { force: true } only for development
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Failed to synchronize database:', error);
  }
};

syncDatabase();
