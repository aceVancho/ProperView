// models/Inquiry.ts
import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    name: String,
    email: String,
    phone: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', inquirySchema);
