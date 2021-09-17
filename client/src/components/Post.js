import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Header from './Header';
import Footer from './Footer';
import PostContent from '../singlePost/PostContent';
import Comments from '../singlePost/Comments';

export default function Post({ post }) {
    return (
        <div>
            <Header />
            <div className="single-post-container">
                <div className="single-post-empty"></div>
                <div className="single-post">
                    <PostContent post={post} />
                    <Comments post={post} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
