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
        Router.push('/');
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
            console.log('router is changing');
            setPageLoading(true);
        }); //페이지 바뀌면 실행
        router.events.on('routeChangeComplete', (url) => {
            console.log('router is complete');
            setPageLoading(false);
        }); // 완료하면 실행
        router.events.on('routeChangeError', (url) => {
            console.log('router is err');
            setPageLoading(false);
        }); // 에러나면 실행
    }, [router]);
    //

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width user-scalable=yes" />
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
