import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Head from 'next/head';

import { useRouter } from 'next/router';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Loading from '../src/components/Loading';

import '../styles/globals.css';
import '../styles/Landing.css';
import '../styles/SinglePost.css';
import '../styles/Content.css';
import '../styles/NewPost.css';
import '../styles/MyPage.css';
import '../styles/contentPost.css';
import '../styles/Search.css';
import '../styles/Select.css';
import '../styles/Alert.css';
import '../styles/Loading.css';
import '../styles/Weather.css';

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

    const loginHandler = (data) => {
        setUserInfo({
            ...userInfo,
            isLogin: true,
            isSocial: false,
            id: data.userInfo.id,
            email: data.userInfo.email,
            accessToken: data.accessToken,
            username: data.userInfo.username,
            profile_img: data.userInfo.profile_img,
        });
    };

    const socialHandler = (data) => {
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
        sessionStorage.clear();
        Router.push('/content');
    };
    useEffect(() => {
        setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        sessionStorage.setItem('accessToken', userInfo?.accessToken);
    });

    // loading

    const router = useRouter();
    const [isPageLoading, setPageLoading] = useState(false);
    useEffect(() => {
        router.events.on('routeChangeStart', (url) => {
            setPageLoading(true);
        });
        router.events.on('routeChangeComplete', (url) => {
            setPageLoading(false);
        });
        router.events.on('routeChangeError', (url) => {
            setPageLoading(false);
        });
    }, [router]);

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width user-scalable=yes" />
                {/* <link rel="icon" href="./public/odxkZuVe.ico"></link> */}
            </Head>
            <Header
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                loginHandler={loginHandler}
                socialHandler={socialHandler}
                logoutHandler={logoutHandler}
            />
            {isPageLoading && <Loading />}
            <Component userInfo={userInfo} setUserInfo={setUserInfo} {...pageProps} />
            <Footer />
        </>
    );
}

export default MyApp;
