import axios from 'axios';

import Post from '../../src/components/Post';

export default function Id({ post, userInfo }) {
    return <Post userInfo={userInfo} post={post} />;
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post/${id}`;
    const res = await axios.get(apiUrl);
    const data = await res.data.data.post;
    return {
        props: {
            post: data,
        },
    };
}
