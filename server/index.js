require('dotenv').config();
const request = require('request');
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
        if (!error && response.statusCode == 200) {
            // console.log('바디', JSON.parse(response.body).access_token);
            request.get(
                {
                    url: 'https://kapi.kakao.com/v2/user/me',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${JSON.parse(response.body).access_token}`,
                    },
                },
                async (err, response, body) => {
                    if (!err) {
                        // console.log(response);
                        res.status(200).json({ message: 'ok', data: JSON.parse(response.body) });
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
