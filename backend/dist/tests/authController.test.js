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
const testConfig_1 = __importDefault(require("../config/testConfig"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testConfig_1.default.sync({ force: true });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testConfig_1.default.close();
}));
describe('Auth Controller', () => {
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'testpassword' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', 'testuser');
    }));
    it('should login an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    }));
    it('should get the profile of the logged-in user', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginResponse = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
        const token = loginResponse.body.token;
        const profileResponse = yield (0, supertest_1.default)(app_1.default)
            .get('/api/auth/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(profileResponse.status).toBe(200);
        expect(profileResponse.body).toHaveProperty('username', 'testuser');
    }));
    it('should update the profile of the logged-in user', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginResponse = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
        const token = loginResponse.body.token;
        const updateResponse = yield (0, supertest_1.default)(app_1.default)
            .put('/api/auth/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({ username: 'updateduser' });
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toHaveProperty('username', 'updateduser');
    }));
});
