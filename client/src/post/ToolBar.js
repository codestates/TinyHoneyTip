import React from 'react';

export default function ToolBar({
    slide,
    addSlideHandler,
    deleteSlideHandler,
    slideTextHandler,
    postInfoHandler,
    currentSlide,
    postInfo,
    submitHandler,
    submitName,
    cannotSubmitMessage,
    modalHandler,
}) {
    return (
        <div className="post__toolbar__container">
            <div className="post-upload-page-line"></div>
            <div className="post__toolbar">
                <div className="post__toolbar__label__div">
                    {slide.map((el, idx) => {
                        if (idx === currentSlide - 1) {
                            return (
                                <label
                                    key={idx}
                                    className="post__toolbar__label selected-page"
                                    htmlFor={'pos' + (idx + 1)}>
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
                            placeholder="제목을 입력해주세요."
                            maxLength="45"
                        />
                        <label>카테고리</label>
                        <select
                            className="post__toolbar__category"
                            value={postInfo.category}
                            onChange={postInfoHandler('category')}>
                            <option>카테고리</option>
                            <option>취미</option>
                            <option>음식</option>
                            <option>건강</option>
                            <option>생활</option>
                            <option>동물</option>
                            <option>쇼핑</option>
                            <option>기타</option>
                        </select>
                    </form>
                    <div className="post__toolbar__image">
                        <label className="post__toolbar__image-label" onClick={modalHandler}>
                            이미지 업로드
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
                            maxLength="300"
                        />
                    </form>
                    <button
                        className="post__toolbar__delete-page"
                        disabled={slide.length === 1 ? 'disabled' : ''}
                        onClick={deleteSlideHandler(currentSlide - 1)}>
                        현재 페이지 삭제
                    </button>
                    <div className="new-post__upload-section">
                        <button onClick={submitHandler} className="post__toolbar__delete-page">
                            {submitName}
                        </button>
                        {cannotSubmitMessage ? (
                            <span className="post-upload__err">제목과 카테고리는 필수 입력사항입니다.</span>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
