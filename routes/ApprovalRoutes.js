
const { createApproval, getRequestInApprovalStage, getApprovalByUser, approveRequest, getUserQueue } = require('../controllers/ApprovalController')
const protect = require('../middleware/authmiddleware')
const ApprovalRouter = require('express').Router();

ApprovalRouter.get('/find/:requestID', protect, getRequestInApprovalStage,)
ApprovalRouter.post('/approve/:requestID', protect, approveRequest,)
ApprovalRouter.get('/all', protect, getUserQueue)// get  aall  approval  based   on   current  stage  of  apporval  request inthe sequneces :  which uses the  user  role






module.exports = ApprovalRouter;