import { Response } from 'express';
import JournalEntry from '../models/journalEntry';
import { AuthenticatedRequest } from '../types/express';

const createEntry = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content, category, date } = req.body;
  const userId = req.userId; // Assumes middleware sets req.userId
  try {
    const entry = await JournalEntry.create({ title, content, category, date, userId });
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create entry' });
  }
};

const getEntries = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId; // Assumes middleware sets req.userId
  try {
    const entries = await JournalEntry.findAll({ where: { userId } });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
};

const updateEntry = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, content, category, date } = req.body;
  const userId = req.userId; // Assumes middleware sets req.userId
  try {
    const entry = await JournalEntry.findOne({ where: { id, userId } });
    if (entry) {
      entry.title = title || entry.title;
      entry.content = content || entry.content;
      entry.category = category || entry.category;
      entry.date = date || entry.date;
      await entry.save();
      res.json(entry);
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update entry' });
  }
};

const deleteEntry = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId; // Assumes middleware sets req.userId
  try {
    const entry = await JournalEntry.findOne({ where: { id, userId } });
    if (entry) {
      await entry.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
};

export { createEntry, getEntries, updateEntry, deleteEntry };
