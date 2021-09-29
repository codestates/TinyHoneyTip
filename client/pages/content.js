import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import pic from '../public/honeycomb.png';
import Best from '../src/components/Best';
import Thumbnail from '../src/components/Thumbnail';
import axios from 'axios';

export default function Content({ bestList, postList, initData }) {
    return (
        <>
            <Head>
                <title>Content Page | Tiny Honey Tip</title>
            </Head>
            <div>
                <div className="content">
                    <div className="best_content_container">
                        <nav className="nav_area"></nav>
                        <Best bestList={bestList} />
                        <Thumbnail postList={postList} />
                    </div>
                </div>
            </div>

            <a className="top-btn" onClick={() => window.scrollTo(0, 0)}>
                <Image src={pic} alt="top-button" width="7vw" height="5vw" unoptimized="true" />
            </a>
        </>
    );
}

export async function getServerSideProps(context) {
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
    return {
        props: {
            bestList: best,
            postList: post,
        },
    };
}
