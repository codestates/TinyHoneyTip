import React, { useState } from 'react';
import Cropper from '../components/Cropper';

export default function ImageEditModal({ currentSlide, slide, setSlide, modalHandler, croppedImage, setCroppedImage }) {
    const [imageToCrop, setImageToCrop] = useState(undefined);
    const onUploadFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            const file = e.target.files[0];
            setCroppedImage(file);

            reader.addEventListener('load', () => {
                const image = reader.result;
                setImageToCrop(image);
            });

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const editSubmitHandler = () => {
        let editedContent = slide.map((el, idx) => {
            if (idx === currentSlide - 1) {
                return { ...el, img: '', imgFile: croppedImage };
            } else {
                return el;
            }
        });
        setSlide(editedContent);
        modalHandler();
    };

    return (
        <div className="post-upload-image-modal">
            <div className="post-upload-modal-edit-area">
                <div className="post-upload-modal-edit-area-inner">
                    <div className="cropper">
                        <div className="cropper-div">
                            <Cropper
                                imageToCrop={imageToCrop}
                                onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <label className="post-upload-modal-btn-select">
                파일 선택
                <input className="post__toolbar__image-input" type="file" accept="image/*" onChange={onUploadFile} />
            </label>
            <div className="post-upload-modal-btns">
                <button className="post-upload-modal-btn" onClick={() => editSubmitHandler()}>
                    확인
                </button>
                <button className="post-upload-modal-btn" onClick={() => modalHandler()}>
                    취소
                </button>
            </div>
        </div>
    );
}
