import { Router } from "express";
import { __dirname } from '../path.js'

const router = Router();

router.get('/', (req, res) => {
    res.render('realtimeproducts')
})

export default router;