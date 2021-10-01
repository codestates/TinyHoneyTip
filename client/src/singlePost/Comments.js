import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import SingleComment from './SingleComment';

export default function Comments({ userInfo, post }) {
    const router = useRouter();
    const { id } = router.query;
    const [commentInput, setCommentInput] = useState('');
    const [commentList, setCommentList] = useState(post.comment);

    const handleInput = (e) => {
        setCommentInput(e.target.value);
    };

    const commentSubmit = () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post/comment/${id}`;
        if (userInfo.isLogin && commentInput.length > 0) {
            const axiosConfig = {
                headers: {
                    'content-Type': 'application/json',
                    Accept: '/',
                    'Cache-Control': 'no-cache',
                    Cookie: `accessToken=${userInfo.accessToken}`,
                },
                credentials: 'same=origin',
            };
            axios.defaults.withCredentials = true;
            axios
                .post(
                    apiUrl,
                    {
                        comment: commentInput,
                    },
                    {
                        headers: {
                            Cookie: `accessToken=${userInfo.accessToken}`,
                        },
                        withCredentials: true,
                    },
                )
                .then((res) => {
                    setCommentList([
                        ...commentList,
                        { userName: userInfo.username, user_id: userInfo.id, txt: commentInput },
                    ]);
                    let commentForm = document.getElementById('commentInput');
                    commentForm.value = '';
                    setCommentInput('');
                    document.getElementById('single-post__comments').scrollTo({
                        top: 9999999999999999,
                        behavior: 'smooth',
                    });
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
            <div className="single-post__comments" id="single-post__comments">
                {commentList.map((el, idx) => {
                    return (
                        <SingleComment
                            key={idx}
                            comment={el}
                            userInfo={userInfo}
                            commentList={commentList}
                            setCommentList={setCommentList}
                        />
                    );
                })}
            </div>
            <div className="single-post__comment-input">
                <input
                    className="single-post__comment-input__input"
                    id="commentInput"
                    type="text"
                    onChange={handleInput}
                    placeholder={userInfo?.isLogin ? '댓글을 입력해주세요.' : '로그인해 주세요.'}
                    disabled={userInfo?.isLogin ? '' : 'disabled'}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            commentSubmit();
                        }
                    }}
                    maxLength="120"
                />
                <button
                    className="single-post__comment-input__submit"
                    onClick={commentSubmit}
                    disabled={userInfo?.isLogin ? '' : 'disabled'}>
                    등록
                </button>
            </div>
        </div>
    );
}
