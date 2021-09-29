import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

import Signin from '../signin/Signin';
import Signup from '../signup/Signup';
import Alert from './AlertBox';

export default function Header({ userInfo, setUserInfo, loginHandler, logoutHandler }) {
    const [isUpClick, setIsUpClick] = useState(false);
    const [isInClick, setIsInClick] = useState(false);
    const [isOk, setIsOk] = useState(false);
    const [message, setMessage] = useState('');
    const [menuClicked, setMenuClicked] = useState(false);
    // 새로고침시 로그아웃되는 문제 발생시 수정

    const openUpModal = () => {
        setIsUpClick(true);
    };
    const closeUpModal = () => {
        setIsUpClick(false);
    };
    const openInModal = () => {
        setIsInClick(true);
    };
    const closeInModal = () => {
        setIsInClick(false);
    };
    const okHandler = () => {
        setIsOk(!isOk);
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
        setIsUpClick(false);
    };

    return (
        <div className="header">
            <Link href="/content" passHref>
                {/* <h1 className="header__logo">Tiny Honey Tip</h1> */}
                <div className="header__logo">
                    <Image src="/tht_logo.png" layout="fill" alt="Tiny Honey Tip" />
                </div>
            </Link>
            <div className="header__menu__btn" onClick={menuHandler}>
                <Image
                    loader={() => 'https://img.icons8.com/material-outlined/48/000000/menu--v1.png'}
                    src="https://img.icons8.com/material-outlined/48/000000/menu--v1.png"
                    layout="fill"
                    alt="header menu"
                    unoptimized="true"
                />
            </div>
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
                    <a onClick={openInModal} className="header__btn">
                        New Post
                    </a>
                    <Signin
                        message={message}
                        setMessage={setMessage}
                        isOk={isOk}
                        setIsOk={setIsOk}
                        isInClick={isInClick}
                        setIsInClick={setIsInClick}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        loginHandler={loginHandler}
                        openUpModal={openUpModal}
                        openInModal={openInModal}
                        closeUpModal={closeUpModal}
                        closeInModal={closeInModal}
                        okHandler={okHandler}
                    />
                    <Signup
                        message={message}
                        setMessage={setMessage}
                        isOk={isOk}
                        setIsOk={setIsOk}
                        okHandler={okHandler}
                        closeUpModal={closeUpModal}
                        closeInModal={closeInModal}
                        openUpModal={openUpModal}
                        openInModal={openInModal}
                        isUpClick={isUpClick}
                        setIsUpClick={setIsUpClick}
                    />
                </div>
            )}
            <Alert isOk={isOk} okHandler={okHandler} message={message} />
        </div>
    );
}
