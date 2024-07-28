import { Router } from "express";
const router = Router();
import {
  loginResponse,
  logout,
  visit,
  infoSession,
  registerResponse,
  googleResponse,
} from "../controllers/user.controllers.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { isAuth } from "../middlewares/isAuth.js";
import passport from "passport";

router.post("/login", passport.authenticate('login'), loginResponse);
router.post("/register", passport.authenticate('register'), registerResponse);
router.get('/private', isAuth, (req, res)=>res.json({ msg: 'Ruta PRIVADA' }))
router.get("/info", validateLogin, infoSession);
router.get("/secret-endpoint", validateLogin, visit);
router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user' }), googleResponse);
router.post("/logout", logout);

export default router;
