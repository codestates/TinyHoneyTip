const { User, post_container, post, like, dislike, comment, scrap, sequelize } = require('../../models');
const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
require('dotenv').config();

module.exports = {
    getpostlist: async (req, res) => {
        try {
            const allpost_container = await sequelize.query(
                `
                select id from post_containers
                `,
                { type: QueryTypes.SELECT },
            );
            console.log('allpostc', allpost_container);

            let post_page = [];
            let post_scrap = [];
            let post_comment = [];
            let post_like = [];
            const allPost = [];
            for (let el of allpost_container) {
                let page = await post.findAll({
                    attributes: ['id', 'content', 'img', 'post_id'],
                    where: { post_id: el.id },
                });
                post_page.push(page);

                let findScrap = await scrap.findAll({
                    where: { post_id: el.id },
                    attributes: ['id', 'user_id', 'post_id'],
                });
                post_scrap.push(findScrap);

                let findComment = await comment.findAll({
                    where: { post_id: el.id },
                    attributes: ['user_id', 'txt', 'post_id'],
                });
                post_comment.push(findComment);

                let findLike = await like.findAll({
                    where: { post_id: el.id },
                    attributes: ['user_id', 'post_id'],
                });
                post_like.push(findLike);

                allPost.push({
                    id: el.id,
                    title: el.title,
                    category: el.category,
                    post_page: post_page,
                    like: post_like,
                    scrap: post_scrap,
                    comment: post_comment,
                });
            }
            res.status(200).json({ data: allPost });
        } catch (err) {
            res.status(500).json({ message: 'err' });
        }
    },
    uploadpost: async (req, res) => {
        const userinfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const { title, category } = req.body;
        const creatpostcontainer = await post_container.create({
            title: title,
            category: category,
        });
        const createpost = await post_container.create({});
    },

    getpostdetail: async (req, res) => {
        try {
            const accessToken = await jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET);

            console.log('여긴가1', req.params.id);
            const postInfo = await post_container.findOne({
                where: { id: req.params.id },
                //attributes: [id, user_id, category, title],
            });
            console.log('여긴가2');
            const post_page = await post.findAll({ where: { post_id: req.params.id }, attributes: [id, img, txt] });

            let userLike = await like.findOne({ where: { post_id: req.params.id, user_id: accessToken.id } });
            console.log(userLike);

            let userDisLike = await dislike.findOne({ where: { post_id: req.params.id, user_id: accessToken.id } });
            userDisLike ? (userDisLike = true) : (userDisLike = false);
            console.log(userDisLike);

            let userScrap = await scrap.findOne({ where: { post_id: req.params.id, user_id: accessToken.id } });
            console.log(userScrap);

            let userComment = await like.findOne({ where: { post_id: req.params.id } });
            console.log(userComment);

            res.status(200).json({
                data: {
                    post: {
                        id: postInfo.id,
                        title: postInfo.title,
                        category: postInfo.category,
                        post_page: post_page,
                        like: userLike,
                        dislike: userDisLike,
                        scrap: userScrap,
                        comment: userComment,
                    },
                },
            });
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },

    editpost: async (req, res) => {},
    deletepost: async (req, res) => {},

    like: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                res.status(400).json({ message: 'Bad Request' });
            } else {
                const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
                if (!userInfo) {
                    res.status(400).json({ message: 'Bad Request' });
                } else {
                    like.create({
                        user_id: userInfo.id,
                        post_id: req.params.id,
                    });
                    res.status(200).json({ message: 'ok' });
                }
            }
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
    cancellike: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                res.status(400).json({ message: 'Bad Request' });
            } else {
                const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
                if (!userInfo) {
                    res.status(400).json({ message: 'Bad Request' });
                } else {
                    like.destroy({
                        where: { user_id: userInfo.id, post_id: req.params.id },
                    });
                    res.status(200).json({ message: 'ok' });
                }
            }
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
    dislike: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                res.status(400).json({ message: 'Bad Request' });
            } else {
                const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
                if (!userInfo) {
                    res.status(400).json({ message: 'Bad Request' });
                } else {
                    dislike.create({
                        user_id: userInfo.id,
                        post_id: req.params.id,
                    });
                    res.status(200).json({ message: 'ok' });
                }
            }
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },

    canceldislike: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                res.status(400).json({ message: 'Bad Request' });
            } else {
                const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
                if (!userInfo) {
                    res.status(400).json({ message: 'Bad Request' });
                } else {
                    dislike.destroy({
                        where: { user_id: userInfo.id, post_id: req.params.id },
                    });
                    res.status(200).json({ message: 'ok' });
                }
            }
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
    scrap: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
            await scrap.create({
                user_id: userinfo.id,
                post_id: req.params.id,
            });
            res.status(200).json({ message: 'ok' });
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
    cancelscrap: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
            scrap.destroy({
                where: {
                    user_id: userinfo.id,
                    post_id: req.params.id,
                },
            });
            res.status(200).json({ message: 'ok' });
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
    comment: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
            await comment.create({
                user_id: userinfo.id,
                post_id: req.params.id,
                txt: req.body.comment,
            });
            res.status(200).json({ message: 'ok' });
        } catch (err) {
            res.status(400).json({ messasge: 'Bad Request' });
        }
    },
    deletecomment: async (req, res) => {},
};
