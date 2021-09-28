import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import styles from '../../styles/Tumbnail.module.css';
import Select from './Select';
import Search from './Search';
import axios from 'axios';
import Category from './Category';
import Image from 'next/image';
import signinPic from '../../public/18:8.png';

export default function Thumbnail({ postList }) {
    const [itemIndex, setItemIndex] = useState(0);
    const [post, setPost] = useState(postList.slice(0, 7));
    const [init, setInit] = useState(postList);
    const [input, setInput] = useState('');

    const _infiniteScroll = useCallback(() => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight === scrollHeight) {
            setItemIndex(itemIndex + 7);
            setPost(post.concat(postList.slice(itemIndex + 7, itemIndex + 14)));
        }
    }, [itemIndex, post]);

    useEffect(() => {
        window.addEventListener('scroll', _infiniteScroll, true);
        return () => window.removeEventListener('scroll', _infiniteScroll, true);
    }, [_infiniteScroll]);

    const inputHandler = (e) => {
        setInput(([e.target.name] = e.target.value));
    };

    return (
        <>
            <div className={styles.search_line}>
                <Category init={init} post={post} setPost={setPost} />
                <Select post={post} setPost={setPost} />
                <Search inputHandler={inputHandler} />
            </div>
            <div className={styles.post_list_container}>
                <div className={styles.post_list_title}>🐝 꿀팁 둘러보기</div>
                <div className={styles.post_list}>
                    {
                        post?.filter((el) => {
                            return el?.title?.indexOf(input) > -1;
                        })?.length !== 0 ? (
                            post
                                ?.filter((el) => {
                                    return el.title.indexOf(input) > -1;
                                })
                                .map((list) => {
                                    return (
                                        <div className={styles.post_item} key={list.id}>
                                            <div className={styles.post_item_inner}>
                                                <div className={styles.best_item_header}>
                                                    <Link href={`/post/${list?.id}`}>
                                                        <a className={styles.header_image}>
                                                            <img
                                                                className={styles.img_inner}
                                                                alt={list?.title}
                                                                src={list?.post_page[0]?.img}
                                                            />
                                                        </a>
                                                    </Link>
                                                    <div className={styles.post_desc}>
                                                        <div className={styles.post_desc_title}>
                                                            <Link href={`/post/${list?.id}`}>
                                                                <a className={styles.post_title_font}>{list?.title}</a>
                                                            </Link>
                                                        </div>
                                                        <div className={styles.post_desc_text}>
                                                            <Link href={`/post/${list?.id}`}>
                                                                <a className={styles.post_text}>
                                                                    <div>{list?.post_page[0]?.content}</div>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                        <div className={styles.post_desc_category}>
                                                            <a className={styles.post_category}>{list?.category}</a>
                                                        </div>
                                                        <div className={styles.post_desc_user}>
                                                            <div className={styles.post_desc_userinfo}>
                                                                <div className={styles.post_author}>
                                                                    💛 {list?.like?.length}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            <>
                                <div className={styles.result}>
                                    검색 결과가 없습니다.
                                    <div className={styles.result_img}>
                                        <Image src={signinPic} alt="sign in picture" />
                                    </div>
                                </div>
                            </>
                        )
                        // loading으로 변경 예정
                    }
                </div>
            </div>
        </>
    );
}
