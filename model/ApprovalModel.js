const mongoose = require('mongoose');


const ApprovalSchema = new mongoose.Schema({
    initiator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true

    },
    // name: {
    //     type: String,
    //     required: true
    // },
    // description: {
    //     type: String,
    //     required: true
    // },
    comments: { type: String },
    status: {
        type: String,
        default: 'Pending'
    },
    isApproved: {
        user: { type: Boolean, default: false },
        creditRisk: { type: Boolean, default: false },
        hr: { type: Boolean, default: false },
        md: { type: Boolean, default: false }
    },


    // isApproved: { type: Boolean, default: false },
    approvedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    declinedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },


    currentStage: { type: String, enum: ['User', 'CreditRisk', 'HR', 'MD'], default: 'User' },
    nextStage: { type: String, enum: ['CreditRisk', 'HR', 'MD', null], default: 'CreditRisk' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }


})


const Approval = mongoose.model('Approval', ApprovalSchema);

module.exports = Approval;