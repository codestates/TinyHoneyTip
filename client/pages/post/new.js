import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';

import UploadPostContent from '../../src/post/PostContent';
import ToolBar from '../../src/post/ToolBar';

export default function PostUpload({ userInfo }) {
    useEffect(() => {
        if (!userInfo.isLogin) {
            Router.push('/content');
        }
    });

    const [slide, setSlide] = useState([{ img: '', imgFile: '', content: '' }]);

    const [cannotSubmitMessage, setCannotSubmitMessage] = useState(false);

    const [postInfo, setPostInfo] = useState({
        title: '',
        category: '카테고리',
    });

    const [currentSlide, setCurrentSlide] = useState(1);

    // console.log(`currentSlide : ${currentSlide}`);
    // console.log(`slide : ${slide}`);

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
        setSlide(editedSlide);
        document.getElementById(`pos${currentSlide - 1}`).checked = true;
        setCurrentSlide(currentSlide - 1);
    };

    const addSlideHandler = async () => {
        let newPage = { img: '', imgFile: '', content: '' };
        await setSlide(slide.concat(newPage));
        document.getElementById(`pos${slide.length + 1}`).checked = true;
        setCurrentSlide(slide.length + 1);
    };

    const setFormData = (formData, data, parentKey) => {
        if (!(formData instanceof FormData)) return;
        if (!(data instanceof Object)) return;

        Object.keys(data).forEach((key) => {
            const val = data[key];
            if (parentKey) key = `${parentKey}[${key}]`;
            if (val instanceof Object && !Array.isArray(val)) {
                return setFormData(formData, val, key);
            }
            if (Array.isArray(val)) {
                val.forEach((v, idx) => {
                    if (v instanceof Object) {
                        setFormData(formData, v, `${key}[${idx}]`);
                    } else {
                        formData.append(`${key}[${idx}]`, v);
                    }
                });
            } else {
                formData.append(key, val);
            }
        });
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

        const data = {
            post_page: postPage,
            category: category,
            title: title,
        };

        const formData = new FormData();

        setFormData(formData, data);

        // console.log(formData);

        // const arrQueryString = [];
        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]} = ${pair[1]}`);
        //     arrQueryString.push(`${pair[0]} = ${pair[1]}`);
        // }
        // console.log(`query string= ${arrQueryString.join('&')}`);
        axios
            .post(apiUrl, formData, {
                headers: {
                    Cookie: `accessToken=${userInfo.accessToken}`,
                    'content-type': 'multipart/form-data',
                    // 'Accept-Encoding': 'gzip, deflate, br',
                    Connection: 'keep-alive',
                },
                withCredentials: true,
            })
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
