import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Signin.module.css';

export default function Signin({ userInfo }) {
    const [isClick, setIsClick] = useState(false);
    const [isOk, setIsOk] = useState(false);
    const [message, setMessage] = useState('');
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    const inputHandler = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };
    const openModal = () => {
        setIsClick(true);
    };
    const closeModal = () => {
        setIsClick(false);
    };
    const okHandler = () => {
        setIsOk(!isOk);
    };

    const loginRequestHandler = () => {
        if (loginInfo.email === '' && loginInfo.password === '') {
            setMessage('이메일과 비밀번호를 입력해주세요!');
        }
        axios
            .post(
                'http://localhost:80/signin',
                {
                    email: loginInfo.email,
                    password: loginInfo.password,
                },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
            )
            .then((res) => {
                setMessage('로그인!');
                loginHandler();
                return res.headers.cookies.accessToken;
            })
            .then((token) => {
                setUserInfo({
                    accessToken: { token },
                });
                okHandler();
            })
            .catch((err) => alert(err));
    };

    return (
        <>
            {isClick === true ? (
                <div className={styles.Modal_back}>
                    <div className={styles.Modal}>
                        <button className={styles.close_btn} onClick={closeModal}>
                            X
                        </button>
                        <div className={styles.Modal_container}>
                            <span className={styles.title}>로그인</span>
                            <input
                                className={styles.login_input}
                                name="email"
                                type="text"
                                placeholder="email을 입력하세요"
                                onChange={(e) => inputHandler(e)}
                                value={loginInfo.email}
                            />
                            <input
                                className={styles.login_input}
                                name="password"
                                type="password"
                                placeholder="password를 입력하세요"
                                onChange={(e) => inputHandler(e)}
                                value={loginInfo.password}
                            />
                            <button className={styles.login_btn} onClick={loginRequestHandler}>
                                로그인
                            </button>
                            <button className={styles.kakao_btn}>
                                <img
                                    className={styles.kakaoLogo}
                                    src="https://developers.kakao.com/tool/resource/static/img/button/kakaolink/kakaolink_btn_medium.png"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button className={styles.Modal_btn} onClick={openModal}>
                    Sign In
                </button>
            )}
            {!isOk ? null : (
                <div className={styles.alert_container}>
                    <div className={styles.alert_box}>{message}</div>
                    <div>
                        <button className={styles.alert_btn} onClick={okHandler}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
