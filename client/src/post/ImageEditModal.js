export default function ImageEditModal({
    currentEditingImg,
    currentEditingImgHandler,
    modalEditHandler,
    modalHandler,
}) {
    return (
        <div className="post-upload-image-modal">
            <div className="post-upload-modal-edit-area">
                <div className="post-upload-modal-edit-area-inner">
                    <img
                        id="image"
                        src={currentEditingImg ? URL.createObjectURL(currentEditingImg) : '/postDefaultImage.jpg'}
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
