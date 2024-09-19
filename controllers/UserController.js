const User = require(('../model/userModel'))
const generateToken = require('../utils/token')

const asynchandler = require('express-async-handler')



const registerUser = asynchandler(async (req, res) => {

    const email = req.body.email


    try {

        const userExits = await User.findOne({ email })
        if (userExits) {
            throw new Error('User already exists')
        }
        const user = await User.create(req.body)
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            })
        }
        else {
            throw new Error(' LOGIN FAILED')
        }

    } catch (error) {
        console.log(error)

    }


})


const loginUser = asynchandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    try {

        if (user && (await user.comparepassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                role: user.role,
                token: generateToken(user._id)
            })

        }
        else {
            throw new Error('Invalid login')

        }

    } catch (error) {
        console.log(error)

    }




})


module.exports = {
    registerUser,
    loginUser,
}