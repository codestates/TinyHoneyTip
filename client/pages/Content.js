import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Thumbnail from '../src/components/Thumbnail';
import { testPost } from '../src/assets/mock';
import Search from '../src/components/Search';
import axios from 'axios';

export default function Content() {
    const [postList, setPostList] = useState(testPost.data.post); // []
    // const [items, setItems] = useState(10);
    // const [preItems, setPreItems] = useState(0);
    const [isClick, setClick] = useState(false);
    const categories = ['All', '운동', '생활', '동물', '쇼핑', '휴지통'];
    const [categoryBtn, setCategoryBtn] = useState('All');

    const categoryHandler = (e) => {
        setCategoryBtn(e.target.value);

        if (categoryBtn === 'All') {
            setPostList(testPost.data.post);
        } else {
            const filteredData = postList.filter((el) => {
                return el.category === e.target.value;
            });
            setPostList(filteredData);
        }
    };

    const clickHandler = () => {
        setClick(!isClick);
    };
    // const getPostsData = () => {
    //     axios.get('http://localhost:80/post').then((res) => {
    //         const result = res.data.post.slice(preItems, items);
    //         setPostList(...postList, ...result);
    //         console.log(res.data.post);
    //     });
    // };

    useEffect(() => {
        setPostList(testPost.data.post);
    }, [testPost.data.post]);

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
                                    <button className="nav_btn" onClick={clickHandler}>
                                        <h1>카테고리</h1>
                                        <section>
                                            {categories.map((cate) => {
                                                return (
                                                    <div>
                                                        <button
                                                            key={cate}
                                                            className="nav_items"
                                                            value={cate}
                                                            onClick={(e) => categoryHandler(e)}>
                                                            {cate}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </section>
                                    </button>
                                </div>
                            </nav>
                        ) : (
                            <nav className="nav_area">
                                <div className="nav_container">
                                    <button className="nav_btn" onClick={(e) => clickHandler(e)}>
                                        <h1>카테고리</h1>
                                    </button>
                                </div>
                            </nav>
                        )}

                        <div className="best_container">
                            <div className="best_title_container"></div>
                            <div className="best_list_container">
                                <div className="best_list_top">
                                    <div className="best_list_title">🐝 BEST 꿀팁</div>
                                    <div className="best_list">
                                        {postList.slice(0, 5).map((best) => {
                                            console.log(best);
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
                                                                        <div className="best_author">🐝 글쓴이</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <Search postList={postList} />
                                    <Thumbnail postList={postList} setPostList={setPostList} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <a className="top-btn" onClick={() => window.scrollTo(0, 0)}>
                <img src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png" />
            </a>
            <Footer />
        </>
    );
}
