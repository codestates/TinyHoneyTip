import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

import UploadPostContent from '../../../src/post/PostContent';
import ToolBar from '../../../src/post/ToolBar';

export default function Id({ post, userInfo }) {
    // 작성자가 아닌경우 content페이지로 보낼것(isNotWriter 함수)

    // 로그인할 때 로컬 스토리지에 저장하고 아래 getServerSideProps에서 불러보기(혹은 session)
    // https://stackoverflow.com/questions/62474098/get-localstorage-in-nextjs-getinitialprops

    const [slide, setSlide] = useState(post.post_page);

    const [currentSlide, setCurrentSlide] = useState(1);

    const [postInfo, setPostInfo] = useState({
        title: post.title,
        category: post.category,
    });

    const isNotWriter = () => {
        if (userInfo.id !== post.writerInfo.id) {
            Router.push(`/content`);
        }
    };

    const slideTextHandler = (index, key) => (e) => {
        if (key === 'content') {
            let editedContent = slide.map((el, idx) => {
                if (idx === index) {
                    return { ...el, [key]: e.target.value };
                } else {
                    return el;
                }
            });
            setSlide(editedContent);
        } else if (key === 'image') {
            e.preventDefault();
            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                let editedContent = slide.map((el, idx) => {
                    if (idx === index) {
                        return { ...el, img: reader.result, imgFile: file };
                    } else {
                        return el;
                    }
                });
                setSlide(editedContent);
            };
            reader.readAsDataURL(file);
        } else if (key === 'deleteImage') {
            let editedContent = slide.map((el, idx) => {
                if (idx === index) {
                    return { ...el, img: '', imgFile: '' };
                } else {
                    return el;
                }
            });
            setSlide(editedContent);
        }
    };

    const postInfoHandler = (key) => (e) => {
        setPostInfo({ ...postInfo, [key]: e.target.value });
    };

    const deleteSlideHandler = (index) => (e) => {
        let editedSlide = slide.filter((el, idx) => idx !== index);
        // 페이지 삭제시 1페이지로 돌아가도록 했음
        // 이전 페이지로 설정할 경우 슬라이드가 맨앞으로감.. 해결할 수 있을것같긴한데..끙
        setCurrentSlide(1);
        setSlide(editedSlide);
    };

    const addSlideHandler = () => {
        let newPage = { img: '', imgFile: '', content: '' };
        setSlide(slide.concat(newPage));
    };

    const postEditSubmitHandler = () => {};

    return (
        <div className="post-upload-page">
            <div className="post-upload-empty"></div>
            <div className="post-upload-container">
                <UploadPostContent
                    slide={slide}
                    postInfo={postInfo}
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                />
                <ToolBar
                    slide={slide}
                    addSlideHandler={addSlideHandler}
                    deleteSlideHandler={deleteSlideHandler}
                    slideTextHandler={slideTextHandler}
                    postInfoHandler={postInfoHandler}
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                    postInfo={postInfo}
                />
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post/${id}`;
    const res = await axios.get(apiUrl);
    const data = await res.data.data.post;
    return {
        props: {
            post: data,
        },
    };
}
