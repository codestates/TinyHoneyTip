const { User, post_container, scrap, post, dislike, like, comment } = require('../../models');
const jwt = require('jsonwebtoken');
const { userInfo } = require('os');
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
                //console.log('마이페이지토큰검증한거' + Token);
                if (!Token) res.status(404).json({ message: 'Bad Request' });
                else {
                    const findUserInfo = await User.findOne({
                        where: { email: Token.email },
                    });
                    //console.log('아이디:' + findUserInfo.id);

                    const findMyPost_container = await post_container.findAll({
                        attributes: ['title', 'category', 'user_id'],
                        where: { user_id: findUserInfo.id },
                    });

                    findMyPost_container.map(el => {
                        const postPage = await post.findAll({where: {post_id: el.id}});
                        const findScrap = await scrap.findAll({where: { post_id: el.id }});
                        const findComment = await comment.findAll({where: {post_id: el.id}});
                        const findLike = await like.findAll({where: {post_id: el.id}});

                        return {
                            id: el.id,
                            title: el.title,
                            category: el.category,
                            post_page: postPage,
                            like: findLike,
                            scrap: findScrap,
                            comment: findComment
                        }
                    });
                    
                    const findMyScrap = scrap.findAll({where: {user_id: Token.id}});
                    
                    const scrapedPost = findMyScrap.map(el => {
                        const scrapPost_c = await post_container.findAll({attributes: ['title', 'category', 'user_id'], where: {id: el.post_id}});
                        //포스트 컨테이너에서 타이틀, 카테고리
                        scrapPost_c.map(el => {
                            const scrapPostPage = await post.findAll({where: {post_id: el.id}});//포스트 페이지
                            const findComment = await comment.findAll({where: {post_id: el.id}});
                            const findLike = await like.findAll({where: {post_id: el.id}});
                            const findScrap = await scrap.findAll({where: { post_id: el.id }});

                            return {
                                id: el.id,
                                title: el.title,
                                category: el.category,
                                post_page: scrapPostPage,
                                like: findLike,
                                scrap: findScrap,
                                comment: findComment
                            }
                        })
                    })
                    

                    console.log('성공');
                    res.status(200).json({
                        message: 'ok',
                        data: {
                            userInfo: findUserInfo,
                            findMyPost_container,
                            myscrap: findMyScrap,
                            alert: '',
                        },
                    });
                }
            }
        } catch (err) {
            //console.log('에러다');
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
                    if(email)
                    const newInfo = await User.update(
                        {
                            email,
                            username,
                            profile_img,
                            password,
                        },
                        { where: { email: token } },
                    );
                    delete newInfo.password;
                    res.status(200).json({
                        message: 'ok',
                        data: {
                            userInfo: newInfo,
                        },
                    });
                }
            }
        } catch (err) {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
};
