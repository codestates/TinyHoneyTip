import React, { useState } from 'react';
import axios from 'axios';

import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import UploadPostContent from '../../src/post/PostContent';
import ToolBar from '../../src/post/ToolBar';

export default function PostUpload() {
    const [slide, setSlide] = useState([{ img: '', content: '1st slide' }]);

    const slideTextHandler = (index, key) => (e) => {
        let editedContent = slide.map((el, idx) => {
            if (idx === index) {
                return { ...el, [key]: e.target.value };
            } else {
                return el;
            }
        });
        console.log(editedContent);
        setSlide(editedContent);
    };

    const deleteSlideHandler = (index) => (e) => {
        let editedSlide = slide.filter((el, idx) => idx !== index);
        setSlide(editedSlide);
    };

    const addSlideHandler = () => {
        let newPage = { img: '', content: slide.length + 1 + 'st slide' };
        setSlide(slide.concat(newPage));
    };

    return (
        <div className="post-upload-page">
            <Header />
            <div className="post-upload-empty"></div>
            <div className="post-upload-container">
                <UploadPostContent slide={slide} />
                <ToolBar
                    slide={slide}
                    addSlideHandler={addSlideHandler}
                    deleteSlideHandler={deleteSlideHandler}
                    slideTextHandler={slideTextHandler}
                />
            </div>
            <Footer />
        </div>
    );
}
