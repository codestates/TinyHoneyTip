import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { userReview } from '../src/assets/userReview';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
    const sectionCount = 5;
    useEffect(() => {
        AOS.init({});
    }, []);
    // let init = function () {};
    // useEffect(() => {
    //     init = function () {
    //         document.getElementById('landingPage').onmousewheel = function (e) {
    //             console.dir(e);
    //             const section1offset =
    //                 document.getElementById(`section1`).offsetTop +
    //                 document.getElementById(`section1`).offsetParent.offsetTop;
    //             const section2offset =
    //                 document.getElementById(`section2`).offsetTop +
    //                 document.getElementById(`section2`).offsetParent.offsetTop;
    //             const section3offset =
    //                 document.getElementById(`section3`).offsetTop +
    //                 document.getElementById(`section3`).offsetParent.offsetTop;
    //             const section4offset =
    //                 document.getElementById(`section4`).offsetTop +
    //                 document.getElementById(`section4`).offsetParent.offsetTop;
    //             const section5offset =
    //                 document.getElementById(`section5`).offsetTop +
    //                 document.getElementById(`section5`).offsetParent.offsetTop;
    //             const currentScrollTop = document.querySelector('html').scrollTop;
    //             let page = 1;
    //             if (currentScrollTop < section2offset) {
    //                 page = 1;
    //             } else if (currentScrollTop < section3offset) {
    //                 page = 2;
    //             } else if (currentScrollTop < section4offset) {
    //                 page = 3;
    //             } else if (currentScrollTop < section5offset) {
    //                 page = 4;
    //             } else {
    //                 page = 5;
    //             }
    //             if (e.wheelDelta < 0) {
    //                 // console.log('wheel down');
    //                 if (page === sectionCount) {
    //                 } else {
    //                     page++;
    //                     let nextSection = document.getElementById(`section${page}`).offsetTop;
    //                     nextSection += document.getElementById(`section${page}`).offsetParent.offsetTop;
    //                     window.scrollTo({ top: nextSection, behavior: 'auto' });
    //                 }
    //             } else {
    //                 // console.log('wheel up');
    //                 if (page === 1) {
    //                 } else {
    //                     page--;
    //                     let nextSection = document.getElementById(`section${page}`).offsetTop;
    //                     nextSection += document.getElementById(`section${page}`).offsetParent.offsetTop;
    //                     window.scrollTo({ top: nextSection, behavior: 'smooth' });
    //                 }
    //             }
    //         };
    //     };
    //     init();
    //     return (init = function () {});
    // }, []);

    return (
        <div id="landingPage">
            <Head>
                <title>Welcome | Tiny Honey Tip</title>
            </Head>
            <div className="landing">
                <div className="landing__sections">
                    <section className="landing__section" id="section1">
                        <div className="landing__section__inner">
                            <div
                                className="landing__section__text"
                                data-aos="fade-right"
                                data-aos-duration="3000"
                                data-aos-once="false">
                                <h1 className="landing__section__title">Tiny Honey Tip</h1>
                                <h2 className="landing__section__p">
                                    당신의 작고 소중한 꿀팁을 <br />
                                    <br />
                                    공유하고
                                    <br />
                                    <br /> 새로운 꿀팁을 얻으세요!
                                </h2>
                                <Link href="/content" passHref>
                                    <button className="landing__start-btn">바로 시작하기</button>
                                </Link>
                            </div>
                            {/* <div className="landing__section__pic-div" data-aos="fade-right" data-aos-duration="3000">
                                <Image
                                    className="landing__section1__pic"
                                    src="/honeycomb.png"
                                    layout="fill"
                                    alt="honeycomb"
                                />
                            </div> */}
                        </div>
                        <a
                            onClick={() => {
                                let nextSection = document.getElementById('section2').offsetTop;
                                nextSection += document.getElementById('section2').offsetParent.offsetTop;
                                window.scrollTo(0, nextSection);
                            }}>
                            <div className="scroll-down"></div>
                        </a>
                    </section>
                    <section className="landing__section" id="section2">
                        <div className="landing__section__inner">
                            <div className="landing__section__text">
                                <h2 className="landing__section__p">
                                    일상에서 꼭 필요한 <br />
                                    <br />
                                    각종 사소한 꿀팁을 <br />
                                    <br />
                                    시간 낭비없이 본론만 얻으세요!
                                </h2>
                            </div>
                            <div
                                className="landing__section__pic-div__section2"
                                data-aos="fade-left"
                                data-aos-duration="3000">
                                <Image className="landing__section__pic" src="/newTip.png" layout="fill" alt="newTip" />
                            </div>
                        </div>
                        <a
                            onClick={() => {
                                let nextSection = document.getElementById('section3').offsetTop;
                                nextSection += document.getElementById('section2').offsetParent.offsetTop;
                                window.scrollTo(0, nextSection);
                            }}>
                            <div className="scroll-down"></div>
                        </a>
                    </section>
                    <section className="landing__section" id="section3">
                        <div className="landing__section__inner">
                            <div
                                className="landing__section__pic-div__section3"
                                data-aos="fade-right"
                                data-aos-duration="3000">
                                <Image
                                    className="landing__section__pic"
                                    src="/communicating.png"
                                    layout="fill"
                                    alt="communicating"
                                />
                            </div>
                            <div className="landing__section__text">
                                <h2 className="landing__section__p">
                                    당신만의 꿀팁을 <br />
                                    <br />
                                    다른 사람들과 공유해보세요.
                                </h2>
                            </div>
                        </div>
                        <a
                            onClick={() => {
                                let nextSection = document.getElementById('section4').offsetTop;
                                nextSection += document.getElementById('section2').offsetParent.offsetTop;
                                window.scrollTo(0, nextSection);
                            }}>
                            <div className="scroll-down"></div>
                        </a>
                    </section>
                    <section className="landing__section" id="section4">
                        <div className="landing__section__inner">
                            <div className="landing__section__text">
                                <h2 className="landing__section__p">
                                    당신의 꿀팁들을 <br />
                                    <br />
                                    스크랩하여 모아보세요.
                                </h2>
                            </div>
                            <div
                                className="landing__section__pic-div__section4"
                                data-aos="fade-left"
                                data-aos-duration="3000">
                                <Image
                                    className="landing__section__pic"
                                    src="/Uploading.png"
                                    layout="fill"
                                    alt="Uploading"
                                />
                            </div>
                        </div>
                        <a
                            onClick={() => {
                                let nextSection = document.getElementById('section5').offsetTop;
                                nextSection += document.getElementById('section3').offsetParent.offsetTop;
                                window.scrollTo(0, nextSection);
                            }}>
                            <div className="scroll-down"></div>
                        </a>
                    </section>
                    <section className="landing__section landing__section5" id="section5">
                        <div className="landing__section__inner__section5">
                            <div className="landing__section__text__section5">
                                <span>320</span> 명의 유저들이 Tiny Honey Tip을 이용하고 있습니다!
                            </div>
                            <div className="landing__section5__slide" data-aos="fade-up" data-aos-duration="3000">
                                <ul>
                                    {userReview?.map((el, idx) => {
                                        return (
                                            <li key={idx}>
                                                <div className="landing-user-image">
                                                    <Image src="/free-icon-bee.png" layout="fill" alt="bee user" />
                                                </div>
                                                <span className="landing-user-name">{el.username} 꿀벌님</span>
                                                <span className="landing-user-review">{el.content}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <a
                            onClick={() => {
                                let nextSection = document.getElementById('section6').offsetTop;
                                nextSection += document.getElementById('section4').offsetParent.offsetTop;
                                window.scrollTo(0, nextSection);
                            }}>
                            <div className="scroll-down"></div>
                        </a>
                    </section>
                    <section className="landing__section" id="section6">
                        <div className="landing__section__inner">
                            <div data-aos="fade-right" data-aos-duration="3000">
                                <div className="landing__section__text">
                                    <h1 className="landing__section__title">Tiny Honey Tip</h1>
                                    <h2 className="landing__section__p">
                                        혹시 알아요? <br />
                                        <br />
                                        대박 HoneyTip 기다리고 있을지...!
                                    </h2>
                                    <Link href="/content" passHref>
                                        <button className="landing__start-btn">시작하기</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <a
                        className="top-btn"
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}>
                        <Image
                            src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png"
                            alt="top-button"
                            layout="fill"
                            unoptimized="true"
                        />
                    </a>
                </div>
                <div className="scroll__down"></div>
            </div>
        </div>
    );
}
