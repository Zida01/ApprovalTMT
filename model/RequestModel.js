const mongoose = require('mongoose');


const RequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'declined'],
        default: 'pending'

    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }


},
    { timestamp: true }
)


const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;