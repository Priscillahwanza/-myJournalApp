import request from 'supertest';
import app from '../app';
import bcrypt from 'bcrypt';
import sequelize from '../config/testConfig';
import User from '../models/User';
import JournalEntry from '../models/JournalEntry';

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create a test user
  const hashedPassword = await bcrypt.hash('testpassword', 10);
  await User.create({ username: 'testuser', password: hashedPassword });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Journal Entry Controller', () => {
  let token: string;

  beforeEach(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });
    
    token = loginResponse.body.token;
  });

  it('should create a new journal entry', async () => {
    const response = await request(app)
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
  });

  it('should get all journal entries of the logged-in user', async () => {
    const response = await request(app)
      .get('/api/journalEntries')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get a specific journal entry by ID', async () => {
    const newEntry = await JournalEntry.create({
      title: 'Specific Entry',
      content: 'This is a specific entry',
      category: 'Test',
      date: new Date(),
      userId: 1,
    });

    const response = await request(app)
      .get(`/api/journalEntries/${newEntry.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Specific Entry');
  });

  it('should update a specific journal entry', async () => {
    const newEntry = await JournalEntry.create({
      title: 'Update Entry',
      content: 'This is an entry to update',
      category: 'Test',
      date: new Date(),
      userId: 1,
    });

    const response = await request(app)
      .put(`/api/journalEntries/${newEntry.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Entry',
        content: 'This entry has been updated',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Entry');
  });

  it('should delete a specific journal entry', async () => {
    const newEntry = await JournalEntry.create({
      title: 'Delete Entry',
      content: 'This is an entry to delete',
      category: 'Test',
      date: new Date(),
      userId: 1,
    });

    const response = await request(app)
      .delete(`/api/journalEntries/${newEntry.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
