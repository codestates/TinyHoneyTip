import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import pic from '../public/honeycomb.png';
import styles from '../styles/Post.module.css';
import Link from 'next/link';

export default function MyPage({ myPost, myScrap, alert, userInfo, setUserInfo }) {
    console.log(myPost);
    console.log(myScrap);
    console.log(alert);
    const [editBtn, setEditBtn] = useState(false);

    const inputHandler = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    function editMyPage() {
        axios.patch(`${process.env.NEXT_PUBLIC_URL}/mypage`, { userInfo }).then((res) => {
            if (res.message === 'ok') {
                setUserInfo(res.data.userInfo);
                alert('수정이 완료되었습니다.');
            }
        });
    }

    const editHandler = () => {
        setEditBtn(editBtn ? false : true);
        if (editBtn) editMyPage();
    };

    const deleteSure = () => {
        if (window.confirm('정말 회원 탈퇴하시겠습니까?')) {
            window.open('exit.html', 'Thanks for Visiting!');
            userDelete;
        }
    };

    const userDelete = () => {
        axios
            .delete(`${process.env.NEXT_PUBLIC_URL}/user`, {
                data: { token: userInfo.token },
                withCredentials: true,
            })
            .then((res) => {
                if (res.message === 'byebye') {
                    alert('회원탈퇴가 완료되었습니다.');

                    axios
                        .get(`${process.env.NEXT_PUBLIC_URL}/signout`, {
                            headers: {
                                authorization: userInfo.accessToken,
                            },
                        })
                        .catch((error) => {
                            console.log('logout error 쿠키 삭제 실패', error);
                        });
                }
            });
    };

    return (
        <>
            <div className="my_wrapper">
                <div className="my_side_bar">
                    <div className="my_info">
                        <div className="my_profile_img">
                            <Image
                                layout="fill"
                                alt="profile img"
                                src={
                                    'data:image/png;base64' + Buffer(userInfo.profile_img, 'binary').toString('base64')
                                }
                            />
                        </div>
                        <h3 className="my_user_name">🐝 {userInfo.username} 벌님 안녕하세요</h3>
                        <button className="edit_my_profile">
                            <Image
                                onClick={editHandler}
                                src="https://cdn.discordapp.com/attachments/881710985335934979/892220588406476800/edit.png"
                                width="30px"
                                height="30px"
                                alt="edit button"
                            />
                        </button>

                        {editBtn ? (
                            <>
                                <div className="my_user_infoBody">
                                    <form>
                                        이메일: {userInfo.email}
                                        <br />
                                        <br />
                                        <label htmlFor="userName">이름: </label>
                                        <input
                                            type="text"
                                            id="userName"
                                            placeholder="이름을 입력하세요"
                                            maxLength="8"
                                            minLength="1"
                                            onChange={(e) => inputHandler(e)}
                                            value={userInfo.username}></input>
                                    </form>
                                </div>
                                <button className="deleteBtn">
                                    <Image
                                        onClick={deleteSure}
                                        src="https://cdn.discordapp.com/attachments/881710985335934979/892220570425507870/userDeleteBtn.png"
                                        width="25px"
                                        height="25px"
                                        alt="delete button"
                                    />
                                </button>
                            </>
                        ) : (
                            <div className="my_user_infoBody">
                                <p id="email">
                                    이메일 <span>{userInfo.email}</span>
                                </p>
                                <p id="username">
                                    이름 <span>{userInfo.username}</span>
                                </p>
                            </div>
                        )}
                    </div>
                    {/* <div id="my_alert">
                        <h3 id="my_alert_title"></h3>
                        <ul className="alert_scrap_list">
                            {alert?.scrap !== [{ title: '', userName: '' }]
                                ? alert?.scrap.map((el) => {
                                      <li className="alert_scrap_item">
                                          {userInfo.username}벌님의 {el.title}을 {el.userName} 님이 스크랩했습니다.
                                      </li>;
                                  })
                                : '알림이 없습니다.'}
                        </ul>
                        <ul className="alert_like_list">
                            {alert?.like !== [{ title: '', userName: '' }]
                                ? alert?.like.map((el) => {
                                      <li className="alert_like_item">
                                          {userInfo.username}벌님의 {el.title}을 {el.userName} 님이 좋아합니다.
                                      </li>;
                                  })
                                : '알림이 없습니다.'}
                        </ul>
                    </div> */}
                </div>
                <div className="my_Allpost_wrapper">
                    <div className="my_post_wrapper">
                        <h3 className="my_post">My Posts</h3>
                        <div className="my_post_container">
                            {myPost?.map((el) => {
                                return (
                                    <div className="my_post_item" key={el?.id}>
                                        <div className="my_post_item_inner">
                                            <div className={styles.post_item_option}>
                                                <div className={styles.post_overlay}></div>
                                            </div>
                                            <div className={styles.best_item_header}>
                                                <Link href={`/post/${el?.id}`}>
                                                    <div className={styles.header_image}>
                                                        <div className={styles.img_inner}>
                                                            <Image
                                                                layout="fill"
                                                                alt={el?.title}
                                                                src={el?.post_page[0].img}
                                                                unoptimized="false"
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className={styles.post_desc}>
                                                    <div className={styles.post_desc_title}>
                                                        <Link href={`/post/${el?.id}`}>
                                                            <div className={styles.post_title_font}>{el?.title}</div>
                                                        </Link>
                                                    </div>
                                                    <div className={styles.post_desc_text}>
                                                        <Link href={`/post/${el?.id}`}>
                                                            <div className={styles.post_text}>
                                                                <div>{el?.post_page[0].content}</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className={styles.post_desc_category}>
                                                        <a className={styles.post_category}>{el?.category}</a>
                                                    </div>
                                                    <div className={styles.post_desc_user}>
                                                        <div className={styles.post_desc_userinfo}>
                                                            <div className={styles.post_author}>
                                                                💛 {el?.like.length}
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
                            {myScrap?.map((el) => {
                                return (
                                    <div className="my_post_item" key={el?.id}>
                                        <div className="my_post_item_inner">
                                            <div className={styles.post_item_option}>
                                                <div className={styles.post_overlay}></div>
                                            </div>
                                            <div className={styles.best_item_header}>
                                                <Link href={`/post/${el?.id}`}>
                                                    <a className={styles.header_image}>
                                                        <Image
                                                            className={styles.img_inner}
                                                            alt={el?.title}
                                                            layout="fill"
                                                            src={el?.post_page[0].img}
                                                            unoptimized={false}
                                                        />
                                                    </a>
                                                </Link>
                                                <div className={styles.post_desc}>
                                                    <div className={styles.post_desc_title}>
                                                        <Link href={`/post/${el?.id}`}>
                                                            <a className={styles.post_title_font}>{el?.title}</a>
                                                        </Link>
                                                    </div>
                                                    <div className={styles.post_desc_text}>
                                                        <Link href={`/post/${el?.id}`}>
                                                            <a className={styles.post_text}>
                                                                {el?.post_page[0].content}
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className={styles.post_desc_category}>
                                                        <a className={styles.post_category}>{el?.category}</a>
                                                    </div>
                                                    <div className={styles.post_desc_user}>
                                                        <div className={styles.post_desc_userinfo}>
                                                            <div className={styles.post_author}>
                                                                💛 {el?.like.length}
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
                </div>
            </div>
            <a className="top-btn" onClick={() => window.scrollTo(0, 0)}>
                <Image src={pic} alt="top-button" width="7vw" height="5vw" />
            </a>
        </>
    );
}

export async function getServerSideProps(context) {
    console.log(context);
    const token = context.req.headers.cookie;
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/mypage`;
    const res = await axios.get(apiUrl, {
        headers: { cookie: token, 'Content-Type': 'application/json' },
    });
    const post = res.data.data.myPost;
    const scrap = res.data.data.myScrap;
    const alert = res.data.data;
    return {
        props: {
            myPost: post,
            myScrap: scrap,
            alert: alert,
        },
    };
}
