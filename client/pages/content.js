import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Category from '../src/components/Category';
import Image from 'next/image';
import pic from '../public/honeycomb.png';
import Best from '../src/components/Best';
import Thumbnail from '../src/components/Thumbnail';

export default function Content() {
    const [postList, setPostList] = useState([]); // []
    const [initData, setInitData] = useState([]);
    // const [items, setItems] = useState(10);
    // const [preItems, setPreItems] = useState(0);
    const [isClick, setClick] = useState(false);

    const categoryHandler = (e) => {
        if (e.target.innerText === '전체') {
            setPostList(initData);
            return;
        } else {
            const filteredData = initData.filter((el) => {
                return el.category === e.target.innerText;
            });
            setPostList(filteredData);
        }
    };

    const clickHandler = () => {
        setClick(!isClick);
    };

    const getPostsData = () => {
        axios.get(process.env.NEXT_PUBLIC_URL + '/post').then((res) => {
            // const result = res.data.post.slice(preItems, items);
            setPostList(res.data.data);
            setInitData(res.data.data);
        });
    };

    useEffect(() => {
        getPostsData();
    }, []);

    return (
        <>
            <Head>
                <title>Content Page | Tiny Honey Tip</title>
            </Head>

            <div>
                <div className="content">
                    <div className="best_content_container">
                        <Category isClick={isClick} clickHandler={clickHandler} categoryHandler={categoryHandler} />
                        <Best />
                        <Thumbnail postList={postList} setPostList={setPostList} />
                    </div>
                </div>
            </div>
            <a className="top-btn" onClick={() => window.scrollTo(0, 0)}>
                <Image
                    loader={() => 'https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png'}
                    src={pic}
                    alt="top-button"
                    width="7vw"
                    height="5vw"
                    unoptimized="true"
                />
            </a>
        </>
    );
}
