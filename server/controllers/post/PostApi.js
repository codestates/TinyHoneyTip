const { User, like, dislike, comment, scrap, post_container, post } = require('../../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
require('dotenv').config();

module.exports = {
    getpostlist: async (req, res) => {
        try {
            const allpost = await post_container.findAll({
                attributes: ['title', 'category', 'user_id', 'id'],
                include: [
                    {
                        model: post,
                        attributes: ['content', 'img', 'id'],
                        raw: true,
                    },
                ],
            });

            for (let onePost of allpost) {
                onePost.dataValues.like = await like.findAll({
                    where: { post_id: onePost.id },
                    attributes: ['user_id'],
                });
                onePost.dataValues.dislike = await dislike.findAll({
                    where: { post_id: onePost.id },
                    attributes: ['user_id'],
                });
                onePost.dataValues.scrap = await scrap.findAll({
                    where: { post_id: onePost.id },
                    attributes: ['user_id'],
                });
            }

            console.log('포스트리스트', allpost);

            res.status(200).json({ data: allpost });
        } catch (err) {
            console.log('에러', err);
            res.status(500).json({ message: 'err' });
        }
    },
    uploadpost: async (req, res) => {
        try {
            // const file = req.file;

            const obj = JSON.parse(JSON.stringify(req.body.post_page));
            console.log('upload', req, obj[0]["'content'"], obj);
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
                    let filenum = 0;
                    for (let el of obj) {
                        console.log('반복문', el["'image'"]);
                        if (el["'image'"] === 'true') {
                            post.create({
                                post_id: findcontainer.id,
                                img: req.files[filenum].location,
                                content: el["'content'"],
                            });
                            filenum = filenum + 1;
                            console.log('true');
                        } else {
                            post.create({
                                post_id: findcontainer.id,
                                img: 'https://cdn.discordapp.com/attachments/884717967307321407/893330609873764362/384f42c50d441c9b.png',
                                content: el["'content'"],
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
            // const postInfo = await post_container.findOne({
            //     where: { id: req.params.id },
            //     attributes: [`id`, `title`, `category`, `user_id`, 'createdAt'],
            // });

            // const post_page = await post.findAll({
            //     where: { post_id: postInfo.id },
            //     attributes: ['id', 'img', 'content'],
            // });

            // const writerInfo = await User.findOne({
            //     where: { id: postInfo.user_id },
            //     attributes: ['username', 'profile_img', 'id'],
            // });

            // let accessToken = {};
            // let didIL = {};
            // let didIDisL = {};
            // let amIScrapped = {};
            // if (req.cookies.accessToken) {
            //     accessToken = await jwt.verify(req.cookies.accessToken, process.env.ACCESS_SECRET);
            //     didIL = await like.findOne({ where: { user_id: accessToken.id, post_id: req.params.id } });
            //     // ⬆️ 내가 좋아요를 눌렀는지 확인해주는 데이터.
            //     didIDisL = await dislike.findOne({ where: { user_id: accessToken.id, post_id: req.params.id } });
            //     // ⬆️ 내가 싫어요를 눌렀는지 확인해주는 데이터.
            //     amIScrapped = await scrap.findOne({ where: { post_id: req.params.id, user_id: accessToken.id } });
            // }

            // const userLike = await like.findAll({ where: { post_id: req.params.id } });
            // // ⬆️ 포스트에 대한 좋아요 누른 데이터.

            // const userDisLike = await dislike.findAll({ where: { post_id: req.params.id } });
            // // ⬆️ 포스트에 대한 싫어요를 누른 데이터.

            // const userComment = await comment.findAll({
            //     where: { post_id: req.params.id },
            //     attributes: ['id', 'user_id', 'txt'],
            // });

            // for (let el of userComment) {
            //     const userName = await User.findOne({ where: { id: el.user_id }, attributes: ['username'] });
            //     el.dataValues.userName = userName.username;
            //     //console.log(el.userName);
            // }

            // const scrapList = await scrap.findAll({ where: { post_id: req.params.id } });

            // --------------------- api 반복문 안 쓴 걸로 바꾸기  ---------------------

            const postDetail = await post_container.findOne({
                where: { id: req.params.id },
                attributes: ['title', 'category', 'user_id'],
                include: [
                    {
                        model: User,
                        attributes: ['username', 'profile_img'],
                    },
                    {
                        model: post,
                        attributes: ['content', 'id', 'img'],
                    },
                ],
            });

            postDetail.dataValues.like = await like.findAll({
                where: { post_id: req.params.id },
                attributes: ['user_id'],
            });
            postDetail.dataValues.dislike = await dislike.findAll({
                where: { post_id: req.params.id },
                attributes: ['user_id'],
            });
            postDetail.dataValues.scrap = await scrap.findAll({
                where: { post_id: req.params.id },
                attributes: ['user_id'],
            });
            console.log('포스트디테일', postDetail);
            postDetail.dataValues.comment = await comment.findAll({
                where: { post_id: req.params.id },
                attributes: ['id', 'txt', 'user_id'],
                include: [
                    {
                        model: User,
                        attributes: ['username', 'profile_img'],
                        required: true,
                    },
                ],
            });

            res.status(200).json({
                postDetail,
                // {
                //     post: {
                //         id: postInfo.id,
                //         title: postInfo.title,
                //         category: postInfo.category,
                //         writerInfo: writerInfo,
                //         post_page: post_page,
                //         like: { userLike: userLike, didIL: didIL },
                //         dislike: { userDisLike: userDisLike, didIDisL: didIDisL },
                //         scrap: { scrapList: scrapList, amIScrapped: amIScrapped },
                //         comment: userComment,
                //     },
                // },
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Bad Request' });
        }
    },
    editpost: async (req, res) => {
        try {
            const obj = JSON.parse(JSON.stringify(req.body.post_page));
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
                await post.destroy({ where: { post_id: id } });
                console.log(req.body.post_page[0]["'image'"]);
                const filenum = 0;
                const urlnum = 0;
                for (let el of obj) {
                    console.log('반복문', el["'image'"]);
                    if (el["'image'"] === 'true') {
                        post.create({
                            post_id: findcontainer.id,
                            img: req.files[filenum].location,
                            content: el["'content'"],
                        });
                        filenum = filenum + 1;
                        console.log('true');
                    } else {
                        if (req.body.post_page_img) {
                            post.create({
                                post_id: findcontainer.id,
                                img: req.body.post_page_img[urlnum],
                                content: obj[i]["'content'"],
                            });
                            urlnum = urlnum + 1;
                        } else {
                            post.create({
                                post_id: findcontainer.id,
                                img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
                                content: obj[i]["'content'"],
                            });
                        }
                    }
                }

                // for (let i = 0; i < req.body.post_page.length; i++) {
                //     if (req.body.post_page[i]["'image'"] === 'true') {
                //         post.create({
                //             post_id: findcontainer.id,
                //             img: req.files[filenum].location,
                //             content: obj[i]["'content'"],
                //         });
                //         filenum = filenum + 1;
                //     } else if (req.body.post_page[i]["'image'"] === 'false') {
                //         if (req.body.post_page_img) {
                //             post.create({
                //                 post_id: findcontainer.id,
                //                 img: req.body.post_page_img[urlnum],
                //                 content: obj[i]["'content'"],
                //             });
                //             urlnum = urlnum + 1;
                //         } else {
                //             post.create({
                //                 post_id: findcontainer.id,
                //                 img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
                //                 content: obj[i]["'content'"],
                //             });
                //         }
                //     }
                // }
                // for (let i = 0; i < req.files.length; i++) {
                //     console.log(req.files, req.body, obj[i]["'content'"]);
                //     if (req.files[i] !== undefined)
                //         post.create({
                //             post_id: findcontainer.id,
                //             img: req.files[i].location,
                //             content: obj[i]["'content'"],
                //         });
                //     else {
                //         post.create({
                //             post_id: findcontainer.id,
                //             img: 'https://cdn.discordapp.com/attachments/881710985335934979/892219210690887730/honeycomb.png',
                //             content: obj[i]["'content'"],
                //         });
                //     }
                // }
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
                    const like = like.findOne({
                        user_id: userInfo.id,
                        post_id: req.params.id,
                    });
                    if (like) {
                        res.status(500).json({ message: 'already liked' });
                    } else {
                        like.create({
                            user_id: userInfo.id,
                            post_id: req.params.id,
                        });
                        res.status(200).json({ message: 'ok' });
                    }
                }
            }
        } catch (err) {
            console.log('라이크 에러', err);
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
            const findscrap = scrap.findOne({
                ser_id: userinfo.id,
                post_id: req.params.id,
            });
            if (!findscrap) {
                await scrap.create({
                    user_id: userinfo.id,
                    post_id: req.params.id,
                });
                res.status(200).json({ message: 'ok' });
            }
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
