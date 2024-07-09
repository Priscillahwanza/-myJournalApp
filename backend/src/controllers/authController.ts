
import { Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/express';

const register = async (req: AuthenticatedRequest, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to register user' });
  }
};

const login = async (req: AuthenticatedRequest, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};

const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId; // Assumes middleware sets req.userId
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId; // Assumes middleware sets req.userId
  const { username, email } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export { register, login, getProfile, updateProfile };
