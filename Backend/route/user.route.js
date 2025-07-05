import express from 'express';
import  {login, signUp, logout, allusers}  from '../controller/user.controller.js';
import secureRoute from '../middleware/secureRoute.js';
const router = express.Router();
router.post('/signup', signUp);
router.post('/login', login ); // Assuming login is handled by the same controller function for no
router.post('/logout', logout); // Assuming logout is handled by the same controller function for no reason
router.get("/allusers",secureRoute, allusers)
export default router;