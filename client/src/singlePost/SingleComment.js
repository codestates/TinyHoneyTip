
export default function SingleComment() {

    return (
        <div className='single-comment'>
            <img className='single-comment__profile__img' src='' />
            <p className='single-comment__comment'>
                <span className='single-comment__profile__username'>
                    유저이름
                </span>
                댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용
            </p>
            <div className='single-comment__delete-space'>
                <img
                    className='single-comment__delete'
                    src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png"
                />
            </div>
        </div>
    )
}