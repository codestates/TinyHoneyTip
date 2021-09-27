import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

import UploadPostContent from '../../src/post/PostContent';
import ToolBar from '../../src/post/ToolBar';

export default function PostUpload({ userInfo }) {
    const [slide, setSlide] = useState([{ img: '', imgFile: '', content: '' }]);

    const [cannotSubmitMessage, setCannotSubmitMessage] = useState(false);

    const [postInfo, setPostInfo] = useState({
        title: '',
        category: '카테고리',
    });

    console.log(slide);
    console.log(postInfo);
    console.log(userInfo);
    console.log(cannotSubmitMessage);

    const [currentSlide, setCurrentSlide] = useState(1);

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
        setCannotSubmitMessage(false);
        setPostInfo({ ...postInfo, [key]: e.target.value });
    };

    const deleteSlideHandler = (index) => (e) => {
        let editedSlide = slide.filter((el, idx) => idx !== index);
        setCurrentSlide(1);
        setSlide(editedSlide);
    };

    const addSlideHandler = () => {
        let newPage = { img: '', imgFile: '', content: '' };
        setSlide(slide.concat(newPage));
    };

    const postUploadHandler = () => {
        if (postInfo.title.length === 0 || postInfo.category === '카테고리') {
            setCannotSubmitMessage(true);
            return;
        }
        const postPage = slide.map((el, idx) => {
            return { id: idx + 1, img: el.imgFile, content: el.content };
        });
        const category = postInfo.category;
        const title = postInfo.title;
        const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post`;

        axios
            .post(
                apiUrl,
                {
                    post_page: postPage,
                    category: category,
                    title: title,
                },
                {
                    headers: {
                        Cookie: `accessToken=${userInfo.accessToken}`,
                        // 'Accept-Encoding': 'gzip, deflate, br',
                        Connection: 'keep-alive',
                    },
                    withCredentials: true,
                },
            )
            .then((res) => {
                Router.push('/content');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="post-upload-page">
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
                submitHandler={postUploadHandler}
                cannotSubmitMessage={cannotSubmitMessage}
                submitName="업로드"
            />
        </div>
    );
}
