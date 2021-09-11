import React, { useState } from "react"
import axios from "axios"

import SingleComment from "./SingleComment"

export default function Comments() {
    const [commentInput, setCommentInput] = useState('');

    const handleInput = (e) => {
        setCommentInput(e.target.value)
    }

    const commentSubmit = () => {
        // 서버에 comment 입력 보내기
    }


    return (
        <div className='single-post__comment-area'>
            <div className='single-post__profile'>
                <img className='single-post__profile__img' src='' />
                <h1 className='single-post__profile__username'>
                    유저 이름
                </h1>
            </div>
            <div className='single-post__comments'>
                {/* 데이터 받아서 map */}
                <SingleComment />
                <SingleComment />
                <SingleComment />
                <SingleComment />
                <SingleComment />
                <SingleComment />
                <SingleComment />
                <SingleComment />
                <SingleComment />
            </div>
            <div className='single-post__comment-input'>
                <input
                    className='single-post__comment-input__input'
                    type='text'
                    onChange={handleInput}
                    placeholder='댓글을 입력해주세요.'
                />
                <button
                    className='single-post__comment-input__submit'
                    onClick={commentSubmit}
                >
                    등록
                </button>
            </div>
        </div>
    )
}