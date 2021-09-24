import axios from 'axios';
import { useRouter } from 'next/router';

export default function SingleComment({ userInfo, comment }) {
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
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="single-comment">
            <img className="single-comment__profile__img" src="" />
            <p className="single-comment__comment">
                <span className="single-comment__profile__username">{comment.user_id}</span>
                {comment.txt}
            </p>
            {comment.user_id === userInfo.id ? (
                <div className="single-comment__delete-space">
                    <img
                        className="single-comment__delete"
                        onClick={deleteComment}
                        src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-solid-kiranshastry.png"
                    />
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
