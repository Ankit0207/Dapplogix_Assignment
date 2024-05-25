const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require('../model/userModel');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(401).json({ message: 'User already exists' });
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(401).json({ error: err.message });
            } else {
                const newUser = new UserModel({ ...req.body, password: hash });
                await newUser.save();

                return res.status(200).json({ msg: 'user registered', user: newUser })
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id, userName: user.username }, process.env.JwtSecretKey);
                    return res.status(200).json({ msg: 'login successful', token });
                } else {
                    return res.status(401).json({ msg: 'wrong credentials' });
                }
            });
        } else {
            return res.status(401).json({ message: 'user not exist' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser }