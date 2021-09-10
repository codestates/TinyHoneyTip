
export default function SingleComment() {

    return(
        <div className='single-comment'>
            <div className='single-comment__profile'>
                <img className='single-comment__profile__img' src='' />
                <h1 className='single-comment__profile__username'>
                    유저 이름
                </h1>
            </div>
            <p className='single-comment__comment'>
                댓글 내용
            </p>
            <button className='single-comment__delete'>
                {/* 본인 댓글인 경우만 보이도록 */}
                삭제
            </button>
        </div>
    )
}