import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import PostContent from '../singlePost/PostContent';
import Comments from '../singlePost/Comments';

export default function Post({ userInfo, post }) {
    return (
        <div className="single-post">
            <PostContent userInfo={userInfo} post={post} />
            <Comments userInfo={userInfo} post={post} />
        </div>
    );
}
