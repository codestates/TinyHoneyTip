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
                    const myPost = await post_container.findAll({
                        where: { user_id: Token.id },
                        attributes: ['id', 'title', 'category'],
                        include: [
                            {
                                model: post,
                                attributes: ['content', 'img', 'id'],
                            },
                        ],
                    });

                    for (let onePost of myPost) {
                        onePost.dataValues.like = await like.findAll({
                            where: { post_id: onePost.id },
                            attributes: ['user_id'],
                            include: [
                                {
                                    model: User,
                                    attributes: ['username'],
                                },
                            ],
                        });
                        onePost.dataValues.dislike = await dislike.findAll({
                            where: { post_id: onePost.id },
                            attributes: ['user_id'],
                            include: [
                                {
                                    model: User,
                                    attributes: ['username'],
                                },
                            ],
                        });
                        onePost.dataValues.scrap = await scrap.findAll({
                            where: { post_id: onePost.id },
                            attributes: ['user_id'],
                            include: [
                                {
                                    model: User,
                                    attributes: ['username'],
                                },
                            ],
                        });
                    }

                    console.log('마이포스트', myPost[0]);

                    const myScrap = await scrap.findAll({
                        where: { user_id: Token.id },
                        attributes: ['post_id'],
                        include: [
                            {
                                model: post_container,
                                attributes: ['title', 'category', 'user_id', 'id'],
                                include: [
                                    {
                                        model: post,
                                        attributes: ['content', 'img', 'id'],
                                    },
                                ],
                            },
                        ],
                    });

                    console.log(myScrap[0], '마이스크랩222');

                    for (let oneScrap of myScrap) {
                        oneScrap.post_container.post_container.like = await like.findAll({
                            where: { post_id: oneScrap.post_container.id },
                            attributes: ['user_id'],
                        });
                        // oneScrap.post_container.post_container.dislike = await dislike.findAll({
                        //     where: { post_id: oneScrap.post_container.post_container.id },
                        //     attributes: ['user_id'],
                        // });
                        // oneScrap.post_container.post_container.scrap = await scrap.findAll({
                        //     where: { post_id: oneScrap.post_container.post_container.id },
                        //     attributes: ['user_id'],
                        // });
                    }

                    // ---------------------------------------- alert 시작 -------------------------------------------------------

                    console.log('성공');

                    res.status(200).json({
                        message: 'ok',
                        data: {
                            myPost: myPost,
                            myScrap: myScrap,
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
