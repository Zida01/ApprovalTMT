
const Approval = require('../model/ApprovalModel')

const asynchandler = require('express-async-handler');
const mongoose = require('mongoose')


// @desc Create a new Approval 
// @router /api/Approval
//2Access Private 


const createApproval = asynchandler(async (req, res, next) => {

    try {
        const newApproval = await Approval.create({
            user: req.user._id,
            name: req.body.name,
            description: req.body.description

        })
        const approval = await Approval.create({
            initiator: req.user._id,
            Approval: newApproval._id,
            // name: newApproval.name,        
            // description: newApproval.description, 

        });

        res.status(201).json({
            status: true,
            data: newApproval,
            approval: approval
        })
    } catch (error) {
        console.log(error)

    }
})


const getRequestInApprovalStage = asynchandler(async (req, res, next) => {
    const requestID = req.params.requestID
    try {

        const request = new mongoose.Types.ObjectId(requestID);

        const getApproval = await Approval.find({ request }).populate('request')
        res.status(201).json({
            status: true,
            data: getApproval
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            data: error,
        })

    }
})


const getApprovalByUser = asynchandler(async (req, res, next) => {
    const userId = req.params.user;


    try {

        const user = new mongoose.Types.ObjectId(userId);
        // const getApproval = await Approval.find({ user,status:'pending' })
        // const getApproval = await Approval.find({ user,status:'approved' })
        const getApproval = await Approval.find()
        res.status(201).json({
            status: true,
            data: getApproval,
        })
    } catch (error) {
        res.status(401).json({
            status: false,
            data: error,
        })


    }
})

// exports.approveRequest = async (req, res) => {
//     try {
//         const { requestId, userId, comments } = req.body; // Extracting necessary data from the request body
//         const approval = await Approval.findOne({ requestId });

//         if (!approval) {
//             return res.status(404).json({ message: 'Approval record not found.' });
//         }

//         // Check if the current user's role matches the required stage for approval
//         const userRole = req.user.role; // Assuming req.user contains user data (from authentication)
//         if (userRole !== approval.currentStage) {
//             return res.status(403).json({ message: `Not authorized to approve at this stage: ${approval.currentStage}` });
//         }

//         // Update the approval status
//         approval.isApproved = true;
//         approval.approvedBy = userId;
//         approval.comments = comments;

//         // Move to the next stage
//         if (approval.currentStage === 'User') {
//             approval.currentStage = 'CreditRisk';
//             approval.nextStage = 'HR';
//         } else if (approval.currentStage === 'CreditRisk') {
//             approval.currentStage = 'HR';
//             approval.nextStage = 'MD';
//         } else if (approval.currentStage === 'HR') {
//             approval.currentStage = 'MD';
//             approval.nextStage = null;  // Final stage
//         } else if (approval.currentStage === 'MD') {
//             approval.nextStage = null;  // No further stages, final approval
//         }

//         await approval.save();

//         return res.status(200).json({ message: 'Approval updated successfully', approval });
//     } catch (error) {
//         return res.status(500).json({ message: 'Server error', error });
//     }
// };
const approveRequest = async (req, res) => {

    const requestID = req.params.requestID

    try {

        const request = new mongoose.Types.ObjectId(requestID);
        const { comments } = req.body; // Extracting necessary data from the request body
        const approval = await Approval.findOne({ request: request }); // Find the approval record by requestId

        if (!approval) {
            return res.status(404).json({ message: 'Approval record not found.' });
        }

        // Check if the current user's role matches the required stage for approval
        const userRole = req.user.role; // Assuming req.user contains user data (from authentication)
        if (userRole !== approval.currentStage) {
            return res.status(403).json({ message: `Not authorized to approve at this stage: ${approval.currentStage}` });
        }

        // Update the approval status for the current role
        if (userRole === 'User') {
            approval.isApproved.user = true;
            approval.approvedBy.push(req.user._id); // Store the ID of the user who approved
        } else if (userRole === 'CreditRisk') {
            approval.isApproved.creditRisk = true;
            approval.approvedBy.push(req.user._id);
        } else if (userRole === 'HR') {
            approval.isApproved.hr = true;
            approval.approvedBy.push(req.user._id);
        } else if (userRole === 'MD') {
            approval.isApproved.md = true;
            approval.approvedBy.push(req.user._id);
        }

        // Add comments to the approval record
        approval.comments = comments || approval.comments;

        // Move to the next stage
        if (approval.currentStage === 'User') {
            approval.currentStage = 'CreditRisk';
            approval.nextStage = 'HR';
        } else if (approval.currentStage === 'CreditRisk') {
            approval.currentStage = 'HR';
            approval.nextStage = 'MD';
        } else if (approval.currentStage === 'HR') {
            approval.currentStage = 'MD';
            approval.nextStage = null;  // Final stage
        } else if (approval.currentStage === 'MD') {
            approval.nextStage = null;  // No further stages, final approval
        }

        await approval.save();

        return res.status(200).json({ message: 'Approval updated successfully', approval });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};



//  find  at  Approval   pending  at user pag  using  role 

const getUserQueue = async (req, res) => {
    const userRole = req.user.role
    try {
        // Find all requests where the current stage is 'MD'
        const ApprovalRequests = await Approval.find({ currentStage: userRole }).populate('request')

        if (!ApprovalRequests.length) {
            return res.status(404).json({ message: `No requests pending in   ${req.user.role} queue.` });
        }

        return res.status(200).json({ message: `Requests in  ${req.user.role} queue`, requests: ApprovalRequests });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};



module.exports = {
    getRequestInApprovalStage,
    createApproval,
    getApprovalByUser,
    approveRequest,
    getUserQueue
}