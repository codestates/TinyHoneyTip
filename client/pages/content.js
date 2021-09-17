import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import pic from '../public/honeycomb.png';
import Best from '../src/components/Best';
import Thumbnail from '../src/components/Thumbnail';
import Category from '../src/components/Category';

export default function Content() {
    return (
        <>
            <Head>
                <title>Content Page | Tiny Honey Tip</title>
            </Head>

            <div>
                <div className="content">
                    <div className="best_content_container">
                        <nav className="nav_area"></nav>
                        <Best />
                        <Thumbnail />
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
