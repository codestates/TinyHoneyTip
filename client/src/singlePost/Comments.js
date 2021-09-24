import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import SingleComment from './SingleComment';

export default function Comments({ userInfo, post }) {
    const router = useRouter();
    const { id } = router.query;
    const [commentInput, setCommentInput] = useState('');
    console.log(userInfo.accessToken);
    console.log(post);

    const handleInput = (e) => {
        setCommentInput(e.target.value);
    };

    const commentSubmit = () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post/comment/${id}`;
        if (userInfo.isLogin && commentInput.length > 0) {
            axios
                .post(
                    apiUrl,
                    {
                        comment: commentInput,
                    },
                    {
                        headers: {
                            Cookie: `accessToken=${userInfo.accessToken}`,
                            'Accept-Encoding': 'gzip, deflate, br',
                            Connection: 'keep-alive',
                        },
                        withCredentials: true,
                    },
                )
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="single-post__comment-area">
            <div className="single-post__profile">
                <img className="single-post__profile__img" src={post.writerInfo.profile_img} />
                <h1 className="single-post__profile__username">{post.writerInfo.username}</h1>
            </div>
            <div className="single-post__comments">
                {post.comment.map((el, idx) => {
                    return <SingleComment key={idx} comment={el} userInfo={userInfo} />;
                })}
            </div>
            <div className="single-post__comment-input">
                <input
                    className="single-post__comment-input__input"
                    type="text"
                    onChange={handleInput}
                    placeholder={userInfo.isLogin ? '댓글을 입력해주세요.' : '로그인해 주세요.'}
                    disabled={userInfo.isLogin ? '' : 'disabled'}
                />
                <button
                    className="single-post__comment-input__submit"
                    onClick={commentSubmit}
                    disabled={userInfo.isLogin ? '' : 'disabled'}>
                    등록
                </button>
            </div>
        </div>
    );
}
