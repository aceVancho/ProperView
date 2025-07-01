import { Request, Response } from "express";
import Agent from "../models/Agent";
import Property from "../models/Property";

interface AuthedRequest extends Request {
  agentId?: string;
}

export const getAllProperties = async (req: Request, res: Response) => {
  const properties = await Property.find();
  if (properties.length === 0) {
    res.status(404).json({ error: "No properties found" });
    return;
  }

  try {
    console.log(`${properties.length} properties found`);
    res.status(200).json(properties);
  } catch (err) {
    console.error("Error retrieving properties:", err);
    res.status(500).json({ error: "Failed to retrieve properties" });
  }
};

export const getAgentProperties = async (req: AuthedRequest, res: Response) => {
  console.log("Retrieving agent properties for:", req.agentId);
  const agentId = req.agentId;
  if (!agentId) {
    console.error("Agent ID not found in request");
    res.status(403).json({ error: "Agent ID not found" });
    return
  }

  try {
    const properties = await Property.find({ agentId: agentId });
    console.log(`Found ${properties.length} properties for agent ${agentId}`);
    if (properties.length === 0) {
      console.error("No properties found for agent:", agentId);
      res.status(404).json({ error: "No properties found for this agent" });
      return;
    }
    res.status(200).json(properties);
  } catch (err) {
    console.error("Error retrieving agent properties:", err);
    res.status(500).json({ error: "Failed to retrieve agent properties" });
    return
  }
};

export const createProperty = async (req: AuthedRequest, res: Response) => {
  console.log("Retrieving agent properties for:", req.agentId);
  const agentId = req.agentId;
  if (!agentId) {
    console.error("Agent ID not found in request");
    res.status(403).json({ error: "Agent ID not found" });
    return;
  }

  // Validation middleware if I had more time
  const { title, price, address, bedrooms, bathrooms, description, status } =
    req.body;
  if (
    !title ||
    !price ||
    !address ||
    !bedrooms ||
    !bathrooms ||
    !description ||
    !status
  ) {
    console.error("Missing required fields for property creation");
    res.status(400).json({ error: "All fields are required" });
    return;
  }
  
  try {
    const newProperty = new Property({
      title,
      price,
      address,
      bedrooms,
      bathrooms,
      description,
      status,
      agentId: agentId,
    });

    const savedProperty = await newProperty.save();
    console.log("Property created successfully:", savedProperty);
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ error: "Failed to create property" });
    return;
  }
};

export const updateProperty = async (req: AuthedRequest, res: Response) => {
  const { id } = req.params;
  const agentId = req.agentId;

  if (!agentId) {
    res.status(403).json({ error: 'Missing agent ID' });
    return;
  }

  try {
    const property = await Property.findById(id);

    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    if (property?.agentId.toString() !== agentId) {
      res.status(403).json({ error: 'Unauthorized: not your listing' });
      return;
    }

    property.set(req.body);
    const updated = await property.save();
    console.log('Property updated successfully:', updated);
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating property:', err);
    res.status(500).json({ error: 'Failed to update property' });
    return;
  }
};

export const deleteProperty = async (req: AuthedRequest, res: Response) => {
    const { id } = req.params;
    const agentId = req.agentId;
    
    if (!agentId) {
        res.status(403).json({ error: 'Missing agent ID' });
        return;
    }
    
    try {
        const property = await Property.findById(id);
    
        if (!property) {
        res.status(404).json({ error: 'Property not found' });
        return;
        }
    
        if (property?.agentId.toString() !== agentId) {
        res.status(403).json({ error: 'Unauthorized: not your listing' });
        return;
        }
    
        await Property.findByIdAndDelete(id);
        console.log('Property deleted successfully:', id);
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        console.error('Error deleting property:', err);
        res.status(500).json({ error: 'Failed to delete property' });
        return;
    }
}