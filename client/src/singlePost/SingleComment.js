import axios from 'axios';

export default function SingleComment({ comment }) {
    console.log(comment);
    const { user_id, post_id, txt } = comment;
    const deleteComment = () => {
        // 서버에 댓글 삭제 요청
    };

    return (
        <div className="single-comment">
            <img className="single-comment__profile__img" src="" />
            <p className="single-comment__comment">
                <span className="single-comment__profile__username">유저이름</span>
                {comment.txt}
            </p>
            <div className="single-comment__delete-space">
                {/* 본인이 쓴 댓글인 경우에만 표시 */}
                <img
                    className="single-comment__delete"
                    onClick={deleteComment}
                    src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png"
                />
            </div>
        </div>
    );
}
