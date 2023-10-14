import express from 'express';
import { translateFn } from 'controllers/translate';
const router = express.Router();

router.get('/translate', translateFn);
export default router;
