import { Router } from "express";
import { getUser, loginUser, newUser, updateUser } from "../Controllers/UserController";
import validateToken from "./ValidateToken";



const router = Router();
router.get('/user/:id', validateToken, getUser);
router.put('/update/:id', validateToken, updateUser);
router.post('/', newUser);
router.post('/login', loginUser);

export default router;