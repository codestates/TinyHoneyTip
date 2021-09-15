const { User, post_container, post, like, dislike, comment, scrap, sequelize } = require('../../models');
const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
require('dotenv').config();

module.exports = {
    getpostlist: async (req, res) => {
        try {
            const postlist = await sequelize.query(
                `
            SELECT post_containers.id, post_containers.title, post_containers.category,
            Users.username, posts AS post, likes AS like
            FROM post_containers
            LEFT JOIN Users ON post_containers.id = Users.post_id
            LEFT JOIN (SELECT * AS posts from posts GROUP BY post_id) AS postlist ON posts.id = postlist.post_id
            LEFT JOIN (SELECT * AS likes from likes GROUP BY post_id) AS likelist ON posts.id = likelist.post_id
            `,
                { type: QueryTypes.SELECT },
            );
            res.status(200).json({ data: postlist });
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

    getLike: async (req, res) => {
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

    scrap: async (req, res) => {},
    cancelscrap: async (req, res) => {},
    comment: async (req, res) => {},
    deletecomment: async (req, res) => {},
};
