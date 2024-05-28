const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, process.env.JwtSecretKey);
            if (decoded) {
                req.userId = decoded.userId;
                req.userName = decoded.userName;
                next();
            } else {
                return res.status(401).json({ msg: 'user is not authorized' });
            }
        } else {
            return res.status(401).json({ msg: 'login to continue' });
        }
    } catch (err) {
       return res.status(500).json({ error: err.message });
    }
}

module.exports = { authMiddleware };