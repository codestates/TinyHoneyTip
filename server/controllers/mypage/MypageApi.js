const { user, post_container, scrap } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    getmypage: async (req, res) => {
        const accessToken = req.cookies.accessToken;
        try {
            if (!accessToken) res.status(404).json({ message: 'Bad Request' });
            else {
                const token = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
                if (!token) res.status(404).json({ message: 'Bad Request' });
                else {
                    const findUserInfo = await user.findAll({
                        where: { userId: token },
                    });
                    const findMyPost = await post_container.findAll({
                        where: { userId: token },
                    });
                    const findMyScrap = await scrap.findAll({
                        where: { userId: token },
                    });
                    res.status(200).json({
                        message: 'ok',
                        data: {
                            userInfo: findUserInfo,
                            mypost: findMyPost,
                            myscrap: findMyScrap,
                            alert: '',
                        },
                    });
                }
            }
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
    editmypage: async (req, res) => {
        const accessToken = req.cookies.accessToken;
        try {
            if (!accessToken) res.status(404).json({ message: 'Bad Request' });
            else {
                const token = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
                if (!token) res.status(404).json({ message: 'Bad Request' });
                else {
                    const { email, username, password, profile_img } = req.params;
                    const newInfo = await user.update({
                        where: { id: token },
                        email,
                        username,
                        password,
                        profile_img,
                    });
                    res.status(200).json({
                        message: 'ok',
                        data: {
                            userInfo: newInfo,
                        },
                    });
                }
            }
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
};
