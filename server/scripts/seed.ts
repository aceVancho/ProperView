import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../db';
import Property from '../models/Property';
import Agent from '../models/Agent';

dotenv.config({ path: './server/.env' });

const seedDb = async () => {
  // Connect
  await connectDB();
  
  // Clean
  await Property.deleteMany({});
  await Agent.deleteMany({});
  
  // Create Agents
  const agentEmails = ['agent1@example.com', 'agent2@example.com', 'agent3@example.com', 'agent4@example.com'];
  const createdAgents = await Agent.insertMany(agentEmails.map(email => ({ email })));
  const agentMap: Record<string, mongoose.Types.ObjectId> = {};
  createdAgents.forEach(agent => { agentMap[agent.email] = agent._id; });

  const seedData = [
  // --- Agent 1 ---
  {
    title: 'Modern Downtown Loft',
    price: 420000,
    address: '123 Main St, Apt 7B, Chicago, IL',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Stylish loft in the heart of downtown.',
    status: 'active',
    agentId: agentMap['agent1@example.com'],
  },
  {
    title: 'Suburban Family Home',
    price: 380000,
    address: '456 Oakwood Dr, Naperville, IL',
    bedrooms: 4,
    bathrooms: 3,
    description: 'Spacious home with backyard and finished basement.',
    status: 'pending',
    agentId: agentMap['agent1@example.com'],
  },
  {
    title: 'Sunny Bungalow',
    price: 250000,
    address: '789 Sunview Ave, Peoria, IL',
    bedrooms: 3,
    bathrooms: 1,
    description: 'Cozy single-family home with large deck.',
    status: 'active',
    agentId: agentMap['agent1@example.com'],
  },
  {
    title: 'Luxury Condo with Lake View',
    price: 600000,
    address: '100 Lakeshore Dr, Unit 15F, Chicago, IL',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Corner unit with floor-to-ceiling windows.',
    status: 'sold',
    agentId: agentMap['agent1@example.com'],
  },
  {
    title: 'Charming Ranch Style',
    price: 270000,
    address: '321 Elm St, Springfield, IL',
    bedrooms: 3,
    bathrooms: 2,
    description: 'Updated kitchen and large fenced yard.',
    status: 'active',
    agentId: agentMap['agent1@example.com'],
  },

  // --- Agent 2 ---
  {
    title: 'Urban Micro Apartment',
    price: 190000,
    address: '987 Walnut St, St. Louis, MO',
    bedrooms: 1,
    bathrooms: 1,
    description: 'Compact city living close to transit.',
    status: 'active',
    agentId: agentMap['agent2@example.com'],
  },
  {
    title: 'Country Farmhouse',
    price: 340000,
    address: '300 Prairie Rd, Columbia, MO',
    bedrooms: 4,
    bathrooms: 2,
    description: 'Sprawling land with barn and garden.',
    status: 'sold',
    agentId: agentMap['agent2@example.com'],
  },
  {
    title: 'Historic Townhome',
    price: 450000,
    address: '55 Heritage Way, Kansas City, MO',
    bedrooms: 3,
    bathrooms: 2,
    description: 'Brick exterior with renovated interior.',
    status: 'pending',
    agentId: agentMap['agent2@example.com'],
  },
  {
    title: 'Modern Craftsman',
    price: 410000,
    address: '610 Forest Dr, Springfield, MO',
    bedrooms: 4,
    bathrooms: 3,
    description: 'Built in 2019 with energy-efficient features.',
    status: 'active',
    agentId: agentMap['agent2@example.com'],
  },
  {
    title: 'Riverfront Cabin',
    price: 295000,
    address: '11 Cedar Trail, Branson, MO',
    bedrooms: 2,
    bathrooms: 1,
    description: 'Perfect weekend getaway with water access.',
    status: 'active',
    agentId: agentMap['agent2@example.com'],
  },

  // --- Agent 3 ---
  {
    title: 'Desert Oasis',
    price: 375000,
    address: '99 Cactus Rd, Tucson, AZ',
    bedrooms: 3,
    bathrooms: 2,
    description: 'Adobe-style home with mountain views.',
    status: 'pending',
    agentId: agentMap['agent3@example.com'],
  },
  {
    title: 'New Build Townhouse',
    price: 330000,
    address: '88 Sierra Ave, Scottsdale, AZ',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Gated community with shared amenities.',
    status: 'active',
    agentId: agentMap['agent3@example.com'],
  },
  {
    title: 'Open Concept Ranch',
    price: 310000,
    address: '722 Palms Rd, Mesa, AZ',
    bedrooms: 3,
    bathrooms: 2,
    description: 'Large open floor plan with vaulted ceilings.',
    status: 'sold',
    agentId: agentMap['agent3@example.com'],
  },
  {
    title: 'Bungalow with Solar',
    price: 285000,
    address: '404 Desert Rose Ln, Phoenix, AZ',
    bedrooms: 2,
    bathrooms: 1,
    description: 'Eco-friendly upgrades throughout.',
    status: 'active',
    agentId: agentMap['agent3@example.com'],
  },
  {
    title: 'Lakeview Mobile Home',
    price: 195000,
    address: '12 Lakeside Dr, Flagstaff, AZ',
    bedrooms: 2,
    bathrooms: 1,
    description: 'Affordable living in scenic location.',
    status: 'active',
    agentId: agentMap['agent3@example.com'],
  },

  // --- Agent 4 ---
  {
    title: 'Colonial Classic',
    price: 420000,
    address: '33 Hamilton Rd, Boston, MA',
    bedrooms: 4,
    bathrooms: 3,
    description: 'Classic style home with hardwood floors.',
    status: 'pending',
    agentId: agentMap['agent4@example.com'],
  },
  {
    title: 'Studio Flat Near Campus',
    price: 220000,
    address: '200 Beacon St, Cambridge, MA',
    bedrooms: 1,
    bathrooms: 1,
    description: 'Ideal for students or first-time buyers.',
    status: 'active',
    agentId: agentMap['agent4@example.com'],
  },
  {
    title: 'Seaside Cape Cod',
    price: 520000,
    address: '80 Shoreline Dr, Plymouth, MA',
    bedrooms: 3,
    bathrooms: 2,
    description: 'Ocean breeze and beautiful sunsets.',
    status: 'sold',
    agentId: agentMap['agent4@example.com'],
  },
  {
    title: 'Historic Brick Rowhouse',
    price: 490000,
    address: '9 Rose Ln, Salem, MA',
    bedrooms: 2,
    bathrooms: 2,
    description: 'Charming and full of character.',
    status: 'active',
    agentId: agentMap['agent4@example.com'],
  },
  {
    title: 'Mountain Retreat',
    price: 610000,
    address: '77 Skyline Pass, Lenox, MA',
    bedrooms: 4,
    bathrooms: 3,
    description: 'Private location with breathtaking views.',
    status: 'active',
    agentId: agentMap['agent4@example.com'],
  },
];

  await Property.insertMany(seedData);
  console.log('✅ Seed complete!');
  await mongoose.disconnect();
};

seedDb();