import React, { useState, useEffect } from 'react';
import Cropper from 'cropperjs';

import 'cropperjs/dist/cropper.css';

export default function ImageEditModal({ currentSlide, slide, modalHandler }) {
    let cropper = '';
    useEffect(() => {
        const image = document.getElementById('image');
        cropper = new Cropper(image, {
            aspectRatio: 1 / 1,
            crop(event) {
                console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(event.detail.rotate);
                console.log(event.detail.scaleX);
                console.log(event.detail.scaleY);
            },
        });
    }, []);
    const [currentEditingImg, setCurrentEditingImg] = useState('');

    const modalEditHandler = (imgFile) => {
        // 자른 이미지 slide state에 알맞은 page에 저장
        // 함수 대충 틀만 잡아놓음 수정 필요
        console.log(cropper);
        // console.log(currentSlide);
        // if (cropper.ready === true) {
        //     console.log('ready');
        // } else {
        //     console.log('not ready');
        // }
        // const file = cropper.getCroppedCanvas();
        // console.log(file);
        // let editedContent = slide.map((el, idx) => {
        //     if (idx === index) {
        //         return { ...el, img: '', imgFile: imgFile };
        //     } else {
        //         return el;
        //     }
        // });
        // setSlide(editedContent);
        // modalHandler();
    };

    const currentEditingImgHandler = (key) => async (e) => {
        // 편집할 이미지 원본은 currentEditingImg에 저장
        setCurrentEditingImg(e.target.files[0]);
        // document.getElementsByClassName('cropper-hide')[0]?.setAttribute('src', URL.createObjectURL(e.target.files[0]));
        const image = await document.getElementById('image');
        console.log(image);
        cropper.destroy();
        cropper = new Cropper(image, {
            aspectRatio: 1 / 1,
            crop(event) {
                console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(event.detail.rotate);
                console.log(event.detail.scaleX);
                console.log(event.detail.scaleY);
            },
        });
        console.log(cropper);
    };
    return (
        <div className="post-upload-image-modal">
            <div className="post-upload-modal-edit-area">
                <div className="post-upload-modal-edit-area-inner">
                    <img
                        id="image"
                        src={
                            currentEditingImg.length !== 0
                                ? URL.createObjectURL(currentEditingImg)
                                : '/postDefaultImage.jpg'
                        }
                        alt="target image"
                    />
                </div>
            </div>
            <label className="post-upload-modal-btn-select">
                이미지 선택
                <input
                    className="post__toolbar__image-input"
                    type="file"
                    accept="image/jpg, image/png, image/jpeg"
                    name="image"
                    onChange={currentEditingImgHandler()}
                />
            </label>
            <div className="post-upload-modal-btns">
                <button className="post-upload-modal-btn" onClick={modalEditHandler}>
                    확인
                </button>
                <button className="post-upload-modal-btn" onClick={() => modalHandler()}>
                    취소
                </button>
            </div>
        </div>
    );
}
