import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import pic from '../public/honeycomb.png';
import editPic from '../public/edit.png';
import styles from '../styles/Tumbnail.module.css';
import Link from 'next/link';

export default function MyPage({ userInfo }) {
    const [myPost, setMyPost] = useState([]);
    const [myScrap, setMyScrap] = useState([]);
    const [editBtn, setEditBtn] = useState(false);
    const [newUserInfo, setNewUserInfo] = useState(userInfo);

    function getMyPage() {
        axios
            .get(`${process.env.NEXT_PUBLIC_URL}/myPage`, {
                headers: { cookie: { accessToken: userInfo.accessToken }, 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                setMyPost(res.data.data.myPost);
                setMyScrap(res.data.data.myScrap);
            })
            .catch((err) => {
                return console.log('오류입니다!', err);
            });
    }

    useEffect(() => {
        console.log(userInfo);
        getMyPage();
    }, []);

    function editMyPage() {
        axios.patch(`${process.env.NEXT_PUBLIC_URL}/mypage`, { newUserInfo }).then((res) => {
            if (res.message === 'ok') {
                setNewUserInfo(res.data.userInfo);
                alert('수정이 완료되었습니다.');
            }
        });
    }

    const editHandler = () => {
        setEditBtn(editBtn ? false : true);
        if (editBtn) editMyPage();
    };

    return (
        <>
            <div className="my_wrapper">
                <div className="my_side_bar">
                    <div className="my_info">
                        <div className="my_profile_img">{/*<Image src={newUserInfo.profile_img} /> */}</div>
                        <h3 className="my_user_name">{newUserInfo.username} 🐝 벌님 안녕하세요</h3>
                        <button className="edit_my_profile">
                            <Image onClick={editHandler} src={editPic} />
                        </button>
                        {editBtn ? (
                            <div className="my_user_infoBody">
                                <form>
                                    이메일: {newUserInfo.email}
                                    <label htmlFor="userName">이름: </label>
                                    <input type="text" id="userName" placeholder="이름을 입력하세요"></input>
                                </form>
                            </div>
                        ) : (
                            <div className="my_user_infoBody">
                                이메일 {newUserInfo.email}
                                <br />
                                <br />
                                이름 {newUserInfo.username}
                            </div>
                        )}
                    </div>
                    <div id="my_alert"></div>
                </div>
                <div className="my_Allpost_wrapper">
                    <div className="my_post_wrapper">
                        <h3 className="my_post">My Posts</h3>
                        <div className="my_post_container">
                            {myPost.map((el) => {
                                return (
                                    <div className="my_post_item" key={el.id}>
                                        <div className={styles.post_item_inner}>
                                            <div className={styles.post_item_option}>
                                                <div className={styles.post_overlay}></div>
                                            </div>
                                            <div className={styles.best_item_header}>
                                                <Link href={`/post/${el.id}`}>
                                                    <a className={styles.header_image}>
                                                        <img
                                                            className={styles.img_inner}
                                                            alt={el.title}
                                                            //src={el.post_page[0].img}
                                                        />
                                                    </a>
                                                </Link>
                                                <div className={styles.post_desc}>
                                                    <div className={styles.post_desc_title}>
                                                        <Link href={`/post/${el.id}`}>
                                                            <a className={styles.post_title_font}>{el.title}</a>
                                                        </Link>
                                                    </div>
                                                    <div className={styles.post_desc_text}>
                                                        {/* <Link href={`/post/${el.id}`}>
                                                <a className={styles.post_text}>{el.post_page[0].content}</a>
                                                </Link> */}
                                                    </div>
                                                    <div className={styles.post_desc_category}>
                                                        <a className={styles.post_category}>{el?.category}</a>
                                                    </div>
                                                    <div className={styles.post_desc_user}>
                                                        <div className={styles.post_desc_userinfo}>
                                                            <div className={styles.post_author}>
                                                                💛 {el.like.length}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="my_scrap_wrapper">
                        <h3 className="my_scrap">My Scrapped Posts</h3>
                        <div className="my_scrap_container">
                            {myScrap.map((el) => {
                                <div className={styles.post_item} key={el.id}>
                                    <div className={styles.post_item_inner}>
                                        <div className={styles.post_item_option}>
                                            <div className={styles.post_overlay}></div>
                                        </div>
                                        <div className={styles.best_item_header}>
                                            <Link href={`/post/${el.id}`}>
                                                <a className={styles.header_image}>
                                                    <img
                                                        className={styles.img_inner}
                                                        alt={el.title}
                                                        //src={el.post_page[0].img}
                                                    />
                                                </a>
                                            </Link>
                                            <div className={styles.post_desc}>
                                                <div className={styles.post_desc_title}>
                                                    <Link href={`/post/${el.id}`}>
                                                        <a className={styles.post_title_font}>{el.title}</a>
                                                    </Link>
                                                </div>
                                                <div className={styles.post_desc_text}>
                                                    {/* <Link href={`/post/${el.id}`}>
                                            <a className={styles.post_text}>{el.post_page[0].content}</a>
                                            </Link> */}
                                                </div>
                                                <div className={styles.post_desc_category}>
                                                    <a className={styles.post_category}>{el?.category}</a>
                                                </div>
                                                <div className={styles.post_desc_user}>
                                                    <div className={styles.post_desc_userinfo}>
                                                        <div className={styles.post_author}>💛 {el.like.length}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <a className="top-btn" onClick={() => window.scrollTo(0, 0)}>
                <Image
                    loader={() => 'https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png'}
                    src={pic}
                    alt="top-button"
                    width="7vw"
                    height="5vw"
                    unoptimized="true"
                />
            </a>
        </>
    );
}
