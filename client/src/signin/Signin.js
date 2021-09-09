import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Modal.module.css';

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
                            <span className={styles.title}>Sign In</span>
                            <div className={styles.input_container}>
                                <div className={styles.label}>Email</div>
                                <input
                                    className={styles.signin_input}
                                    name="email"
                                    type="text"
                                    placeholder="Email을 입력하세요"
                                    onChange={(e) => inputHandler(e)}
                                    value={loginInfo.email}
                                />
                            </div>
                            <div className={styles.input_container}>
                                <div className={styles.label}>Password</div>
                                <input
                                    className={styles.signin_input}
                                    name="password"
                                    type="password"
                                    placeholder="password를 입력하세요"
                                    onChange={(e) => inputHandler(e)}
                                    value={loginInfo.password}
                                />
                            </div>
                            <img className={styles.modal_img} />
                            <div className={styles.signin_line}>
                                <button className={styles.signin_btn} onClick={loginRequestHandler}>
                                    Sign In
                                </button>
                                <button className={styles.kakao_btn}>
                                    카카오 로그인
                                    <img
                                        className={styles.kakaoLogo}
                                        src="https://developers.kakao.com/tool/resource/static/img/button/kakaolink/kakaolink_btn_medium.png"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <button className={styles.Modal_btn} onClick={openModal}>
                    Sign In
                </button>
            )}
            {isOk ? (
                <div className={styles.alert_container}>
                    <div className={styles.alert_box}>{message}</div>
                    <div>
                        <button className={styles.alert_btn} onClick={okHandler}>
                            Close
                        </button>
                    </div>
                </div>
            ) : null}
        </>
    );
}
