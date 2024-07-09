// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import journalEntryRoutes from './routes/journalEntryRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/journalEntries', journalEntryRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
