const { User, like, dislike, comment, scrap, post_container, post } = require('../../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();

module.exports = {
    getmypage: async (req, res) => {
        console.log('쿠키', req.cookies.accessToken);
        const accessToken = req.cookies.accessToken;
        try {
            if (!accessToken) {
                res.status(404).json({ message: 'Bad Request' });
            } else {
                const Token = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
                console.log(Token);
                if (!Token) res.status(404).json({ message: 'Bad Request' });
                else {
                    const myPostArr = await post_container.findAll({
                        attributes: ['title', 'category', 'user_id', 'id'],
                        where: { user_id: Token.id },
                        include: [
                            {
                                model: post,
                                attributes: ['content', 'img'],
                            },
                            {
                                model: like,
                                attributes: ['user_id'],
                                include: [
                                    {
                                        model: User,
                                        attributes: ['username'],
                                    },
                                ],
                            },
                            {
                                model: dislike,
                                attributes: ['user_id'],
                                include: [
                                    {
                                        model: User,
                                        attributes: ['username'],
                                    },
                                ],
                            },
                            {
                                model: scrap,
                                attributes: ['user_id'],
                                include: [
                                    {
                                        model: User,
                                        attributes: ['username'],
                                    },
                                ],
                            },
                            {
                                model: comment,
                                attributes: ['user_id'],
                                include: [
                                    {
                                        model: User,
                                        attributes: ['username'],
                                    },
                                ],
                            },
                        ],
                    });
                    console.log('마이포스트', myPostArr[0]);

                    const myScrapArr = await scrap.findAll({
                        where: { user_id: Token.id },
                        attributes: ['post_id'],
                        include: [
                            {
                                model: post_container,
                                attributes: ['title', 'category', 'user_id', 'id'],
                                include: [
                                    {
                                        model: post,
                                        attributes: ['content', 'img'],
                                    },
                                    {
                                        model: like,
                                        attributes: ['user_id'],
                                    },
                                    {
                                        model: dislike,
                                        attributes: ['user_id'],
                                    },
                                    {
                                        model: scrap,
                                        attributes: ['user_id'],
                                    },
                                ],
                            },
                        ],
                    });

                    // ---------------------------------------- alert 시작 -------------------------------------------------------

                    console.log('성공');

                    res.status(200).json({
                        message: 'ok',
                        data: {
                            myPost: myPostArr,
                            myScrap: myScrapArr,
                        },
                    });
                }
            }
        } catch (err) {
            console.log('캐치에러다', err);
            res.status(400).json({ message: 'Bad Request', data: User });
        }
    },

    editmypage: async (req, res) => {
        const accessToken = req.cookies.accessToken;
        try {
            if (!accessToken) {
                console.log('에러');
                res.status(404).json({ message: 'Bad Request' });
            } else {
                const token = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
                if (!token) res.status(404).json({ message: 'Bad Request' });
                else {
                    //console.log(req.body);
                    const { email, username, password } = req.body;

                    if (email)
                        await User.update(
                            {
                                email,
                                username,
                                password,
                                profile_img: req.file.location,
                            },
                            { where: { email: token.email } },
                        );

                    const updateInfo = await User.findOne({
                        where: { id: token.id },
                        attributes: [email, username, profile_img],
                    });
                    res.status(200).json({
                        message: 'ok',
                        data: {
                            userInfo: updateInfo,
                        },
                    });
                }
            }
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
};
