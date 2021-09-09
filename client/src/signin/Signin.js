import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Signin.module.css';

export default function Login() {
    const [isClick, setIsClick] = useState(false);
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
                // loginHandler() // 로그인 상태 변환 content에서
                return res.headers.cookies.accessToken;
            })
            .then((token) => {
                // setAccessToken(token); accesstoken 상태 contnet에서?
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
                                <div className={styles.kakaoText}>카카오 계정으로 로그인</div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button className={styles.Modal_btn} onClick={openModal}>
                    로그인
                </button>
            )}
        </>
    );
}
