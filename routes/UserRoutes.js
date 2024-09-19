const { registerUser, loginUser } = require('../controllers/UserController');

const UserRouter = require('express').Router();


UserRouter.post('/register', registerUser)
UserRouter.post('/login', loginUser)



module.exports = UserRouter;