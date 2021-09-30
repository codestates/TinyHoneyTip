import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
export default function Home() {
    const sectionCount = 5;

    let init = function () {};
    useEffect(() => {
        init = function () {
            document.getElementById('landingPage').onmousewheel = function (e) {
                console.dir(e);
                const section1offset =
                    document.getElementById(`section1`).offsetTop +
                    document.getElementById(`section1`).offsetParent.offsetTop;
                const section2offset =
                    document.getElementById(`section2`).offsetTop +
                    document.getElementById(`section2`).offsetParent.offsetTop;
                const section3offset =
                    document.getElementById(`section3`).offsetTop +
                    document.getElementById(`section3`).offsetParent.offsetTop;
                const section4offset =
                    document.getElementById(`section4`).offsetTop +
                    document.getElementById(`section4`).offsetParent.offsetTop;
                const section5offset =
                    document.getElementById(`section5`).offsetTop +
                    document.getElementById(`section5`).offsetParent.offsetTop;
                const currentScrollTop = document.querySelector('html').scrollTop;
                let page = 1;
                if (currentScrollTop < section2offset) {
                    page = 1;
                } else if (currentScrollTop < section3offset) {
                    page = 2;
                } else if (currentScrollTop < section4offset) {
                    page = 3;
                } else if (currentScrollTop < section5offset) {
                    page = 4;
                } else {
                    page = 5;
                }
                if (e.wheelDelta < 0) {
                    // console.log('wheel down');
                    if (page === sectionCount) {
                    } else {
                        page++;
                        let nextSection = document.getElementById(`section${page}`).offsetTop;
                        nextSection += document.getElementById(`section${page}`).offsetParent.offsetTop;
                        window.scrollTo({ top: nextSection, behavior: 'auto' });
                    }
                } else {
                    // console.log('wheel up');
                    if (page === 1) {
                    } else {
                        page--;
                        let nextSection = document.getElementById(`section${page}`).offsetTop;
                        nextSection += document.getElementById(`section${page}`).offsetParent.offsetTop;
                        window.scrollTo({ top: nextSection, behavior: 'smooth' });
                    }
                }
            };
        };
        init();
        return (init = function () {});
    }, []);

    return (
        <div id="landingPage">
            <Head>
                <title>Welcome | Tiny Honey Tip</title>
            </Head>
            <div className="landing">
                <div className="landing__sections">
                    <section className="landing__section" id="section1">
                        <div className="landing__section1__text">
                            <h1 className="landing__section1__title">Tiny Honey Tip</h1>
                            <h2 className="landing__section1__p">
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
                        <div className="landing__section1__pic-div">
                            <Image
                                className="landing__section1__pic"
                                src="/honeycomb.png"
                                layout="fill"
                                alt="honeycomb"
                            />
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
                        <div className="landing__section1__text">
                            <h2 className="landing__section1__p">
                                일상에서 꼭 필요한 <br />
                                <br />
                                각종 사소한 꿀팁을 <br />
                                <br />
                                시간 낭비없이 본론만 얻으세요!
                            </h2>
                        </div>
                        <div className="landing__section2__slide">
                            <ul style={{ width: `calc(100% * 4)` }}>
                                <li style={{ width: `calc(100% / 4)` }}>
                                    <Image src="/honeycomb.png" layout="fill" alt="honeycomb" />
                                </li>
                                <li style={{ width: `calc(100% / 4)` }}>
                                    <Image src="/honeycomb.png" layout="fill" alt="honeycomb" />
                                </li>
                                <li style={{ width: `calc(100% / 4)` }}>
                                    <Image src="/honeycomb.png" layout="fill" alt="honeycomb" />
                                </li>
                                <li style={{ width: `calc(100% / 4)` }}>
                                    <Image src="/honeycomb.png" layout="fill" alt="honeycomb" />
                                </li>
                            </ul>
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
                        <div className="landing__section1__text">
                            <h2 className="landing__section1__p">뭐시기</h2>
                        </div>
                        <div className="landing__section3__slide">
                            <input type="radio" name="section3-pos" id="section-pos1" />
                            <input type="radio" name="section3-pos" id="section-pos2" />
                            <input type="radio" name="section3-pos" id="section-pos3" />
                            <input type="radio" name="section3-pos" id="section-pos4" />
                            <ul style={{ width: `calc(100% * 4)` }}>
                                <li style={{ width: `calc(100% / 4)` }}>
                                    <Image src="/honeycomb.png" layout="fill" alt="honeycomb" />
                                </li>
                                <li style={{ width: `calc(100% / 4)` }}>
                                    <Image src="/honeycomb.png" layout="fill" alt="honeycomb" />
                                </li>
                                <li style={{ width: `calc(100% / 4)` }}>
                                    <Image src="/honeycomb.png" layout="fill" alt="honeycomb" />
                                </li>
                                <li style={{ width: `calc(100% / 4)` }}>
                                    <Image src="/honeycomb.png" layout="fill" alt="honeycomb" />
                                </li>
                            </ul>
                            <p className="section3__bullet">
                                <label htmlFor="section-pos1">1</label>
                                <label htmlFor="section-pos2">2</label>
                                <label htmlFor="section-pos3">3</label>
                                <label htmlFor="section-pos4">4</label>
                            </p>
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
                        <div className="landing__section4__slide">
                            <ul>
                                <li>
                                    <div className="landing-user-image">
                                        <Image src="/free-icon-bee.png" layout="fill" alt="bee user" />
                                    </div>
                                    <span>박은빈 꿀벌님</span>
                                    {/* <span>
                                        "꿀팁 대박.
                                        <br /> 왜 안씀?"
                                    </span> */}
                                </li>
                            </ul>
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
                    <section className="landing__section" id="section5">
                        <div className="landing__section1__text">
                            <h1 className="landing__section1__title">Tiny Honey Tip</h1>
                            <h2 className="landing__section1__p">
                                혹시 알아요? <br />
                                <br />
                                대박 HoneyTip 기다리고 있을지...!
                            </h2>
                        </div>
                        <Link href="/content" passHref>
                            <button className="landing__start-btn">시작하기</button>
                        </Link>
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
