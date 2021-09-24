import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';

import Signin from '../signin/Signin';
import Signup from '../signup/Signup';

export default function Header({ userInfo, setUserInfo, loginHandler, logoutHandler }) {
    const [isClick, setIsClick] = useState(false);

    const [menuClicked, setMenuClicked] = useState(false);
    // 새로고침시 로그아웃되는 문제 발생시 수정

    const openModal = () => {
        setIsClick(true);
    };

    const menuHandler = () => {
        setMenuClicked(!menuClicked);
    };

    const signOutSubmit = () => {
        const API_URL = `${process.env.NEXT_PUBLIC_URL}/signout`;
        axios
            .get(API_URL, {
                headers: {
                    authorization: userInfo.accessToken,
                },
            })
            .catch((error) => {
                console.log('logout error 쿠키 삭제 실패');
            });
        logoutHandler();
        setIsClick(false);
    };

    return (
        <div className="header">
            <Link href="/content" passHref>
                <h1 className="header__logo">Tiny Honey Tip</h1>
            </Link>
            <img
                className="header__menu__btn"
                src="https://img.icons8.com/material-outlined/48/000000/menu--v1.png"
                onClick={menuHandler}
            />
            {userInfo && userInfo.isLogin ? (
                <div className={menuClicked ? 'header__btns' : 'header__btns header__btns__closed'}>
                    <Link href="/post/new" passHref>
                        <a className="header__btn">New Post</a>
                    </Link>
                    <Link href={{ pathname: '/mypage' }} passHref>
                        <a className="header__btn">my page</a>
                    </Link>
                    <a className="header__btn" onClick={signOutSubmit}>
                        Log out
                    </a>
                </div>
            ) : (
                <div className={menuClicked ? 'header__btns' : 'header__btns header__btns__closed'}>
                    <a onClick={openModal} className="header__btn">
                        New Post
                    </a>
                    <Signin
                        isClick={isClick}
                        setIsClick={setIsClick}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        loginHandler={loginHandler}
                        openModal={openModal}
                    />
                    <Signup />
                </div>
            )}
        </div>
    );
}
