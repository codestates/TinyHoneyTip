import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function PostContent() {
    //  slide와 feeling은 서버에서 받아온 내용으로 초기화
    const [slide, setSlide] = useState([
        { img: '', content: '1st slide' },
        { img: '', content: '2st slide' },
        { img: '', content: '3st slide' },
        { img: '', content: '4st slide' },
    ]);

    const [feeling, setFeeling] = useState({
        like: true,
        dislike: false,
        scrap: false,
    });

    const feelingHandler = (key) => {
        // 비회원일 경우 block
        setFeeling({
            ...feeling,
            [key]: !feeling[key],
        });
        // feeling에 따라 서버에 요청
        // feeling이 true였으면 delete, false였으면 post
    };

    const deletePost = () => {
        // 서버에 삭제 요청
    };

    const [currentSlide, setCurrentSlide] = useState(1);

    return (
        <div className="single-post__post-area">
            <h1 className="single-post__title">게시물 제목</h1>
            <div className="single-post__post">
                {slide.map((el, idx) => {
                    return (
                        <input
                            type="radio"
                            name="pos"
                            id={'pos' + (idx + 1)}
                            onClick={() => setCurrentSlide(idx + 1)}
                        />
                    );
                })}
                <ul style={{ width: `calc(100% * ${slide.length})` }}>
                    {slide.map((el, idx) => {
                        return (
                            <li style={{ width: `calc(100% / ${slide.length})` }}>
                                <img className="single-post__post__pic" src={el.img} />
                                <pre className="single-post__post__text">{el.content}</pre>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <p class="bullet">
                <label for={currentSlide === 1 ? 'pos1' : 'pos' + (currentSlide - 1)}>
                    <img
                        className="single-post__post__previous-page-btn"
                        src="https://img.icons8.com/material-outlined/24/000000/back--v1.png"
                    />
                </label>
                <label for={currentSlide === slide.length ? 'pos' + slide.length : 'pos' + (currentSlide + 1)}>
                    <img
                        className="single-post__post__next-page-btn"
                        src="https://img.icons8.com/material-outlined/24/000000/back--v1.png"
                    />
                </label>
            </p>
            <div className="single-post__btns">
                <div className="single-post__btns__feeling">
                    <img
                        className="single-post__btn__img"
                        onClick={() => feelingHandler('like')}
                        src={
                            feeling.like
                                ? 'https://img.icons8.com/material-rounded/24/000000/like--v1.png'
                                : 'https://img.icons8.com/material-outlined/24/000000/like--v1.png'
                        }
                    />
                    <img
                        className="single-post__btn__img"
                        onClick={() => feelingHandler('dislike')}
                        src={
                            feeling.dislike
                                ? 'https://img.icons8.com/material-rounded/24/000000/dislike.png'
                                : 'https://img.icons8.com/material-outlined/24/000000/dislike.png'
                        }
                    />
                    <img
                        className="single-post__btn__img"
                        onClick={() => feelingHandler('scrap')}
                        src={
                            feeling.scrap
                                ? 'https://img.icons8.com/material-rounded/24/000000/bookmark-ribbon.png'
                                : 'https://img.icons8.com/material-outlined/24/000000/bookmark-ribbon--v1.png'
                        }
                    />
                </div>
                <p className="single-post__page">
                    {currentSlide}/{slide.length}
                </p>
                <div className="single-post__btns__post">
                    {/*  본인 글일 경우만 보이도록 세팅, edit은 post수정페이지로 연결, delete는 서버에 삭제 요청 */}
                    <Link href="">
                        <img
                            className="single-post__edit"
                            src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"
                        />
                    </Link>
                    <img
                        className="single-post__delete"
                        onClick={deletePost}
                        src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png"
                    />
                </div>
            </div>
        </div>
    );
}
