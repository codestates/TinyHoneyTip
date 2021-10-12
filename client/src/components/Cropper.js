import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

import demoImage from '../../public/tht_logo.png';

function ImageCropper({ imageToCrop, onImageCropped }) {
    const [cropConfig, setCropConfig] = useState({
        unit: '%',
        width: 30,
        aspect: 1 / 1,
    });

    const [imageRef, setImageRef] = useState();

    async function cropImage(crop) {
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImage(imageRef, crop, 'croppedImage.jpeg');
            onImageCropped(croppedImage);
        }
    }

    function getCroppedImage(sourceImage, cropConfig, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = sourceImage.naturalWidth / sourceImage.width;
        const scaleY = sourceImage.naturalHeight / sourceImage.height;
        canvas.width = cropConfig.width;
        canvas.height = cropConfig.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            sourceImage,
            cropConfig.x * scaleX,
            cropConfig.y * scaleY,
            cropConfig.width * scaleX,
            cropConfig.height * scaleY,
            0,
            0,
            cropConfig.width,
            cropConfig.height,
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }

                blob.name = fileName;

                resolve(new File([blob], blob.name));
            }, 'image/jpeg');
        });
    }

    return (
        <ReactCrop
            src={imageToCrop || demoImage}
            crop={cropConfig}
            ruleOfThirds
            onImageLoaded={(imageRef) => setImageRef(imageRef)}
            onComplete={(cropConfig) => cropImage(cropConfig)}
            onChange={(cropConfig) => setCropConfig(cropConfig)}
            crossorigin="anonymous"
        />
    );
}

ImageCropper.defaultProps = {
    onImageCropped: () => {},
};

export default ImageCropper;
