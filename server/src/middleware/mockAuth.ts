import { Request, Response, NextFunction } from 'express';
import Agent from '../models/Agent';

interface AuthedRequest extends Request {
  agentId?: string;
}

export const mockAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('AGENT::')) {
    console.error('Missing or invalid auth token');
    res.status(403).json({ error: 'Missing or invalid auth token' });
    return
  }

  const agentId = header.split('AGENT::')[1];
  if (!agentId) {
    console.error('Invalid token');
    res.status(403).json({ error: 'Invalid token' }); 
    return
  }

    try {
    const agent = await Agent.findById(agentId);
    if (!agent) {
      console.error('Agent not found');
      res.status(401).json({ error: 'Unauthorized: Agent not found' });
    }

    req.agentId = agent?._id.toString();
    console.log(`Authenticated agent ID: ${agentId}`);
    next();
  } catch (err) {
    console.error('Error verifying agent ID:', err);
    res.status(500).json({ error: 'Internal auth error' });
  }
};
