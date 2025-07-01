import express from 'express';
import { createInquiry } from '../controllers/inquiriesController';

const router = express.Router();
router.post('/', createInquiry);
export default router;
