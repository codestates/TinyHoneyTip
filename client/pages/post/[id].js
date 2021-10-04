import axios from 'axios';
import Head from 'next/head';

import Post from '../../src/components/Post';

export default function Id({ post, userInfo }) {
    return (
        <>
            <Head>
                <title>Post | Tiny Honey Tip</title>
            </Head>
            <Post userInfo={userInfo} post={post} />
        </>
    );
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/post/${id}`;
    const res = await axios.get(apiUrl);
    const data = await res.data.postDetail;
    return {
        props: {
            post: data,
        },
    };
}
