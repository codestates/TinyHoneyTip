import React, { useState } from 'react';

export default function ToolBar({
    slide,
    addSlideHandler,
    deleteSlideHandler,
    slideTextHandler,
    postInfoHandler,
    currentSlide,
    setCurrentSlide,
    postInfo,
    submitHandler,
    submitName,
}) {
    return (
        <div className="post__toolbar">
            <div className="post__toolbar__label__div">
                {slide.map((el, idx) => {
                    if (idx === currentSlide - 1) {
                        return (
                            <label key={idx} className="post__toolbar__label selected-page" htmlFor={'pos' + (idx + 1)}>
                                {idx + 1} page
                            </label>
                        );
                    } else {
                        return (
                            <label key={idx} className="post__toolbar__label" htmlFor={'pos' + (idx + 1)}>
                                {idx + 1} page
                            </label>
                        );
                    }
                })}
                {slide.length < 5 ? (
                    <button className="post__toolbar__label" onClick={addSlideHandler}>
                        페이지 추가
                    </button>
                ) : (
                    ''
                )}
            </div>
            <div className="post__toolbar__edit-section">
                <form className="post__toolbar__about-post">
                    <label className="post__toolbar__title-label">제목</label>
                    <textarea
                        className="post__toolbar__title"
                        type="text"
                        value={postInfo.title}
                        onChange={postInfoHandler('title')}
                    />
                    <label>카테고리</label>
                    <select
                        className="post__toolbar__category"
                        value={postInfo.category}
                        onChange={postInfoHandler('category')}>
                        <option>운동</option>
                        <option>생활</option>
                        <option>동물</option>
                        <option>쇼핑</option>
                    </select>
                </form>
                {/* <h1>현재 페이지 : {currentSlide}</h1> */}
                <div className="post__toolbar__image">
                    {/* <img className="post__toolbar__image-preview" src={slide[currentSlide - 1].img} /> */}
                    <label className="post__toolbar__image-label">
                        이미지 업로드
                        <input
                            className="post__toolbar__image-input"
                            type="file"
                            accept="image/jpg, image/png, image/jpeg"
                            name="image"
                            onChange={slideTextHandler(currentSlide - 1, 'image')}
                        />
                    </label>
                    <button
                        onClick={slideTextHandler(currentSlide - 1, 'deleteImage')}
                        className="post__toolbar__image-label">
                        이미지 삭제
                    </button>
                </div>
                <form className="post__toolbar__content-form">
                    <label>내용</label>
                    <textarea
                        className="post__toolbar__content-input"
                        value={slide[currentSlide - 1].content}
                        placeholder="내용을 입력해주세요."
                        onChange={slideTextHandler(currentSlide - 1, 'content')}
                    />
                </form>
                <button
                    className="post__toolbar__delete-page"
                    disabled={slide.length === 1 ? 'disabled' : ''}
                    onClick={deleteSlideHandler(currentSlide - 1)}>
                    현재 페이지 삭제
                </button>
                <button onClick={submitHandler} className="post__toolbar__delete-post">
                    {submitName}
                </button>
            </div>
        </div>
    );
}
