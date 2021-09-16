import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';

import Signin from '../signin/Signin';
import Signup from '../signup/Signup';

export default function Header() {
    const [isClick, setIsClick] = useState(false);
    // 새로고침시 로그아웃되는 문제 발생시 수정
    const [userInfo, setUserInfo] = useState({
        isLogin: false,
        isSocial: false,
        accessToken: '',
        userName: '',
        profile: '',
    });
    const openModal = () => {
        setIsClick(true);
    };
    const loginHandler = () => {
        // 서버에 요청 보내고 response 반영하여 userInfo 수정
        setUserInfo({
            isLogin: true,
            isSocial: true,
        });
    };

    const logoutHandler = () => {
        // 서버에 요청 보내고 response 반영하여 userInfo 수정
        setUserInfo({
            isLogin: false,
            isSocal: false,
            accessToken: '',
            userName: '',
            profile: '',
        });
    };

    return (
        <div className="header">
            <Link href="/content" passHref>
                <h1 className="header__logo">Tiny Honey Tip</h1>
            </Link>
            {userInfo.isLogin ? (
                <div className="header__btns">
                    <Link href="/post/new" passHref>
                        <a className="header__btn">New Post</a>
                    </Link>
                    <Link href="/mypage" passHref>
                        <a className="header__btn">my page</a>
                    </Link>
                    <button className="header__btn" onClick={logoutHandler}>
                        Log out
                    </button>
                </div>
            ) : (
                <div className="header__btns">
                    <a onClick={openModal} className="header__btn">
                        New Post
                    </a>
                    <Signin
                        isClick={isClick}
                        setIsClick={setIsClick}
                        userInfo={userInfo}
                        loginHandle={loginHandler}
                        openModal={openModal}
                    />
                    <Signup />
                </div>
            )}
        </div>
    );
}
