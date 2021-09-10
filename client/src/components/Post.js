import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import PostContent from '../src/singlePost/PostContent';
import Comments from '../src/singlePost/Comments';

export default function Post({ post }) {
    console.log(post);
    return (
        <div>
            <Header />
            <div className='single-post-container'>
                <div className='single-post-empty'></div>
                <div className='single-post'>
                    <PostContent />
                    <Comments />
                </div>
            </div>
            <Footer />
        </div>
    );
}
