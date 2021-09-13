const { User, post_container, post, sequelize } = require('../../models');
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
