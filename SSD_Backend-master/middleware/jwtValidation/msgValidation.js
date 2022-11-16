const jwt = require('jsonwebtoken')

function MsgValidation(req) {

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        let token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        for (let i = 0; i < decoded.permission.length; i++) {
            if (decoded.permission[i] === "02") {
                return true;
            } 
        }
        return false;

    }
    return false;
}

module.exports = MsgValidation;