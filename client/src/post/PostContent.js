import React, { useState } from 'react';

export default function UploadPostContent({ slide }) {
    const [currentSlide, setCurrentSlide] = useState(1);

    return (
        <div className="upload-post__post-area">
            <h1 className="upload-post__title">게시물 제목</h1>
            <div className="upload-post__post">
                {slide.map((el, idx) => {
                    return (
                        <input
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
                            <li style={{ width: `calc(100% / ${slide.length})` }}>
                                <img className="upload-post__post__pic" src={el.img} />
                                <p className="upload-post__post__text">{el.content}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <p class="bullet">
                <label for={currentSlide === 1 ? 'pos1' : 'pos' + (currentSlide - 1)}>
                    <img
                        className="upload-post__post__previous-page-btn"
                        src="https://img.icons8.com/material-outlined/24/000000/back--v1.png"
                    />
                </label>
                <label for={currentSlide === slide.length ? 'pos' + slide.length : 'pos' + (currentSlide + 1)}>
                    <img
                        className="upload-post__post__next-page-btn"
                        src="https://img.icons8.com/material-outlined/24/000000/back--v1.png"
                    />
                </label>
            </p>
        </div>
    );
}
