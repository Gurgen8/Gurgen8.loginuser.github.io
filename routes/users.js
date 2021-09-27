import express from "express";
import UsersController from "../controllers/UsersController";

const router = express.Router();

router.post('/login', UsersController.login);
router.post('/register', UsersController.register);
router.get('/profile', UsersController.profile);
router.get('/', UsersController.usersList);



export default router;
