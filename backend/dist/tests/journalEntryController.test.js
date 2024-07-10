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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const testConfig_1 = __importDefault(require("../config/testConfig"));
const User_1 = __importDefault(require("../models/User"));
const JournalEntry_1 = __importDefault(require("../models/JournalEntry"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testConfig_1.default.sync({ force: true });
    // Create a test user
    const hashedPassword = yield bcrypt_1.default.hash('testpassword', 10);
    yield User_1.default.create({ username: 'testuser', password: hashedPassword });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testConfig_1.default.close();
}));
describe('Journal Entry Controller', () => {
    let token;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const loginResponse = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
        token = loginResponse.body.token;
    }));
    it('should create a new journal entry', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/journalEntries')
            .set('Authorization', `Bearer ${token}`)
            .send({
            title: 'Test Entry',
            content: 'This is a test entry',
            category: 'Test',
            date: new Date(),
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'Test Entry');
    }));
    it('should get all journal entries of the logged-in user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/journalEntries')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    it('should get a specific journal entry by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const newEntry = yield JournalEntry_1.default.create({
            title: 'Specific Entry',
            content: 'This is a specific entry',
            category: 'Test',
            date: new Date(),
            userId: 1,
        });
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/api/journalEntries/${newEntry.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Specific Entry');
    }));
    it('should update a specific journal entry', () => __awaiter(void 0, void 0, void 0, function* () {
        const newEntry = yield JournalEntry_1.default.create({
            title: 'Update Entry',
            content: 'This is an entry to update',
            category: 'Test',
            date: new Date(),
            userId: 1,
        });
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/api/journalEntries/${newEntry.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            title: 'Updated Entry',
            content: 'This entry has been updated',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated Entry');
    }));
    it('should delete a specific journal entry', () => __awaiter(void 0, void 0, void 0, function* () {
        const newEntry = yield JournalEntry_1.default.create({
            title: 'Delete Entry',
            content: 'This is an entry to delete',
            category: 'Test',
            date: new Date(),
            userId: 1,
        });
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/journalEntries/${newEntry.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);
    }));
});
