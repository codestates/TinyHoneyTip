import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../../src/components/Post';
export default function Id({ userInfo }) {
    const router = useRouter();
    const { id } = router.query;

    const [post, setPost] = useState({});

    const API_URL = `${process.env.NEXT_PUBLIC_URL}/post/${id}`;

    const getPostsData = () => {
        console.log('페이지 렌더링');
        console.log(userInfo);
        axios
            .get(API_URL, {
                headers: {
                    // 'content-Type': 'application/json',
                    cookie: userInfo.accessToken,
                    // 'accept-encoding': 'gzip, deflate, br',
                    // Connection: 'keep-alive',
                },
                withCredentials: true,
            })
            .then((res) => {
                setPost(res.data.data.post);
            })
            .catch((error) => {
                console.log('page 정보 불러오기 실패!');
                console.log(error);
            });
    };

    // useEffect(() => {
    //     if (!router.isReady) return;
    //     id = router.query.id;
    //     getPostsData(id);
    // }, [router.isReady]);

    useEffect(() => {
        if (id && id > 0) {
            getPostsData();
        }
    }, [id]);

    useEffect(() => {
        if (id && id > 0) {
            getPostsData();
        }
    }, [userInfo]);

    return <Post userInfo={userInfo} post={post} />;
}
