export default function PostContent() {

    return (
        <div className='single-post__post-area'>
            <h1 className='single-post__title'>
                게시물 제목
            </h1>
            <div className='single-post__post'>
                <img className='single-post__post__pic' src='' />
                <p className='single-post__post__text'>
                    게시물 내용
                </p>
                <img
                    className='single-post__post__previous-page-btn'
                    src="https://img.icons8.com/material-outlined/24/000000/back--v1.png"
                />
                <img
                    className='single-post__post__next-page-btn'
                    src="https://img.icons8.com/material-outlined/24/000000/back--v1.png"
                />
            </div>
            <div className='single-post__btns'>
                <div className='single-post__btns__feeling'>
                    <img
                        className='single-post__btn__img'
                        src="https://img.icons8.com/material-outlined/24/000000/like--v1.png"
                    />
                    {/* src={likeClicked? 
                        "https://img.icons8.com/material-rounded/24/000000/like--v1.png"
                        :
                        "https://img.icons8.com/material-outlined/24/000000/like--v1.png"} */}
                    <img
                        className='single-post__btn__img'
                        src="https://img.icons8.com/material-outlined/24/000000/dislike.png"
                    />
                    {/* src={disliked? 
                        "https://img.icons8.com/material-outlined/24/000000/dislike.png"
                        :
                        "https://img.icons8.com/material-rounded/24/000000/dislike.png"} */}
                    <img
                        className='single-post__btn__img'
                        src="https://img.icons8.com/material-outlined/24/000000/bookmark-ribbon--v1.png"
                    />
                    {/* src={scraped?
                        "https://img.icons8.com/material-outlined/24/000000/bookmark-ribbon--v1.png"
                        :
                        "https://img.icons8.com/material-rounded/24/000000/bookmark-ribbon.png"} */}
                </div>
                <div className='single-post__btns__post'>
                    {/*  본인 글일 경우만 보이도록 */}
                    <img
                        className='single-post__edit'
                        src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"
                    />
                    <img
                        className='single-post__delete'
                        src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png"
                    />
                </div>
            </div>
        </div>
    )
}