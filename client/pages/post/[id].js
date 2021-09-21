import axios from 'axios';

import Post from '../../src/components/Post';

export default function Id({ post, userInfo }) {
    // 로그인할 때 로컬 스토리지에 저장하고 아래 getServerSideProps에서 불러보기(혹은 session)
    // https://stackoverflow.com/questions/62474098/get-localstorage-in-nextjs-getinitialprops
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
