import { Request, Response } from 'express';
import JournalEntry from '../models/JournalEntry';

export const createJournalEntry = async (req: Request, res: Response) => {
  const { title, content, category, date } = req.body;
  const userId = (req.user as any).userId;

  try {
    const journalEntry = await JournalEntry.create({ title, content, category, date, userId });
    res.status(201).json(journalEntry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
};

export const getJournalEntries = async (req: Request, res: Response) => {
  const userId = (req.user as any).userId;

  try {
    const journalEntries = await JournalEntry.findAll({ where: { userId } });
    res.json(journalEntries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
};

export const getJournalEntryById = async (req: Request, res: Response) => {
  const userId = (req.user as any).userId;
  const { id } = req.params;

  try {
    const journalEntry = await JournalEntry.findOne({ where: { id, userId } });
    if (!journalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json(journalEntry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch journal entry' });
  }
};

export const updateJournalEntry = async (req: Request, res: Response) => {
  const userId = (req.user as any).userId;
  const { id } = req.params;
  const { title, content, category, date } = req.body;

  try {
    const journalEntry = await JournalEntry.findOne({ where: { id, userId } });
    if (!journalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    await journalEntry.update({ title, content, category, date });
    res.json(journalEntry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update journal entry' });
  }
};

export const deleteJournalEntry = async (req: Request, res: Response) => {
  const userId = (req.user as any).userId;
  const { id } = req.params;

  try {
    const journalEntry = await JournalEntry.findOne({ where: { id, userId } });
    if (!journalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    await journalEntry.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete journal entry' });
  }
};
