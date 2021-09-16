import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Image from 'next/image';
import Thumbnail from '../src/components/Thumbnail';

export default function MyPage() {
    const [userInfo, setUserInfo] = useState({});
    const [myPost, setMyPost] = useState({});
    const [myScrap, setMyScrap] = useState({});

    const getMyPage = () => {
        axios.get('http://localhost:80/mypage').then((res) => {
            setUserInfo(res.body.data.userInfo);
            setMyPost(res.body.data.myPost);
            setMyScrap(res.body.data.myScrap);
        });
    };

    useEffect(() => {
        getMyPage();
    }, []);

    return (
        <>
            <Head>
                <title>My Page | Tiny Honey Tip</title>
            </Head>
            <Header />
            <a className="top-btn" onClick={() => window.scrollTo(0, 0)}>
                <img src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png" alt="" />
            </a>
            <div className="wrapper">
                <div className="side_bar">
                    <div className="user_info">
                        <div className="profile_img"></div>
                        <h3 className="user_name">{userInfo.username}🐝벌님 안녕하세요</h3>
                        <div className="user_info_body">
                            이름: {userInfo.username}
                            이메일: {userInfo.email}
                        </div>
                    </div>
                    <div id="alert"></div>
                </div>
                <div className="my_post_wrapper">
                    <h3 className="my_post">내가 쓴 글</h3>
                    {/* {myPost.map((el) => {
                        <Thumbnail list={el}></Thumbnail>;
                    })} */}
                </div>
                <div className="my_scrap_wrapper">
                    <h3 className="my_scrap">내가 스크랩한 글</h3>
                    {/* {myScrap.map((el) => {
                        <Thumbnail list={el}></Thumbnail>;
                    })} */}
                </div>
            </div>
            <Footer />
        </>
    );
}
