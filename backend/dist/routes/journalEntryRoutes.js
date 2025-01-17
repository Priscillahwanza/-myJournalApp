"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const journalEntryController_1 = require("../controllers/journalEntryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authenticateToken, journalEntryController_1.createJournalEntry);
router.get('/', authMiddleware_1.authenticateToken, journalEntryController_1.getJournalEntries);
router.get('/:id', authMiddleware_1.authenticateToken, journalEntryController_1.getJournalEntryById);
router.put('/:id', authMiddleware_1.authenticateToken, journalEntryController_1.updateJournalEntry);
router.delete('/:id', authMiddleware_1.authenticateToken, journalEntryController_1.deleteJournalEntry);
exports.default = router;
