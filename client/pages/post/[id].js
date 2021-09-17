import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../../src/components/Post';

export default function Id() {
    const router = useRouter();
    const { id } = router.query;

    const [post, setPost] = useState({});

    const API_URL = `${process.env.NEXT_PUBLIC_URL}/post/${id}`;

    const getPostsData = () => {
        axios.get(API_URL).then((res) => {
            setPost(res.data.data.post);
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

    return <Post post={post} />;
}
