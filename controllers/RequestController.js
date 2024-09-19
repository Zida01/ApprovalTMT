
const Request = require('../model/RequestModel')
const Approval = require('../model/ApprovalModel')
const asynchandler = require('express-async-handler');
const mongoose = require('mongoose')


// @desc Create a new Request 
// @router /api/Request
//2Access Private 


const createRequest = asynchandler(async (req, res, next) => {

    try {
        const newRequest = await Request.create({
            user: req.user._id,
            name: req.body.name,
            description: req.body.description

        })
        const approval = await Approval.create({
            initiator: req.user._id,
            request: newRequest._id,
            // name: newRequest.name,        
            // description: newRequest.description, 

        });

        res.status(201).json({
            status: true,
            data: newRequest,
            approval: approval
        })
    } catch (error) {
        console.log(error)

    }
})


const getRequest = asynchandler(async (req, res, next) => {
    try {
        const getRequest = await Request.find().populate('user')
        res.status(201).json({
            status: true,
            data: getRequest,
        })
    } catch (error) {
        console.log(error)
        throw new AppError("something went wrong", 400)


    }
})


const getRequestByUser = asynchandler(async (req, res, next) => {
    const userId = req.params.user;


    try {

        const user = new mongoose.Types.ObjectId(userId);
        // const getRequest = await Request.find({ user,status:'pending' })
        // const getRequest = await Request.find({ user,status:'approved' })
        const getRequest = await Request.find({ user, status: 'declined' })
        res.status(201).json({
            status: true,
            data: getRequest,
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            data: error,
        })


    }
})


module.exports = {
    createRequest,
    getRequest,
    getRequestByUser
}