import Link from 'next/link';
import React, { useState } from 'react';
import Signin from '../signin/Signin';

export default function Header() {
    const [userInfo, setUserInfo] = useState({
        isLogin: false,
        isSocial: false,
        accessToken: '',
        userName: '',
        profile: '',
    });
    const loginHandler = () => {
        setUserInfo({
            isLogin: true,
            isSocial: true,
        });
    };
    const logoutHandler = () => {
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
            <Link href="/content">
                <h1 className="header__logo">Tiny Honey Tip</h1>
            </Link>
            {userInfo.isLogin ? (
                <div className="header__btns">
                    <Link href="/mypage">
                        <a className="header__btn">my page</a>
                    </Link>
                    <button className="header__btn" onClick={logoutHandler}>
                        log out
                    </button>
                </div>
            ) : (
                <div className="header__btns">
                    <Signin userInfo={userInfo} />
                    <button className="header__btn" /*onClick={모달}*/>sign up</button>
                </div>
            )}
        </div>
    );
}
