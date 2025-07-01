import { Request, Response } from 'express';
import Agent from '../models/Agent';

export const login = async (req: Request, res: Response) => {
  console.log('Login request received:', req.body);
  const { email } = req.body;

if (!email) {
  res.status(400).json({ error: 'Email is required' });
  return;
}
  try {
    const agent = await Agent.findOne({ email });
    if (!agent) {
      res.status(404).json({ error: 'Agent not found' });
      return;
    }

    const token = `AGENT::${agent._id}`;
    res.json({ token, agent: { _id: agent._id, email: agent.email } });
    return;
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
    return;
  }
};