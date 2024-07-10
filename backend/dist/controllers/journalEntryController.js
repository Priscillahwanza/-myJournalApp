"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJournalEntry = exports.updateJournalEntry = exports.getJournalEntryById = exports.getJournalEntries = exports.createJournalEntry = void 0;
const JournalEntry_1 = __importDefault(require("../models/JournalEntry"));
const createJournalEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, category, date } = req.body;
    const userId = req.user.userId;
    try {
        const journalEntry = yield JournalEntry_1.default.create({ title, content, category, date, userId });
        res.status(201).json(journalEntry);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create journal entry' });
    }
});
exports.createJournalEntry = createJournalEntry;
const getJournalEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const journalEntries = yield JournalEntry_1.default.findAll({ where: { userId } });
        res.json(journalEntries);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch journal entries' });
    }
});
exports.getJournalEntries = getJournalEntries;
const getJournalEntryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { id } = req.params;
    try {
        const journalEntry = yield JournalEntry_1.default.findOne({ where: { id, userId } });
        if (!journalEntry) {
            return res.status(404).json({ error: 'Journal entry not found' });
        }
        res.json(journalEntry);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch journal entry' });
    }
});
exports.getJournalEntryById = getJournalEntryById;
const updateJournalEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { id } = req.params;
    const { title, content, category, date } = req.body;
    try {
        const journalEntry = yield JournalEntry_1.default.findOne({ where: { id, userId } });
        if (!journalEntry) {
            return res.status(404).json({ error: 'Journal entry not found' });
        }
        yield journalEntry.update({ title, content, category, date });
        res.json(journalEntry);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update journal entry' });
    }
});
exports.updateJournalEntry = updateJournalEntry;
const deleteJournalEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { id } = req.params;
    try {
        const journalEntry = yield JournalEntry_1.default.findOne({ where: { id, userId } });
        if (!journalEntry) {
            return res.status(404).json({ error: 'Journal entry not found' });
        }
        yield journalEntry.destroy();
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete journal entry' });
    }
});
exports.deleteJournalEntry = deleteJournalEntry;
