
import SingleComment from "./SingleComment"

export default function Comments() {

    return(
        <div className='single-post__comment-area'>
            <div className='single-post__profile'>
                <img className='single-post__profile__img' src='' />
                <h1 className='single-post__profile__username'>
                    유저 이름
                </h1>
            </div>
            <div className='single-post__comments'>
                {/* overflow: auto 로 스크롤 생성 */}
                {/* 데이터 받아서 map */}
                <SingleComment />
            </div>
            <div className='single-post__comment-input'>
                <input className='single-post__comment-input__input' type='text' />
                <button className='single-post__comment-input__submit'>
                    등록
                </button>
            </div>
        </div>
    )
}