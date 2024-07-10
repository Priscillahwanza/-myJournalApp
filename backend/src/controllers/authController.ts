import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  res.json({ token });
};

export const getProfile = async (req: Request, res: Response) => {
  const user = await User.findByPk((req.user as any).userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const user = await User.findByPk((req.user as any).userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { username, password } = req.body;

  const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

  try {
    await user.update({ username: username || user.username, password: hashedPassword });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
