import { useRouter } from 'next/router';
import { useState } from 'react';
import Post from '../../src/components/Post';

export default function Id() {
    const router = useRouter();
    const { id } = router.query;

    const [post, setPost] = useState({});

    const getPostsData = () => {
        axios.get(`http://localhost:80/post/${id}`).then((res) => {
            setPost(res.data.post);
            console.log(res.data.post);
        });
    };

    // useEffect(() => {
    //     if (id && id > 0) {
    //         getPostsData();
    //     }
    // }, [id]);

    return (
        <>
            <Post post={post} />
        </>
    );
}
