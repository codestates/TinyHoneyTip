import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Modal.module.css';
import Image from 'next/image';
import signinPic from '../../public/18:8.png';

export default function Signup({
    openUpModal,
    openInModal,
    closeUpModal,
    isUpClick,
    okHandler,
    isOk,
    setIsOk,
    message,
    setMessage,
}) {
    const [ischeckEmail, setCheckEmail] = useState(false);
    const [ischeckPassword, setCheckPassword] = useState(false);
    const [isconfirm, setConfirm] = useState(false);
    const [signupInfo, setSignupInfo] = useState({
        email: '',
        password: '',
        username: '',
    });
    const convertInBtn = () => {
        closeUpModal();
        openInModal();
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
                    `${process.env.NEXT_PUBLIC_URL}/signup`,
                    {
                        email: signupInfo.email,
                        password: signupInfo.password,
                        username: signupInfo.username,
                    },
                    { 'Content-Type': 'application/json', withCredentials: true },
                )
                .then((res) => {
                    if (res.data.message === 'ok') {
                        setMessage('회원가입 완료');
                        okHandler();
                        closeUpModal();
                    }
                });
        }
    };
    return (
        <>
            {isUpClick === true ? (
                <>
                    <div className={styles.Modal_back}>
                        <div className={styles.Modal_signup}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className={styles.Modal_container}>
                                    <svg
                                        className={styles.close_btn_up}
                                        onClick={closeUpModal}
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 10.5858L5.63604 4.22182L4.22182 5.63604L10.5858 12L4.22182 18.364L5.63604 19.7782L12 13.4142L18.364 19.7782L19.7782 18.364L13.4142 12L19.7782 5.63604L18.364 4.22182L12 10.5858Z"
                                            fill="black"
                                        />
                                    </svg>
                                    <h1 className={styles.Modal_logo}>Tiny Honey Tip</h1>
                                    <h2 className={styles.title}>Sign Up</h2>
                                    <div className={styles.input_cont}>
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
                                            {signupInfo.email.length === 0 ? null : (
                                                <div className={styles.checkmsg}>
                                                    {!ischeckEmail ? '올바른 이메일 형식이 아닙니다' : null}
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.input_container}>
                                            <div className={styles.label}>User Name</div>
                                            <input
                                                maxLength="8"
                                                name="username"
                                                className={styles.signin_input}
                                                type="username"
                                                placeholder="User Name 최대 8글자"
                                                onChange={(e) => inputHandler(e)}
                                                value={signupInfo.username}
                                            />
                                            {signupInfo.username.length === 0 ? null : (
                                                <div className={styles.checkmsg}>
                                                    {signupInfo.username.length > 1
                                                        ? null
                                                        : '올바른 닉네임을 입력해주세요.'}
                                                </div>
                                            )}
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
                                            />{' '}
                                            {signupInfo.password.length === 0 ? null : (
                                                <div className={styles.checkmsg}>
                                                    {!ischeckPassword ? '올바른 비밀번호 형식이 아닙니다' : null}
                                                </div>
                                            )}
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
                                            />{' '}
                                            {signupInfo.password.length === 0 ? null : (
                                                <div className={styles.checkmsg}>
                                                    {!isconfirm ? '비밀번호가 일치하지 않습니다.' : null}
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.modal_img}>
                                            <Image src={signinPic} alt="sign in picture" />
                                        </div>
                                        <div className={styles.signin_line}>
                                            <button className={styles.signin_btn} onClick={signupRequestHandler}>
                                                Sign Up
                                            </button>
                                        </div>
                                        <div className={styles.Signup_footer}>
                                            <span>계정이 있으신가요?</span>
                                            <button className={styles.Convert_btn} onClick={convertInBtn}>
                                                Sign in
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <a className="header__btn" onClick={openUpModal}>
                    Sign Up
                </a>
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
