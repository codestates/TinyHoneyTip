import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Select from '../src/components/Select';
import { testPost } from '../src/assets/mock';

export default function Content() {
    const [isClick, setClick] = useState(false);
    const [postList, setPostList] = useState(testPost.data.post);
    console.log(postList);
    // const getPostsData = () => {
    //     axios.get('http://localhost:80/post').then((res) => {
    //         setPostList(res.data.post);
    //         console.log(res.data.post);
    //     });
    // };
    const clickHandler = () => {
        setClick(!isClick);
    };
    useEffect(() => {
        setPostList(testPost.data.post);
        console.log(testPost.data.post);
    });
    // useEffect(() => {
    //     getPostsData();
    // }, []);
    return (
        <>
            <Head>
                <title>Content Page | Tiny Honey Tip</title>
            </Head>
            <Header />
            <div>
                <div className="content">
                    <div className="best_content_container">
                        {isClick ? (
                            <nav className="nav_area">
                                <div className="nav_container">
                                    <button onClick={clickHandler}>X</button>
                                    <ul className="nav_items">
                                        <li className="cate">
                                            <a className="category">
                                                <img className="cate_icon" src="" />
                                                생활
                                            </a>
                                            <a className="category">
                                                <img className="cate_icon" src="" />
                                                요리
                                            </a>
                                            <a className="category">
                                                <img className="cate_icon" src="" />
                                                운동
                                            </a>
                                            <a className="category">
                                                <img className="cate_icon" src="" />
                                                쇼핑
                                            </a>
                                            <a className="category">
                                                <img className="cate_icon" src="" />
                                                문화
                                            </a>
                                            <a className="category">
                                                <img className="cate_icon" src="" />
                                                휴지통
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        ) : (
                            <nav className="nav_area">
                                <div className="nav_container">
                                    <button onClick={clickHandler}>A</button>
                                </div>
                            </nav>
                        )}
                        <div className="best_container">
                            <div className="best_title_container">
                                <div className="best_title">게시글</div>
                            </div>
                            <div className="best_list_container">
                                <div className="best_list_top">
                                    <div className="best_list_title">🐝 BEST 꿀팁</div>
                                    <div className="best_list">
                                        {postList.slice(0, 5).map((best) => {
                                            return (
                                                <div className="best_item">
                                                    <div className="best_item_inner">
                                                        <div className="best_item_option">
                                                            <div className="item_overlay"></div>
                                                        </div>
                                                        <div className="best_item_header">
                                                            <Link href={`/post/${best.id}`}>
                                                                <a className="header_image">
                                                                    <img
                                                                        className="img_inner"
                                                                        alt={best.title}
                                                                        src={best.post_page[0].img}
                                                                    />
                                                                </a>
                                                            </Link>
                                                            <div className="best_desc">
                                                                <div className="best_desc_title">
                                                                    <Link href={`/post/${best.id}`}>
                                                                        <a className="best_title_font">{best.title}</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="best_desc_text">
                                                                    <Link href={`/post/${best.id}`}>
                                                                        <a className="best_text">
                                                                            <div>{best.post_page[0].content}</div>
                                                                        </a>
                                                                    </Link>
                                                                </div>
                                                                <div className="best_desc_category">
                                                                    <a className="best_category">{best.category}</a>
                                                                </div>
                                                                <div className="best_desc_user">
                                                                    <div className="best_desc_userinfo">
                                                                        <div className="best_author">글쓴이</div> 🐝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="post_list_title">🐝 꿀팁 둘러보기</div>
                                    <Select postList={postList} />
                                    <div className="post_list">
                                        {postList.map((best) => {
                                            return (
                                                <div className="best_item">
                                                    <div className="best_item_inner">
                                                        <div className="best_item_option">
                                                            <div className="item_overlay"></div>
                                                        </div>
                                                        <div className="best_item_header">
                                                            <Link href={`/post/${best.id}`}>
                                                                <a className="header_image">
                                                                    <img
                                                                        className="img_inner"
                                                                        alt={best.title}
                                                                        src={best.post_page[0].img}
                                                                    />
                                                                </a>
                                                            </Link>
                                                            <div className="best_desc">
                                                                <div className="best_desc_title">
                                                                    <Link href={`/post/${best.id}`}>
                                                                        <a className="best_title_font">{best.title}</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="best_desc_text">
                                                                    <Link href={`/post/${best.id}`}>
                                                                        <a className="best_text">
                                                                            <div>{best.post_page[0].content}</div>
                                                                        </a>
                                                                    </Link>
                                                                </div>
                                                                <div className="best_desc_category">
                                                                    <a className="best_category">{best.category}</a>
                                                                </div>
                                                                <div className="best_desc_user">
                                                                    <div className="best_desc_userinfo">
                                                                        <div className="best_author">글쓴이</div> 🐝
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
