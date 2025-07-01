import { Request, Response } from 'express';
import Agent from '../models/Agent';
import Property from '../models/Property';

import express from 'express';
import { mockAuth } from '../middleware/mockAuth';
import {
  getAllProperties,
  getAgentProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertiesController';

const router = express.Router();

router.get('/', getAllProperties);
router.get('/agent', mockAuth, getAgentProperties);
router.post('/', mockAuth, createProperty);
router.put('/:id', mockAuth, updateProperty);
router.delete('/:id', mockAuth, deleteProperty);

export default router;
