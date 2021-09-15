import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Modal.module.css';

export default function Signup() {
    const [isClick, setIsClick] = useState(false);
    const [isOk, setIsOk] = useState(false);
    const [ischeckEmail, setCheckEmail] = useState(false);
    const [ischeckPassword, setCheckPassword] = useState(false);
    const [isconfirm, setConfirm] = useState(false);
    const [message, setMessage] = useState('회원가입 완료');
    const [signupInfo, setSignupInfo] = useState({
        email: '',
        password: '',
        userName: '',
    });
    const openModal = () => {
        setIsClick(true);
    };
    const closeModal = () => {
        setIsClick(false);
    };
    const okHandler = () => {
        setIsOk(!isOk);
    };

    const inputHandler = (e) => {
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    };
    const checkEmail = (e) => {
        let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (regExp.test(e.target.value)) setCheckEmail(true);
        else setCheckEmail(false);
    };
    const checkPassword = (e) => {
        let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/;
        if (regExp.test(e.target.value)) setCheckPassword(true);
        else setCheckPassword(false);
    };
    const checkConfirmPassword = (e) => {
        if (e.target.value !== '' && e.target.value === signupInfo.password) setConfirm(true);
        else setConfirm(false);
    };
    const signupRequestHandler = () => {
        if (
            !signupInfo.email ||
            !signupInfo.password ||
            !signupInfo ||
            !ischeckEmail ||
            !ischeckPassword ||
            !isconfirm
        ) {
            setIsOk(true);
            setMessage('모든 항목을 올바르게 입력하세요');
        } else {
            axios
                .post(
                    'http://localhost:80/signup',
                    {
                        email: signupInfo.email,
                        password: signupInfo.password,
                        userName: signupInfo.userName,
                    },
                    { 'Content-Type': 'application/json', withCredentials: true },
                )
                .then((res) => {
                    if (res.data.message === 'ok') {
                        setMessage('회원가입 완료');
                        okHandler();
                        return closeModal();
                    }
                });
        }
    };
    return (
        <>
            {isClick === true ? (
                <div className={styles.Modal_back}>
                    <div className={styles.Modal_signup}>
                        <button className={styles.close_btn} onClick={closeModal}>
                            X
                        </button>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.Modal_container}>
                                <span className={styles.title}>Sign Up</span>
                                <div className={styles.input_container}>
                                    <div className={styles.label}>Email</div>
                                    <input
                                        name="email"
                                        className={styles.signin_input}
                                        type="email"
                                        onBlur={checkEmail}
                                        placeholder="Email을 입력하세요"
                                        onChange={(e) => inputHandler(e)}
                                        value={signupInfo.email}
                                    />
                                    <div className={styles.checkmsg}>
                                        {!ischeckEmail ? '올바른 이메일 형식이 아닙니다' : 'OK'}
                                    </div>
                                </div>
                                <div className={styles.input_container}>
                                    <div className={styles.label}>Password</div>
                                    <input
                                        name="password"
                                        className={styles.signin_input}
                                        type="password"
                                        onBlur={checkPassword}
                                        placeholder="영문/숫자 조합 8~12글자"
                                        onChange={(e) => inputHandler(e)}
                                        value={signupInfo.password}
                                    />
                                    <div className={styles.checkmsg}>
                                        {!ischeckPassword ? '올바른 비밀번호 형식이 아닙니다' : 'OK'}
                                    </div>
                                </div>
                                <div className={styles.input_container}>
                                    <div className={styles.label}>Confirm Password</div>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        className={styles.signin_input}
                                        onBlur={checkConfirmPassword}
                                        placeholder="영문/숫자 조합 8~12글자"
                                        onChange={(e) => inputHandler(e)}
                                        value={signupInfo.confirmPassword}
                                    />
                                    <div className={styles.checkmsg}>
                                        {!isconfirm ? '비밀번호가 일치하지 않습니다.' : 'OK'}
                                    </div>
                                </div>
                                <div className={styles.modal_img_container}>
                                    <img className={styles.modal_img} />
                                </div>
                                <div className={styles.signin_line}>
                                    <button className={styles.signin_btn} onClick={signupRequestHandler}>
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <button className={styles.Modal_btn} onClick={openModal}>
                    Sign Up
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
