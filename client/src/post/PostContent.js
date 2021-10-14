import React, { useState } from 'react';
import Image from 'next/image';

export default function UploadPostContent({ slide, postInfo, currentSlide, setCurrentSlide }) {
    return (
        <div className="upload-post__post-area">
            <h1 className="upload-post__title">
                <span>[{postInfo.category.length === 0 ? '카테고리' : postInfo.category}]</span>
                {postInfo.title.length === 0 ? '제목을 입력해주세요.' : postInfo.title}
            </h1>

            <div className="upload-post__post">
                {slide.map((el, idx) => {
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
                <ul style={{ width: `calc(100% * ${slide.length})` }}>
                    {slide.map((el, idx) => {
                        return (
                            <li key={idx} style={{ width: `calc(100% / ${slide.length})` }}>
                                <img
                                    className="upload-post__post__pic"
                                    src={
                                        el.imgFile
                                            ? typeof el.imgFile === 'object'
                                                ? URL.createObjectURL(el.imgFile)
                                                : el.imgFile
                                            : '/postDefaultImage.jpg'
                                    }
                                />
                                <pre className="upload-post__post__text">
                                    <div className="upload-post__post__text__back">{el.content}</div>
                                </pre>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <p className="bullet">
                <label htmlFor={currentSlide === 1 ? 'pos1' : 'pos' + (currentSlide - 1)}>
                    <img
                        className="upload-post__post__previous-page-btn"
                        src="https://img.icons8.com/material-outlined/24/000000/back--v1.png"
                    />
                </label>
                <label htmlFor={currentSlide === slide.length ? 'pos' + slide.length : 'pos' + (currentSlide + 1)}>
                    <img
                        className="upload-post__post__next-page-btn"
                        src="https://img.icons8.com/material-outlined/24/000000/back--v1.png"
                    />
                </label>
            </p>
            <div>
                {currentSlide}/{slide.length}
            </div>
        </div>
    );
}
