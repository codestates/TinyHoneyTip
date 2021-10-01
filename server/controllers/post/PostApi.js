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
            // console.log('allpostc', allpost_container);

            const allPost = [];
            for (let el of allpost_container) {
                let post_page = await post.findAll({
                    attributes: ['id', 'content', 'img', 'post_id'],
                    where: { post_id: el.id },
                });
                // post_page.push(page);

                let post_scrap = await scrap.findAll({
                    where: { post_id: el.id },
                    attributes: ['id', 'user_id', 'post_id'],
                });
                // post_scrap.push(findScrap);

                let post_comment = await comment.findAll({
                    where: { post_id: el.id },
                    attributes: ['user_id', 'txt', 'post_id'],
                });
                // post_comment.push(findComment);

                let post_like = await like.findAll({
                    where: { post_id: el.id },
                    attributes: ['user_id', 'post_id'],
                });
                // post_like.push(findLike);

                allPost.push({
                    id: el.id,
                    title: el.title,
                    category: el.category,
                    post_page: post_page.filter((ell) => {
                        return ell.post_id === el.id;
                    }),
                    like: post_like.filter((ell) => {
                        return ell.post_id === el.id;
                    }),
                    scrap: post_scrap.filter((ell) => {
                        return ell.post_id === el.id;
                    }),
                    comment: post_comment.filter((ell) => {
                        return ell.post_id === el.id;
                    }),
                });
            }
            res.status(200).json({ data: allPost });
        } catch (err) {
            res.status(500).json({ message: 'err' });
        }
    },
    uploadpost: async (req, res) => {
        try {
            // const file = req.file;

            const obj = JSON.parse(JSON.stringify(req.body.post_page));
            console.log('upload', req, obj[0]["'content'"]);
            const accessToken = req.cookies.accessToken;
            // console.log(req);
            const userinfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
            // console.log(userinfo);
            if (userinfo) {
                const { title, category } = req.body;
                await post_container.create({
                    title,
                    category,
                    user_id: userinfo.id,
                });

                const findcontainer = await post_container.findOne({
                    where: {
                        title: title,
                        category: category,
                        user_id: userinfo.id,
                    },
                    attributes: ['id'],
                });
                // console.log(req.body.post_page[0]);
                if (findcontainer) {
                    for (let i = 0; i < req.files.length; i++) {
                        // console.log(req.files, obj[i][content]);
                        if (req.files[i] !== undefined)
                            post.create({
                                post_id: findcontainer.id,
                                img: req.files[i].location,
                                content: obj[i]["'content'"],
                            });
                        else {
                            post.create({
                                post_id: findcontainer.id,
                                img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
                                content: obj[i]["'content'"],
                            });
                        }
                    }
                }
            }
            res.status(200).json({ messasge: 'upload complete' });
        } catch (err) {
            res.status(500).json({ message: 'Bad Request' });
        }
    },

    getpostdetail: async (req, res) => {
        try {
            const postInfo = await post_container.findOne({
                where: { id: req.params.id },
                attributes: [`id`, `title`, `category`, `user_id`, 'createdAt'],
            });

            const post_page = await post.findAll({
                where: { post_id: postInfo.id },
                attributes: ['id', 'img', 'content'],
            });

            const writerInfo = await User.findOne({
                where: { id: postInfo.user_id },
                attributes: ['username', 'profile_img', 'id'],
            });

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
            }

            const userLike = await like.findAll({ where: { post_id: req.params.id } });
            // ⬆️ 포스트에 대한 좋아요 누른 데이터.

            const userDisLike = await dislike.findAll({ where: { post_id: req.params.id } });
            // ⬆️ 포스트에 대한 싫어요를 누른 데이터.

            const userComment = await comment.findAll({
                where: { post_id: req.params.id },
                attributes: ['id', 'user_id', 'txt'],
            });

            for (let el of userComment) {
                const userName = await User.findOne({ where: { id: el.user_id }, attributes: ['username'] });
                el.dataValues.userName = userName.username;
                //console.log(el.userName);
            }

            const scrapList = await scrap.findAll({ where: { post_id: req.params.id } });

            res.status(200).json({
                data: {
                    post: {
                        id: postInfo.id,
                        title: postInfo.title,
                        category: postInfo.category,
                        writerInfo: writerInfo,
                        post_page: post_page,
                        like: { userLike: userLike, didIL: didIL },
                        dislike: { userDisLike: userDisLike, didIDisL: didIDisL },
                        scrap: { scrapList: scrapList, amIScrapped: amIScrapped },
                        comment: userComment,
                    },
                },
            });
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
    editpost: async (req, res) => {
        try {
            const id = req.params.id;
            const { title, category } = req.body;
            if (title && category) {
                await post_container.update(
                    {
                        title: title,
                        category: category,
                    },
                    { where: { id } },
                );
                await post.destroy({ where: { id } });
                for (let i = 0; i < req.files.length; i++) {
                    // console.log(req.files, obj[i][content]);
                    if (req.files[i] !== undefined)
                        post.create({
                            post_id: findcontainer.id,
                            img: req.files[i].location,
                            content: obj[i]["'content'"],
                        });
                    else {
                        post.create({
                            post_id: findcontainer.id,
                            img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
                            content: obj[i]["'content'"],
                        });
                    }
                }
                res.status(200).json({ message: 'ok' });
            } else {
                res.status(400).json({ message: '빈칸이 있나?' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Bad Request' });
        }
    },
    deletepost: async (req, res) => {
        try {
            await post_container.destroy({
                where: {
                    id: req.params.id,
                },
            });
            await post.destroy({
                where: {
                    post_id: req.params.id,
                },
            });
            res.status(200).json({ message: 'ok' });
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },

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
            console.log('comment', req.body);
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
