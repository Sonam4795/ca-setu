import express from 'express';
import {
  getAdminStats,
  verifyCompany,
  moderateJob,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.put('/companies/:id/verify', verifyCompany);
router.put('/jobs/:id/moderation', moderateJob);

export default router;
