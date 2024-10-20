import { Router } from "express";
import { getProducts } from "../Controllers/ProductController";
import validateToken from "./ValidateToken";

const router = Router();
router.get('/', validateToken, getProducts);
export default router;