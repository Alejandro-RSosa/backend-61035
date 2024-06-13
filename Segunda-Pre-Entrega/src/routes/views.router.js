import { Router } from "express";
import { validateLogin } from "../middlewares/validateLogin.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/products", validateLogin, (req, res) => {
  res.render('products');
});

export default router;
