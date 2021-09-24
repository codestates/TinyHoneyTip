import React, { useState } from 'react';
import axios from 'axios';

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

import '../styles/globals.css';
import '../styles/Landing.css';
import '../styles/SinglePost.css';
import '../styles/Content.css';
import '../styles/NewPost.css';

function MyApp({ Component, pageProps }) {
    const [userInfo, setUserInfo] = useState({
        isLogin: false,
        isSocial: false,
        id: '',
        email: '',
        accessToken: '',
        username: '',
        profile_img: '',
    });

    console.log(userInfo);

    const loginHandler = (data) => {
        setUserInfo({
            ...userInfo,
            isLogin: true,
            isSocial: true,
            id: data.userInfo.id,
            email: data.userInfo.email,
            accessToken: data.accessToken,
            username: data.userInfo.username,
            profile_img: data.userInfo.profile_img,
        });
    };

    const logoutHandler = () => {
        // 서버에 요청 보내고 response 반영하여 userInfo 수정
        setUserInfo({
            ...userInfo,
            isLogin: false,
            isSocal: false,
            id: '',
            email: '',
            accessToken: '',
            username: '',
            profile_img: '',
        });
    };

    return (
        <>
            <Header
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                loginHandler={loginHandler}
                logoutHandler={logoutHandler}
            />
            <Component userInfo={userInfo} {...pageProps} />
            <Footer />
        </>
    );
}

export default MyApp;
