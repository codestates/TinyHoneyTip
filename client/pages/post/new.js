import React, { useState } from 'react';
import axios from 'axios';

import UploadPostContent from '../../src/post/PostContent';
import ToolBar from '../../src/post/ToolBar';

export default function PostUpload() {
    const [slide, setSlide] = useState([{ img: '', imgFile: '', content: '' }]);

    const [postInfo, setPostInfo] = useState({
        title: '제목을 입력해주세요.',
        category: '카테고리',
    });

    const [currentSlide, setCurrentSlide] = useState(1);

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
        setCurrentSlide(1);
        setSlide(editedSlide);
    };

    const addSlideHandler = () => {
        let newPage = { img: '', imgFile: '', content: '' };
        setSlide(slide.concat(newPage));
    };

    const postUploadHandler = () => {
        // 제목과 카테고리 필수 입력
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
                submitName="업로드"
            />
        </div>
    );
}
