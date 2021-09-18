import Link from 'next/link';
import React, { useState } from 'react';
import Signin from '../signin/Signin';
import Signup from '../signup/Signup';
import axios from 'axios';

export default function Header({ userInfo, setUserInfo, loginHandler, logoutHandler }) {
    const [isClick, setIsClick] = useState(false);
    // 새로고침시 로그아웃되는 문제 발생시 수정

    const openModal = () => {
        setIsClick(true);
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
            {userInfo && userInfo.isLogin ? (
                <div className="header__btns">
                    <Link href="/post/new" passHref>
                        <a className="header__btn">New Post</a>
                    </Link>
                    <Link href={{ pathname: '/mypage' }} passHref>
                        <a className="header__btn">my page</a>
                    </Link>
                    <button className="header__btn" onClick={signOutSubmit}>
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
