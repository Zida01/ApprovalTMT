
const util = require('util')
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    try {
        const testToken = req.headers.authorization
        let token;
        if (testToken && testToken.startsWith('Bearer')) {
            token = testToken.split(' ')[1]
        }
        if (!token) {
            throw new Error('Invalid token')
        }
        console.log('Token: ' + token)
        const decode = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET)
        const user = await User.findById(decode.id)
        if (user) {
            req.user = user
            console.log(user)
            next()

        }

    } catch (error) {
        res.status(400).json({
            status: false,
            error: 'No token ',
            Error: error
        })
    }

}

module.exports = protect