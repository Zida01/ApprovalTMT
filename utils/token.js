const jwt = require('jsonwebtoken')



const generateToken = (userid) => {
    return jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: "30d" })
}


module.exports = generateToken;