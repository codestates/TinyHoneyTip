import axios from 'axios';
import { useRouter } from 'next/router';

export default function SingleComment({ userInfo, comment, commentList, setCommentList }) {
    const router = useRouter();
    const { id } = router.query;

    const deleteComment = () => {
        const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post/comment/${id}`;
        axios
            .delete(apiUrl, {
                headers: {
                    Cookie: `accessToken=${userInfo.accessToken}`,
                    'Accept-Encoding': 'gzip, deflate, br',
                    Connection: 'keep-alive',
                },
                data: {
                    comment: comment.txt,
                },
                withCredentials: true,
            })
            .then((res) => {
                setCommentList(
                    commentList.filter((el) => {
                        return el.txt !== comment.txt;
                    }),
                );
            })
            .catch((error) => {});
    };

    return (
        <div className="single-comment">
            <img className="single-comment__profile__img" src={comment.User.profile_img} />
            <div className="single-comment__comment">
                <span className="single-comment__profile__username">{comment.User.username}</span>
                {comment.txt}
            </div>
            {comment.user_id === userInfo?.id ? (
                <img
                    className="single-comment__delete"
                    onClick={deleteComment}
                    src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png"
                />
            ) : (
                ''
            )}
        </div>
    );
}
