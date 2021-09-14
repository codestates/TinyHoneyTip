const { User } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mypage: require('./mypage/Index'),
    post: require('./post/Index'),
    user: async (req, res) => {
        const accessToken = req.cookies.accessToken;
        const userinfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
        if (userinfo) {
            User.destroy({ where: { email: userinfo.email } });
            res.status(200).json({ message: 'byebye' });
        } else {
            res.status(500).json({ message: 'error!!' });
        }
    },
    signin: async (req, res) => {
        const { email, password } = req.body;
        const findemail = await User.findOne({
            where: { email: email },
        });
        const finduser = await User.findOne({
            where: { email: email, password: password },
        });
        if (findemail && !finduser) {
            res.status(400).json({ message: 'rewrite password' });
        } else if (!findemail && !finduser) {
            res.status(400).json({ message: 'rewrite email' });
        } else {
            delete finduser.dataValues.password;
            const accessToken = jwt.sign(finduser.dataValues, process.env.ACCESS_SECRET);
            res.status(200)
                .cookie('accessToken', accessToken, {
                    httpOnly: true,
                })
                .json({ message: 'login complete' });
        }
    },
    signup: async (req, res) => {
        try {
            const { email, password, username } = req.body;
            const emailCheck = await User.findOne({
                where: { email: email },
            });
            const usernameCheck = await User.findOne({
                where: { username: username },
            });
            if (emailCheck) {
                res.status(400).json({ message: 'already email exist' });
            } else if (usernameCheck) {
                res.status(400).json({ message: 'already username exist' });
            } else {
                await User.create({
                    email,
                    password,
                    username,
                });
                res.status(200).json({ messge: 'ok' });
            }
        } catch (err) {
            res.status(500).json({ message: 'unexpected error' });
        }
    },
    signout: async (req, res) => {
        await res.clearCookie('access_token').status(200).json({ message: 'ok' });
    },
};
