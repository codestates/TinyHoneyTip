import React, { useState, useEffect } from 'react';
import Cropper from '../components/Cropper';

export default function ImageEditModal({ currentSlide, slide, modalHandler, croppedImage, setCroppedImage }) {
    const [imageToCrop, setImageToCrop] = useState(undefined);

    const onUploadFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                const image = reader.result;
                setImageToCrop(image);
            });

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="post-upload-image-modal">
            <div className="post-upload-modal-edit-area">
                <div className="post-upload-modal-edit-area-inner">
                    <div className="cropper">
                        <input type="file" accept="image/*" onChange={onUploadFile} />
                        <div>
                            <Cropper
                                imageToCrop={imageToCrop}
                                onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-upload-modal-btns">
                <button className="post-upload-modal-btn" onClick={() => modalHandler()}>
                    확인
                </button>
                <button className="post-upload-modal-btn" onClick={() => modalHandler()}>
                    취소
                </button>
            </div>
        </div>
    );
}
