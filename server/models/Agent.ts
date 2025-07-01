import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
