const { User, post_container, scrap, post, like, comment } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    getmypage: async (req, res) => {
        console.log('쿠키' + req.cookies.accessToken);
        const accessToken = req.cookies.accessToken;
        try {
            if (!accessToken) {
                //console.log('토큰에러');
                res.status(404).json({ message: 'Bad Request' });
            } else {
                const Token = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
                if (!Token) res.status(404).json({ message: 'Bad Request' });
                else {
                    const findUserInfo = await User.findOne({
                        where: { email: Token.email },
                    });
                    console.log(Token);
                    const findMyPost_container = await post_container.findAll({
                        attributes: ['title', 'category', 'user_id', 'id'],
                        where: { user_id: findUserInfo.id },
                    });
                    console.log('내 게시물', findMyPost_container[0]);

                    let post_page = [];
                    let post_scrap = [];
                    let post_comment = [];
                    let post_like = [];
                    const myPost = [];
                    for (let el of findMyPost_container) {
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

                        myPost.push({
                            id: el.id,
                            title: el.title,
                            category: el.category,
                            post_page: post_page,
                            like: post_like,
                            scrap: post_scrap,
                            comment: post_comment,
                        });
                    }
                    //console.log('마이포스트!!!', myPost[0]);

                    const findScrap = await scrap.findAll({
                        where: { user_id: Token.id },
                        attributes: ['post_id'],
                    });
                    // ⬆️ 유저아이디로 내가 스크랩한 포스트 아이디 찾기.

                    // ⬇️ findScrap에서 post_id와 id가 같은 포스트컨테이너를 배열로 리턴
                    let scrapPost_c = [];
                    for (let el of findScrap) {
                        let postContainer = await post_container.findOne({
                            attributes: ['title', 'category', 'user_id', 'id'],
                            where: { id: el.post_id },
                        });
                        scrapPost_c.push(postContainer);
                    }
                    console.log('스크랩포스트컨테이너', scrapPost_c[0].id);

                    let scrap_page = [];
                    let scrap_comment = [];
                    let scrap_like = [];
                    let scrap_scr = [];
                    const myScrap = [];
                    for (let el of scrapPost_c) {
                        let page = await post.findAll({
                            where: { post_id: el.id },
                            attributes: ['post_id', 'content', 'img'],
                        });
                        scrap_page.push(page);

                        let comment = await comment.findAll({
                            where: { post_id: el.id },
                            attributes: ['user_id', 'txt', 'post_id'],
                        });
                        scrap_comment.push(comment);

                        let like = await like.findAll({
                            where: { post_id: el.id },
                            attributes: ['user_id', 'post_id'],
                        });
                        scrap_like.push(like);

                        let scrap = await scrap.findAll({
                            where: { post_id: el.id },
                            attributes: ['user_id', 'post_id'],
                        });
                        scrap_scr.push(scrap);

                        myScrap.push({
                            id: el.id,
                            title: el.title,
                            category: el.category,
                            post_page: scrap_page,
                            like: scrap_like,
                            scrap: scrap_scr,
                            comment: scrap_comment,
                        });
                    }

                    console.log('성공');
                    res.status(200).json({
                        message: 'ok',
                        data: {
                            userInfo: findUserInfo,
                            myPost: myPost,
                            myScrap: myScrap,
                            alert: '',
                        },
                    });
                }
            }
        } catch (err) {
            console.log('에러다');
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
                    const { email, username, password, profile_img } = req.body;
                    if (email)
                        await User.update(
                            {
                                email,
                                username,
                                profile_img,
                                password,
                            },
                            { where: { email: token } },
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
