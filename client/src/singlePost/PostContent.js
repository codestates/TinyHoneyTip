import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function PostContent({ post }) {
    const { title, category, post_page, like, dislike, scrap } = post;
    // const { didIL, userLike } = like;

    // like dislike scrap 수정필요.. 빈 객체로 오면 저장시 에러가뜨는듯;;
    const [feeling, setFeeling] = useState({
        like: false,
        dislike: false,
        scrap: false,
    });
    // console.log(post_page);
    console.log(like);
    // console.log(didIL);
    // console.log(like.didIL);
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
            <h1 className="single-post__title">
                <span>{'[' + category + ']'}</span>
                {title}
            </h1>
            <div className="single-post__post">
                {post_page &&
                    post_page.map((el, idx) => {
                        return (
                            <input
                                key={idx}
                                type="radio"
                                name="pos"
                                id={'pos' + (idx + 1)}
                                onClick={() => setCurrentSlide(idx + 1)}
                            />
                        );
                    })}
                <ul style={{ width: `calc(100% * ${post_page ? post_page.length : 1})` }}>
                    {post_page &&
                        post_page.map((el, idx) => {
                            return (
                                <li key={idx} style={{ width: `calc(100% / ${post_page ? post_page.length : 1})` }}>
                                    {el.img ? (
                                        <img className="single-post__post__pic" src={el.img} />
                                    ) : (
                                        <div className="single-post__post__pic"></div>
                                    )}

                                    <pre className="single-post__post__text">{el.content}</pre>
                                </li>
                            );
                        })}
                </ul>
            </div>
            <p className="bullet">
                <label htmlFor={post_page && currentSlide === 1 ? 'pos1' : 'pos' + (currentSlide - 1)}>
                    <img
                        className="single-post__post__previous-page-btn"
                        src="https://img.icons8.com/material-outlined/24/000000/back--v1.png"
                    />
                </label>
                <label
                    htmlFor={
                        post_page && currentSlide === post_page.length
                            ? 'pos' + post_page.length
                            : 'pos' + (currentSlide + 1)
                    }>
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
                        alt="like button"
                        src={
                            !!like
                                ? 'https://img.icons8.com/material-rounded/24/000000/like--v1.png'
                                : 'https://img.icons8.com/material-outlined/24/000000/like--v1.png'
                        }
                    />
                    <img
                        className="single-post__btn__img"
                        onClick={() => feelingHandler('dislike')}
                        alt="dislike button"
                        src={
                            feeling.dislike
                                ? 'https://img.icons8.com/material-rounded/24/000000/dislike.png'
                                : 'https://img.icons8.com/material-outlined/24/000000/dislike.png'
                        }
                    />
                    <img
                        className="single-post__btn__img"
                        onClick={() => feelingHandler('scrap')}
                        alt="scrap button"
                        src={
                            feeling.scrap
                                ? 'https://img.icons8.com/material-rounded/24/000000/bookmark-ribbon.png'
                                : 'https://img.icons8.com/material-outlined/24/000000/bookmark-ribbon--v1.png'
                        }
                    />
                </div>
                <p className="single-post__page">{post_page ? `${currentSlide}/${post_page.length}` : ''}</p>
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
