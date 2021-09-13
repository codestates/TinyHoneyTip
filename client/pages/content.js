import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Search from '../src/components/Search';
import axios from 'axios';
import PostList from '../src/components/PostList';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

export default function Content() {
    const [postList, setPostList] = useState([]);

    const getPostsData = () => {
        axios.get('http://localhost:80/post').then((res) => {
            setPostList(res.data.post);
            console.log(res.data.post);
        });
    };
    // useEffect(() => {
    //     getPostsData();
    // }, []);
    return (
        <>
            <Head>
                <title>Content Page | Tiny Honey Tip</title>
            </Head>

            <div className="content">
                <Header />
                <div className="content_container">
                    <div className="best_container">
                        <h3 className="best_title">BEST 꿀팁</h3>
                        <div>
                            {/* 베스트 꿀팁 모음 */}
                            <PostList postList={postList.slice(0, 5)} />
                        </div>
                    </div>
                    <div className="postList_container">
                        {/* 나머지 포스트 리스트 */}
                        <PostList postList={postList.slice(5)} />
                        <Search postList={postList} />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
