const { User, post_container, post, like, dislike, comment, scrap, sequelize } = require('../../models');
const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
require('dotenv').config();

module.exports = {
    getpostlist: async (req, res) => {
        try {
            const allpost_container = await sequelize.query(
                `
                select * from post_containers
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
            const postInfo = await post_container.findOne({
                where: { id: req.params.id },
                attributes: [`id`, `title`, `category`, `user_id`, 'createdAt'],
            });
            //console.log(postInfo);

            const post_page = await post.findAll({
                where: { post_id: postInfo.id },
                attributes: ['id', 'img', 'content'],
            });
            //console.log(post_page);

            let accessToken = {};
            let didIL = {};
            let didIDisL = {};
            let amIScrapped = {};
            if (req.cookies.accessToken) {
                accessToken = await jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET);
                didIL = await like.findOne({ where: { user_id: accessToken.id, post_id: req.params.id } });
                // ⬆️ 내가 좋아요를 눌렀는지 확인해주는 데이터.
                didIDisL = await dislike.findOne({ where: { user_id: accessToken.id, post_id: req.params.id } });
                // ⬆️ 내가 싫어요를 눌렀는지 확인해주는 데이터.
                amIScrapped = await scrap.findOne({ where: { post_id: req.params.id, user_id: accessToken.id } });
            } else accessToken = {};

            const userLike = await like.findAll({ where: { post_id: req.params.id } });
            // ⬆️ 포스트에 대한 좋아요 누른 데이터.

            const userDisLike = await dislike.findAll({ where: { post_id: req.params.id } });
            // ⬆️ 포스트에 대한 싫어요를 누른 데이터.

            const userComment = await comment.findAll({ where: { post_id: req.params.id } });
            //console.log(userComment);

            res.status(200).json({
                data: {
                    post: {
                        id: postInfo.id,
                        title: postInfo.title,
                        category: postInfo.category,
                        post_page: post_page,
                        like: { userLike: userLike, didIL: didIL },
                        dislike: { userDisLike: userDisLike, didIDisL: didIDisL },
                        scrap: amIScrapped,
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
    deletecomment: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            const userinfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
            await comment.destroy({
                where: {
                    user_id: userinfo.id,
                    post_id: req.params.id,
                    txt: req.body.comment,
                },
            });
            res.status(200).json({ message: 'ok' });
        } catch (err) {
            res.status(500).json({ message: 'Bad Request' });
        }
    },
};
