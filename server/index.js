require('dotenv').config();
const request = require('request');
const jwt = require('jsonwebtoken');
const { User } = require('./models');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 80;

const controllers = require('./controllers/Index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        'Access-Control-Allow-Origin': '*',
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
    }),
);
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('helloworld');
});
app.use('/mypage', controllers.mypage);
app.use('/post', controllers.post);

app.delete('/user', controllers.user);
app.post('/signin/kakao', async (req, res) => {
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    var data = `grant_type=authorization_code&client_id=${process.env.KAKAO_REST_KEY}&code=${req.body.authorizationCode}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`;
    var options = {
        url: 'https://kauth.kakao.com/oauth/token',
        method: 'POST',
        headers: headers,
        body: data,
    };

    function callback(error, response, body) {
        if (!error) {
            // console.log('바디', JSON.parse(response.body));
            request.get(
                {
                    url: 'https://kapi.kakao.com/v2/user/me',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${JSON.parse(response.body).access_token}`,
                    },
                },
                async (err, response1, body) => {
                    if (!err) {
                        const obj = JSON.parse(response1.body);
                        console.log('obj', obj);
                        if (!obj.id) {
                            request.post(
                                {
                                    url: 'https://kauth.kakao.com/oauth/token',
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    body: `grant_type=refresh_token&client_id=${
                                        process.env.KAKAO_REST_KEY
                                    }&refresh_token=${JSON.parse(response.body).refresh_token}`,
                                },
                                async (err, resp, body) => {
                                    // console.log('resp', resp);
                                    // return request(options, callback);
                                },
                            );
                        } else {
                            const finduser = await User.findOne({
                                where: {
                                    email: obj.id,
                                },
                            });
                            if (finduser) {
                                const accessToken = jwt.sign(finduser.dataValues, process.env.ACCESS_SECRET);

                                res.cookie('accessToken', accessToken, {
                                    sameSite: 'none',
                                    secure: true,
                                    httpOnly: true,
                                });
                                return res.status(200).json({
                                    message: 'login complete',
                                    data: { accessToken: accessToken, userInfo: finduser },
                                });
                            } else {
                                await User.create({
                                    email: obj.id,
                                    password: obj.id,
                                    username: obj.properties.nickname,
                                    profile_img: obj.kakao_account.profile.profile_image_url,
                                });
                                const finduser1 = await User.findOne({ where: { email: obj.id } });
                                const accessToken1 = jwt.sign(finduser1.dataValues, process.env.ACCESS_SECRET);

                                res.cookie('accessToken', accessToken1, {
                                    sameSite: 'none',
                                    secure: true,
                                    httpOnly: true,
                                });
                                return res.status(200).json({
                                    message: 'login complete',
                                    data: { accessToken: accessToken1, userInfo: finduser1 },
                                });
                            }
                        }
                        // console.log('소셜로그인바디', obj, response1);
                    }
                },
            );
        } else {
            res.status(400).json({ message: 'err' });
        }
    }
    request(options, callback);
});
app.post('/signin', controllers.signin);
app.post('/signup', controllers.signup);
app.get('/signout', controllers.signout);

app.listen(port, () => {
    console.log(`서버가 ${port}번에서 작동중입니다.`);
});
