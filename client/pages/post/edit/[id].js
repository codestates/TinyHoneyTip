import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import Head from 'next/head';
import { useRouter } from 'next/router';

import UploadPostContent from '../../../src/post/PostContent';
import ToolBar from '../../../src/post/ToolBar';
import ImageEditModal from '../../../src/post/ImageEditModal';

export default function Id({ post, userInfo }) {
    // useEffect(() => {
    //     if (!JSON.parse(sessionStorage.getItem('userInfo')).isLogin) {
    //         Router.push('/content');
    //     } else if (JSON.parse(sessionStorage.getItem('userInfo')).id !== post.writerInfo.id) {
    //         Router.push(`/content`);
    //     }
    // });
    console.log(post);
    const router = useRouter();
    const { id } = router.query;
    const [croppedImage, setCroppedImage] = useState(undefined);

    const [slide, setSlide] = useState(
        post?.posts.map((el) => {
            return { imgFile: el.img, content: el.content };
        }),
    );

    const [cannotSubmitMessage, setCannotSubmitMessage] = useState(false);

    const [postInfo, setPostInfo] = useState({
        title: post.title,
        category: post.category,
    });

    const [currentSlide, setCurrentSlide] = useState(1);

    const [modalOpened, setModalOpened] = useState(false);

    const modalHandler = () => {
        setModalOpened(!modalOpened);
    };

    const slideTextHandler = (index, key) => (e) => {
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
                    return { ...el, imgFile: e.target.files[0] };
                } else {
                    return el;
                }
            });
            setSlide(editedContent);
        } else if (key === 'deleteImage') {
            let editedContent = slide.map((el, idx) => {
                if (idx === index) {
                    return { ...el, imgFile: '/postDefaultImage.jpg' };
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
        let newPage = { imgFile: '/postDefaultImage.jpg', content: '' };
        await setSlide(slide.concat(newPage));
        document.getElementById(`pos${slide.length + 1}`).checked = true;
        setCurrentSlide(slide.length + 1);
    };

    const postEditSubmitHandler = () => {
        if (postInfo.title.length === 0 || postInfo.category === '카테고리') {
            setCannotSubmitMessage(true);
            return;
        }
        const postPage = slide.map((el, idx) => {
            return { id: idx + 1, img: el.imgFile, content: el.content };
        });
        const category = postInfo.category;
        const title = postInfo.title;
        const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post/${id}`;

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
            } else if (typeof data.post_page[idx].img === 'string') {
                formData.append(`post_page[${idx}]['image']`, false);
                formData.append(`post_page_img`, data.post_page[idx].img);
            } else {
                formData.append(`post_page[${idx}]['image']`, true);
                formData.append(`post_page_img`, data.post_page[idx].img);
            }
            formData.append(`post_page[${idx}]['content']`, data.post_page[idx].content);
            return el;
        });

        for (let key of formData.entries()) {
            console.log(`${key}`);
        }

        axios
            .patch(apiUrl, formData, {
                headers: {
                    Cookie: `accessToken=${userInfo.accessToken}`,
                    'content-type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            .then((res) => {
                Router.push('/post/' + id);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="post-upload-page">
            <Head>
                <title>Edit Post | Tiny Honey Tip</title>
            </Head>
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
                submitHandler={postEditSubmitHandler}
                cannotSubmitMessage={cannotSubmitMessage}
                submitName="수정하기"
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

export async function getServerSideProps(context) {
    const id = context.params.id;
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post/${id}`;
    const res = await axios.get(apiUrl);
    const data = await res.data.postDetail;
    return {
        props: {
            post: data,
        },
    };
}
