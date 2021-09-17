import React, { useState } from 'react';
import axios from 'axios';

import SingleComment from './SingleComment';

export default function Comments({ post }) {
    const [commentInput, setCommentInput] = useState('');

    const { comment } = post;

    const handleInput = (e) => {
        // 비회원일 경우 block
        // placeholder 메세지 변경
        setCommentInput(e.target.value);
    };

    const commentSubmit = () => {
        // 비회원일 경우 block
        // commentInput.length>0일떄
        // 서버에 comment 입력 보내기
    };

    return (
        <div className="single-post__comment-area">
            <div className="single-post__profile">
                <img className="single-post__profile__img" src="" />
                <h1 className="single-post__profile__username">유저 이름</h1>
            </div>
            <div className="single-post__comments">
                {/* 데이터 받아서 map */}
                {comment &&
                    comment.map((el, idx) => {
                        return <SingleComment key={idx} comment={el} />;
                    })}
            </div>
            <div className="single-post__comment-input">
                <input
                    className="single-post__comment-input__input"
                    type="text"
                    onChange={handleInput}
                    placeholder="댓글을 입력해주세요."
                />
                <button className="single-post__comment-input__submit" onClick={commentSubmit}>
                    등록
                </button>
            </div>
        </div>
    );
}
