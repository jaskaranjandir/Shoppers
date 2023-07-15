import { Router } from 'express';
import {
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser
} from "../controllers/users.controller.js";


const router = Router();

router.post('/register', createUser);


router.post('/login', loginUser);


router.get('/users', getUsers);


router.get('/users/:id', getUserById);


router.put('/users/:id', updateUserById);


router.delete('/users/:id', deleteUserById);


export default router;