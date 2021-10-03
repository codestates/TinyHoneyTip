import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import Category from '../src/components/Category';
import Select from '../src/components/Select';
import Search from '../src/components/Search';
import Weather from '../src/components/Weather';

export default function Content({ bestList, postList, weatherData }) {
    const [itemIndex, setItemIndex] = useState(0);
    const [post, setPost] = useState(postList?.slice(0, 7));
    const [init, setInit] = useState(postList);
    const [input, setInput] = useState('');

    const _infiniteScroll = useCallback(() => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight === scrollHeight) {
            setItemIndex(itemIndex + 7);
            setPost(post.concat(postList?.slice(itemIndex + 7, itemIndex + 14)));
        }
    }, [itemIndex, post]);

    useEffect(() => {
        window.addEventListener('scroll', _infiniteScroll, true);
        return () => window.removeEventListener('scroll', _infiniteScroll, true);
    }, [_infiniteScroll]);

    const inputHandler = (e) => {
        setInput(([e.target.name] = e.target.value));
    };
    return (
        <>
            <Head>
                <title>Content Page | Tiny Honey Tip</title>
            </Head>
            <div>
                <div className="content">
                    <div className="best_content_container">
                        <div className="best_container">
                            <Weather weatherData={weatherData} />
                            <div className="best_title_container"></div>
                            <div className="best_list_container">
                                <div className="best_list_top">
                                    <div className="best_list_title">🐝&nbsp;&nbsp;&nbsp;BEST 꿀팁</div>
                                    <div className="best_list">
                                        {bestList?.slice(0, 5).map((best) => {
                                            return (
                                                <div className="best_item" key={best.id}>
                                                    <div className="best_item_inner">
                                                        <div className="best_item_header">
                                                            <Link href={`/post/${best?.id}`}>
                                                                <div className="header_image">
                                                                    <div className="img_inner">
                                                                        <Image
                                                                            alt={best?.title}
                                                                            layout="fill"
                                                                            src={best?.post_page[0]?.img}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <div className="best_desc">
                                                                <div className="best_desc_title">
                                                                    <Link href={`/post/${best?.id}`}>
                                                                        <a className="best_title_font">{best?.title}</a>
                                                                    </Link>
                                                                </div>
                                                                <div className="best_desc_text">
                                                                    <Link href={`/post/${best?.id}`}>
                                                                        <a className="best_text">
                                                                            <div>{best?.post_page[0]?.content}</div>
                                                                        </a>
                                                                    </Link>
                                                                </div>
                                                                <div className="best_desc_category">
                                                                    <a className="best_category">{best?.category}</a>
                                                                </div>
                                                                <div className="best_desc_user">
                                                                    <div className="best_desc_userinfo">
                                                                        <div className="best_author">
                                                                            ❤️ {best?.like?.length}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="post_list_container">
                                        <div className="post_list_title">🐝&nbsp;&nbsp;&nbsp;꿀팁 둘러보기</div>
                                        <div className="search_line">
                                            <Category init={init} post={post} setPost={setPost} />
                                            <Select post={post} setPost={setPost} />
                                            <Search inputHandler={inputHandler} />
                                        </div>
                                        <div className="post_list">
                                            {post?.filter((el) => {
                                                return el?.title?.indexOf(input) > -1;
                                            })?.length !== 0 ? (
                                                post
                                                    ?.filter((el) => {
                                                        return el.title.indexOf(input) > -1;
                                                    })
                                                    .map((list) => {
                                                        return (
                                                            <div className="post_item" key={list.id}>
                                                                <div className="post_item_inner">
                                                                    <div className="best_item_header">
                                                                        <Link href={`/post/${list?.id}`}>
                                                                            <div className="header_image">
                                                                                <div className="img_inner">
                                                                                    <Image
                                                                                        layout="fill"
                                                                                        alt={list?.title}
                                                                                        src={list?.post_page[0]?.img}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                        <div className="post_desc">
                                                                            <div className="post_desc_title">
                                                                                <Link href={`/post/${list?.id}`}>
                                                                                    <div className="post_title_font">
                                                                                        {list?.title}
                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="post_desc_text">
                                                                                <Link href={`/post/${list?.id}`}>
                                                                                    <div className="post_text">
                                                                                        <div>
                                                                                            {
                                                                                                list?.post_page[0]
                                                                                                    ?.content
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="post_desc_category">
                                                                                <a className="post_category">
                                                                                    {list?.category}
                                                                                </a>
                                                                            </div>
                                                                            <div className="post_desc_user">
                                                                                <div className="post_desc_userinfo">
                                                                                    <div className="post_author">
                                                                                        💛 {list?.like?.length}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                            ) : (
                                                <>
                                                    <div className="result">
                                                        검색 결과가 없습니다.
                                                        <div className="result_img">
                                                            <Image
                                                                src="https://cdn.discordapp.com/attachments/884717967307321407/892412101031776266/da13e0ed049893a8.png"
                                                                alt="sign in picture"
                                                                layout="fill"
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a className="top-btn" onClick={() => window.scrollTo(0, 0)}>
                <Image
                    src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png"
                    alt="top-button"
                    layout="fill"
                    unoptimized="true"
                />
            </a>
        </>
    );
}

export async function getServerSideProps() {
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post`;
    const res = await axios.get(apiUrl);
    const best = res.data.data.sort(function (a, b) {
        let likeA = a.like.length;
        let likeB = b.like.length;
        if (likeA < likeB) return 1;
        if (likeA > likeB) return -1;
        return 0;
    });
    const post = res.data.data;
    const url = 'https://api.openweathermap.org/data/2.5/';
    const weatherUrl = `${url}weather?q=seoul&appid=${process.env.WEATHER_KEY}`;
    const data = await axios.get(weatherUrl);
    return {
        props: {
            bestList: best,
            postList: post,
            weatherData: data.data,
        },
    };
}
