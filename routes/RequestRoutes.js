
const { createRequest, getRequest, getRequestByUser } = require('../controllers/RequestController')
const protect = require('../middleware/authmiddleware')
const RequestRouter = require('express').Router();

RequestRouter.post('/create', protect ,createRequest)
RequestRouter.get('/:user', protect,   getRequestByUser)




module.exports = RequestRouter;