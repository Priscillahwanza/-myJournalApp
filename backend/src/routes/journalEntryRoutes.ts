import { Router } from 'express';
import {
  createJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  updateJournalEntry,
  deleteJournalEntry,
} from '../controllers/journalEntryController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createJournalEntry);
router.get('/', authenticateToken, getJournalEntries);
router.get('/:id', authenticateToken, getJournalEntryById);
router.put('/:id', authenticateToken, updateJournalEntry);
router.delete('/:id', authenticateToken, deleteJournalEntry);

export default router;
