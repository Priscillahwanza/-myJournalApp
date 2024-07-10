import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {sequelize} from './config/database';
import authRoutes from './routes/authRoutes';
import journalEntryRoutes from './routes/journalEntryRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/journalEntries', journalEntryRoutes);

export default app;
