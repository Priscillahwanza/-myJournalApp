import request from 'supertest';
import app from '../app';
import sequelize from '../config/testConfig';
import User from '../models/User';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'testpassword' });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should get the profile of the logged-in user', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });
    
    const token = loginResponse.body.token;

    const profileResponse = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body).toHaveProperty('username', 'testuser');
  });

  it('should update the profile of the logged-in user', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });
    
    const token = loginResponse.body.token;

    const updateResponse = await request(app)
      .put('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'updateduser' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty('username', 'updateduser');
  });
});
