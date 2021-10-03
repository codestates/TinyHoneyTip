const { User, post_container, scrap, post, like, comment } = require('../../models');
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
                //console.log(Token);
                if (!Token) res.status(404).json({ message: 'Bad Request' });
                else {
                    const findMyPost_container = await post_container.findAll({
                        attributes: ['title', 'category', 'user_id', 'id'],
                        where: { user_id: Token.id },
                        include: [
                            {
                                model: post,
                                attributes: ['content', 'img'],
                                where: {
                                    post_id: id,
                                },
                            },
                        ],
                    });
                    console.log('ㅇㄹㄹㅇ', findMyPost_container);
                    let myPost = [];

                    // let findPages = await post.findAll({
                    //     attributes: ['id', 'content', 'img', 'post_id'],
                    // });
                    // let findScraps = await scrap.findAll({
                    //     attributes: ['id', 'user_id', 'post_id'],
                    // });
                    // let findComments = await comment.findAll({
                    //     attributes: ['user_id', 'txt', 'post_id'],
                    // });
                    // let findLikes = await like.findAll({
                    //     attributes: ['user_id', 'post_id'],
                    // });
                    // for (let el of findMyPost_container) {
                    //     myPost.push({
                    //         id: el.id,
                    //         title: el.title,
                    //         category: el.category,
                    //         post_page: findPages.filter((page) => {
                    //             return page.post_id === el.id;
                    //         }),
                    //         like: findLikes.filter((like) => {
                    //             return like.post_id === el.id;
                    //         }),
                    //         scrap: findScraps.filter((scrap) => {
                    //             return scrap.post_id === el.id;
                    //         }),
                    //         comment: findComments.filter((comment) => {
                    //             return comment.post_id === el.id;
                    //         }),
                    //     });
                    // }
                    //console.log('마이포스트!!!', myPost[0]);
                    // ------------------마이포스트 끝!!  마이스크랩 시작!!---------------------

                    const findScrap = await scrap.findAll({
                        where: { user_id: Token.id },
                        attributes: ['post_id'],
                    });

                    // ⬆️ 유저아이디로 내가 스크랩한 포스트 아이디 찾기.

                    // ⬇️ findScrap에서 post_id와 id가 같은 포스트컨테이너를 배열로 리턴
                    let scrapPost_c = [];
                    if (findScrap.length === 0) {
                    }

                    for (let el of findScrap) {
                        let postContainer = await post_container.findOne({
                            attributes: ['title', 'category', 'user_id', 'id'],
                            where: { id: el.post_id },
                        });
                        scrapPost_c.push(postContainer);
                    }
                    console.log('스크랩포스트컨테이너', scrapPost_c[0].id);
                    const myScrap = [];
                    // for (let el of scrapPost_c) {
                    //     myScrap.push({
                    //         id: el.id,
                    //         title: el.title,
                    //         category: el.category,
                    //         post_page: findPages.filter((page) => {
                    //             return page.post_id === el.id;
                    //         }),
                    //         like: findLikes.filter((like) => {
                    //             return like.post_id === el.id;
                    //         }),
                    //         scrap: findScraps.filter((scrap) => {
                    //             return scrap.post_id === el.id;
                    //         }),
                    //         comment: findComments.filter((comment) => {
                    //             return comment.post_id === el.id;
                    //         }),
                    //     });
                    // }
                    // ------------------마이스크랩 끝!!  알러트 시작!!---------------------

                    //alert - scrap 시작
                    const alertScrapArr = [];
                    const alertScrapId = [];
                    // for (let el of findMyPost_container) {
                    //     const Id = await scrap.findOne({
                    //         where: {
                    //             post_id: el.id,
                    //         },
                    //         createdAt: {
                    //             [Op.lt]: new Date(),
                    //             [Op.gt]: new Date(new Date() - 0 * 7 * 0 * 0),
                    //         },
                    //         attributes: ['user_id'],
                    //         include: [{
                    //             model: User,
                    //             attributes: ['username']
                    //         }]
                    //     });
                    //     if (Id !== null) {
                    //         alertScrapId.push({
                    //             userId: Id,
                    //             title: el.title,
                    //         });
                    //     }
                    // }
                    console.log(findMyPost_container[0]);
                    const a = await scrap.findOne({
                        where: { post_id: findMyPost_container[0].id },
                        attributes: ['user_id'],
                        include: [
                            {
                                model: User,
                                attributes: ['username'],
                            },
                        ],
                    });
                    console.log('에이이이', a);

                    // for (let id of alertScrapId) {
                    //     const username = await User.findOne({
                    //         where: { id: id.userId }, //이게 배열이어서 문제생김... 유저아이디 어떻게 찾을지 생각해보기.
                    //         attributes: ['username'],
                    //     }).username;
                    //     console.log(username);
                    //     alertScrapArr.push({
                    //         title: id.title,
                    //         userName: username,
                    //     });
                    // }

                    // alert - like 시작

                    // const alertLikeArr = [];
                    // const alertLikeId = [];
                    // for (let el of findMyPost_container) {
                    //     const Id = await like.findOne({
                    //         where: {
                    //             post_id: el.id,
                    //         },
                    //         createdAt: {
                    //             [Op.lt]: new Date(),
                    //             [Op.gt]: new Date(new Date() - 0 * 7 * 0 * 0),
                    //         },
                    //         attributes: ['user_id'],
                    //     });

                    //     if (Id) {
                    //         alertLikeId.push({
                    //             userId: Id,
                    //             title: el.title,
                    //         });
                    //     }
                    // }

                    // for (let id of alertLikeId) {
                    //     const username = await User.findOne({
                    //         where: { id: id.userId },
                    //         attributes: ['username'],
                    //     }).username;

                    //     alertLikeArr.push({
                    //         title: id.title,
                    //         userName: username,
                    //     });
                    // }
                    console.log(alertLikeId[0].username);
                    console.log('성공');

                    res.status(200).json({
                        message: 'ok',
                        data: {
                            // myPost: myPost,
                            // myScrap: myScrap,
                            // alert: {
                            //     scrap: alertScrapArr,
                            //     like: alertLikeArr,
                            // },
                        },
                    });
                }
            }
        } catch (err) {
            console.log('캐치에러다');
            res.status(400).json({ message: 'Bad Request' });
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
