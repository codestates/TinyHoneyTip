export default function PostContent() {

    return(
        <div className='single-post__post-area'>
            <div className='single-post__head'>
                <h1 className='single-post__tittle'>
                    게시물 제목
                </h1>
                <div className='single-post__head__btns'>
                    {/*  본인 글일 경우만 보이도록 */}
                    <button className='single-post__head__delete'>
                        게시물 삭제
                    </button>
                    <button className='single-post__head__edit'>
                        게시물 수정
                    </button>
                </div>
            </div>
            <div className='single-post__post'>
                <img className='single-post__post__pic' src='' />
                <p className='single-post__post__text'>
                    게시물 내용
                </p>
                <button className='single-post__post__previous-page-btn'>

                </button>
                <button className='single-post__post__next-page-btn'>
                    
                </button>
            </div>
            <div className='single-post__btns'>
                <button className='single-post__like'>

                </button>
                <button className='single-post__dislike'>

                </button>
                <button className='single-post__scrap'>

                </button>
            </div>
        </div>
    )
}