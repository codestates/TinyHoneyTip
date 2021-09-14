const { User, post_container, post, sequelize } = require('../../models');
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
            res.status(200).json();
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
    getpostdetail: async (req, res) => {},
    editpost: async (req, res) => {},
    deletepost: async (req, res) => {},
    like: async (req, res) => {},
    cancellike: async (req, res) => {},
    dislike: async (req, res) => {},
    canceldislike: async (req, res) => {},
    scrap: async (req, res) => {},
    cancelscrap: async (req, res) => {},
    comment: async (req, res) => {},
    deletecomment: async (req, res) => {},
};
