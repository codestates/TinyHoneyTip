import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Head from 'next/head';

import UploadPostContent from '../../src/post/PostContent';
import ToolBar from '../../src/post/ToolBar';
import ImageEditModal from '../../src/post/ImageEditModal';

export default function PostUpload({ userInfo }) {
    const [croppedImage, setCroppedImage] = useState(undefined);
    const [slide, setSlide] = useState([{ img: '', imgFile: '/postDefaultImage.jpg', content: '' }]);

    const [cannotSubmitMessage, setCannotSubmitMessage] = useState(false);

    const [postInfo, setPostInfo] = useState({
        title: '',
        category: '카테고리',
    });

    const [currentSlide, setCurrentSlide] = useState(1);

    const [modalOpened, setModalOpened] = useState(false);

    const modalHandler = () => {
        setModalOpened(!modalOpened);
    };

    const slideTextHandler = (index, key, imgFile) => (e) => {
        setCannotSubmitMessage(false);
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
            let editedContent = slide.map((el, idx) => {
                if (idx === index) {
                    return { ...el, img: '', imgFile: { imgFile } };
                } else {
                    return el;
                }
            });
            setSlide(editedContent);
        } else if (key === 'deleteImage') {
            let editedContent = slide.map((el, idx) => {
                if (idx === index) {
                    return { ...el, img: '', imgFile: '/postDefaultImage.jpg' };
                } else {
                    return el;
                }
            });
            setSlide(editedContent);
        }
    };

    const postInfoHandler = (key) => (e) => {
        setCannotSubmitMessage(false);
        setPostInfo({ ...postInfo, [key]: e.target.value });
    };

    const deleteSlideHandler = (index) => (e) => {
        let editedSlide = slide.filter((el, idx) => idx !== index);
        setSlide(editedSlide);
        document.getElementById(`pos${currentSlide - 1}`).checked = true;
        setCurrentSlide(currentSlide - 1);
    };

    const addSlideHandler = async () => {
        let newPage = { img: '', imgFile: '/postDefaultImage.jpg', content: '' };
        await setSlide(slide.concat(newPage));
        document.getElementById(`pos${slide.length + 1}`).checked = true;
        setCurrentSlide(slide.length + 1);
    };

    const postUploadHandler = () => {
        if (postInfo.title.length === 0 || postInfo.category === '카테고리' || !userInfo.isLogin) {
            setCannotSubmitMessage(true);
            return;
        }
        const postPage = slide.map((el, idx) => {
            return { id: idx + 1, img: el.imgFile, content: el.content };
        });
        const category = postInfo.category;
        const title = postInfo.title;
        const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post`;

        const data = {
            post_page: postPage,
            category: category,
            title: title,
        };

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('category', data.category);
        data.post_page.map((el, idx) => {
            formData.append(`post_page[${idx}]['id']`, data.post_page[idx].id);
            if (data.post_page[idx].img.length === 0 || data.post_page[idx].img === '/postDefaultImage.jpg') {
                formData.append(`post_page[${idx}]['image']`, false);
                formData.append(`post_page_img`, undefined);
            } else {
                formData.append(`post_page[${idx}]['image']`, true);
                formData.append(`post_page_img`, data.post_page[idx].img);
            }
            formData.append(`post_page[${idx}]['content']`, data.post_page[idx].content);
            return el;
        });

        for (let key of formData.entries()) {
        }

        axios
            .post(apiUrl, formData, {
                headers: {
                    Cookie: `accessToken=${userInfo.accessToken}`,
                    'content-type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            .then((res) => {
                Router.push('/post/' + res.data.post_id);
            })
            .catch((error) => {});
    };

    return (
        <div className="post-upload-page">
            <Head>
                <title>New Post | Tiny Honey Tip</title>
            </Head>
            <UploadPostContent
                croppedImage={croppedImage}
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
                submitHandler={postUploadHandler}
                cannotSubmitMessage={cannotSubmitMessage}
                submitName="업로드"
                modalHandler={modalHandler}
            />
            {modalOpened ? (
                <ImageEditModal
                    croppedImage={croppedImage}
                    setCroppedImage={setCroppedImage}
                    currentSlide={currentSlide}
                    slide={slide}
                    setSlide={setSlide}
                    modalHandler={modalHandler}
                    slideTextHandler={slideTextHandler}
                />
            ) : (
                ''
            )}
        </div>
    );
}
