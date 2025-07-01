import { Request, Response } from "express";
import Agent from "../models/Agent";
import Property from "../models/Property";
import Inquiry from "../models/Inquiry";

export const createInquiry = async (req: Request, res: Response) => {
const { propertyId, name, email, phone, message } = req.body;

  if (!propertyId || !name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    console.error('Missing required fields for inquiry creation');
    return;
  }

  try {
    const inquiry = new Inquiry({
      propertyId,
      name,
      email,
      phone,
      message,
    });

    const saved = await inquiry.save();

    console.log('New inquiry saved:', saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving inquiry:', err);
    res.status(500).json({ error: 'Failed to save inquiry' });
  }
}