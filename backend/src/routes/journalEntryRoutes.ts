// src/routes/journalEntryRoutes.ts
import { Router } from 'express';
import { createEntry, getEntries, updateEntry, deleteEntry } from '../controllers/journalEntryController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, createEntry);
router.get('/', authenticateToken, getEntries);
router.put('/:id', authenticateToken, updateEntry);
router.delete('/:id', authenticateToken, deleteEntry);

export default router;
