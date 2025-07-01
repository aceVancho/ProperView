import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'pending', 'sold'],
    required: true,
  },
  agentId: { type: String, required: true },
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

export default Property;
