const { user, post_container, post, sequelize } = require('../../models');
const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
require('dotenv').config();

module.exports = {
    getpostlist: async (req, res) => {
        try {
            const postlist = await sequelize.query(
                `
            select post_containers.id, post_containers.title, post_container.category,
            users.username, posts as post, likes as like
            from post_contents
            left join users on post_contents.id = users.post_id
            left join (select * as posts from posts group by post_id) as postlist on post.id = postlist.post_id
            left join (select * as likes from likes group by post_id) as likelist on post.id = likelist.post_id
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
