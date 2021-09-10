import styles from '../../styles/PostList.module.css';
import Link from 'next/link';

export default function PostList({ postList }) {
    return (
        <>
            <div>
                {postList.map((post) => {
                    <div key={post.id}>
                        <Link href={`/post/${post.id}`}>
                            <a>
                                <div>{post.title}</div>
                                <img>{post.post_page[0].img}</img>
                                <div>{post.comment}</div>
                            </a>
                        </Link>
                        ;
                    </div>;
                })}
            </div>
        </>
    );
}
