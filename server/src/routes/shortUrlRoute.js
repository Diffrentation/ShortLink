import express from 'express';
import { shortUrl } from '../controllers/shortUrl.js';
import { redirectUrl } from '../controllers/redirectUrl.js';
import getAllUrls from '../controllers/getAllUrls.js';
import deleteUrl from '../controllers/deleteUrl.js';
const router = express.Router();
router.get('/',getAllUrls);
router.get('/:shortUrl', redirectUrl);
router.post('/', shortUrl);
router.delete('/:shortUrl', deleteUrl);

export default router;
