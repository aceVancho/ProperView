import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import propertyRoutes from './routes/properties';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/properties', propertyRoutes);


app.get('/', (req, res) => {
  res.send('Server is up!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
