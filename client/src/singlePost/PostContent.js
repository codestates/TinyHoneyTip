import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PostContent({ userInfo, post }) {
    // scrap은 아직이유 ㅎ;
    const router = useRouter();
    const { id } = router.query;

    const [currentSlide, setCurrentSlide] = useState(1);

    const didIL = () => {
        if (userInfo.isLogin) {
            let myLike = post.like.userLike.filter((el) => {
                return el.user_id === userInfo.id;
            });
            if (myLike.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const didIDisL = () => {
        if (userInfo.isLogin) {
            let myDisLike = post.dislike.userDisLike.filter((el) => {
                return el.user_id === userInfo.id;
            });
            if (myDisLike.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const [feeling, setFeeling] = useState({
        like: didIL(),
        dislike: didIDisL(),
        scrap: false,
    });
    console.log(feeling);
    const deleteFeelingHandler = (key) => {
        axios
            .delete(`${process.env.NEXT_PUBLIC_URL}/post/${key}/${post?.id}`, {
                headers: {
                    cookie: userInfo.accessToken,
                },
                withCredentials: true,
            })
            .then((res) => {
                console.log('delete 성공');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const postFeelingHandler = (key) => {
        axios
            .get(`${process.env.NEXT_PUBLIC_URL}/post/${key}/${post?.id}`, {
                headers: {
                    cookie: userInfo.accessToken,
                },
                withCredentials: true,
            })
            .then((res) => {
                console.log('add 성공');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const feelingHandler = (key) => {
        if (!!userInfo.isLogin) {
            if (key === 'scrap') {
                console.log('scrap 미구현');
            } else if (!!feeling[key]) {
                deleteFeelingHandler('like');
            } else {
                postFeelingHandler('like');
            }
            setFeeling({ ...feeling, [key]: !feeling[key] });
        } else {
            // 비회원
        }
    };

    const deletePost = () => {
        // 서버에 삭제 요청
    };

    return (
        <div className="single-post__post-area">
            <h1 className="single-post__title">
                <span>{'[' + post.category + ']'}</span>
                {post.title}
            </h1>
            <div className="single-post__post">
                {post.post_page.map((el, idx) => {
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
                <ul style={{ width: `calc(100% * ${post.post_page.length})` }}>
                    {post.post_page.map((el, idx) => {
                        return (
                            <li key={idx} style={{ width: `calc(100% / ${post.post_page.length})` }}>
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
                <label htmlFor={currentSlide === 1 ? 'pos1' : 'pos' + (currentSlide - 1)}>
                    <img
                        className="single-post__post__previous-page-btn"
                        src="https://img.icons8.com/material-outlined/24/000000/back--v1.png"
                    />
                </label>
                <label
                    htmlFor={
                        currentSlide === post.post_page.length
                            ? 'pos' + post.post_page.length
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
                            feeling.like
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
                            false
                                ? 'https://img.icons8.com/material-rounded/24/000000/bookmark-ribbon.png'
                                : 'https://img.icons8.com/material-outlined/24/000000/bookmark-ribbon--v1.png'
                        }
                    />
                </div>
                <p className="single-post__page">{`${currentSlide}/${post.post_page.length}`}</p>
                {post.writerInfo.id === userInfo.id ? (
                    <div className="single-post__btns__post">
                        {/*  편집 페이지 생성 후 추가 */}
                        <Link href={`/post/edit/${id}`} passHref>
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
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
