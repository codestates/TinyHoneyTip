import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function MyPage({ myPost, myScrap, alert, userInfo, setUserInfo }) {
    console.log(myPost);
    console.log(myScrap);
    console.log(userInfo);

    const [editBtn, setEditBtn] = useState(false);
    const [img, setImg] = useState(userInfo.profile_img);

    const inputHandler = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const fileUpload = async (e) => {
        setImg(e.target.files);
    };

    function editMyPage() {
        axios.patch(`${process.env.NEXT_PUBLIC_URL}/mypage`, { userInfo: userInfo, img: img }).then((res) => {
            const formData = new FormData();
            formData.append('file', img);
            axios.patch(`${process.env.NEXT_PUBLIC_URL}/mypage/uploads`, formData);
            if (res.data.message === 'ok') {
                setUserInfo(res.data.userInfo);
                window.alert('수정이 완료되었습니다.');
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
                    window.alert('회원탈퇴가 완료되었습니다.');

                    axios
                        .get(`${process.env.NEXT_PUBLIC_URL}/signout`, {
                            headers: {
                                authorization: userInfo.accessToken,
                            },
                        })
                        .then((res) => {
                            if (res.data.message !== 'byebye') {
                                window.alert('탈퇴가 완료되었습니다.');
                                useRouter.back();
                            }
                        });
                }
            });
    };

    return (
        <>
            {myPost || myScrap || alert ? (
                <div className="my_wrapper">
                    {console.log('알러트트ㅡ틑', userInfo)}
                    <div className="my_side_bar">
                        <div className="my_info">
                            <div className="my_profile_img">
                                <Image
                                    className="my_profile_img"
                                    alt="profile img"
                                    src={img}
                                    layout="fill"
                                    // width={500}
                                    // height={500}
                                    unoptimized={false}
                                />
                            </div>
                            <h3 className="my_user_name">🐝 {userInfo.username} 벌님 안녕하세요</h3>
                            <button className="edit_my_profile">
                                <Image
                                    onClick={editHandler}
                                    src="https://cdn.discordapp.com/attachments/881710985335934979/892220588406476800/edit.png"
                                    width={35}
                                    height={35}
                                    alt="edit button"
                                />
                            </button>

                            {editBtn ? (
                                <>
                                    <div className="my_user_infoBody">
                                        <form>
                                            <input
                                                type="file"
                                                id="profile_img_uploader"
                                                onChange={fileUpload}
                                                accept="image/png, image/jpeg"
                                            />
                                            <br />
                                            이메일: {userInfo.email}
                                            <br />
                                            <br />
                                            <label htmlFor="userName">이름: </label>
                                            <input
                                                type="text"
                                                id="userName"
                                                placeholder={userInfo.username}
                                                maxLength="8"
                                                minLength="1"
                                                onChange={(e) => inputHandler(e)}
                                                value={userInfo.username}
                                            />
                                        </form>
                                    </div>
                                    <button className="deleteBtn">
                                        <Image
                                            onClick={deleteSure}
                                            src="https://cdn.discordapp.com/attachments/881710985335934979/892220570425507870/userDeleteBtn.png"
                                            width={35}
                                            height={35}
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
                        {alert ? (
                            <div id="my_alert">
                                <h3 id="my_alert_title">my alert</h3>
                                <ul className="alert_scrap_list">
                                    {alert.scrap
                                        ? alert.scrap?.map((el) => {
                                              <li className="alert_scrap_item">
                                                  ✔️ {userInfo.username}벌님의 {el.title}을 {el.User.username} 님이 🙌
                                                  스크랩했습니다.
                                              </li>;
                                          })
                                        : '알림이 없습니다.'}
                                </ul>
                                <ul className="alert_like_list">
                                    {alert.like
                                        ? alert.like?.map((el) => {
                                              <li className="alert_like_item">
                                                  ✔️ {userInfo.username}벌님의 {el.title}을 {el.User.username} 님이 👍
                                                  좋아합니다.
                                              </li>;
                                          })
                                        : '알림이 없습니다.'}
                                </ul>
                            </div>
                        ) : (
                            <h3 id="no-alert">알림이 없습니다.</h3>
                        )}
                    </div>
                    <div className="my_Allpost_wrapper">
                        <div className="my_post_wrapper">
                            <h3 className="my_post">My Posts</h3>
                            <div className="my_post_container">
                                {myPost ? (
                                    myPost.map((el) => {
                                        return (
                                            <div className="my_post_item" key={el?.id}>
                                                <div className="my_post_item_inner">
                                                    <div className="my_post_item_option">
                                                        <div className="my_post_overlay"></div>
                                                    </div>
                                                    <div className="my_item_header">
                                                        <Link href={`/post/${el?.id}`}>
                                                            <div className="header_image">
                                                                <div className="img_inner">
                                                                    <Image
                                                                        layout="fill"
                                                                        alt={el?.title}
                                                                        // src={
                                                                        //     'data:image/png;base64' +
                                                                        //     Buffer(
                                                                        //         el?.post_page[0]?.img,
                                                                        //         'binary',
                                                                        //     ).toString('base64')
                                                                        // }
                                                                        src={el?.posts?.img}
                                                                        unoptimized="false"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className="my_post_desc">
                                                            <div className="my_post_desc_title">
                                                                <Link href={`/post/${el?.id}`}>
                                                                    <div className="my_post_title_font">
                                                                        {el?.title}
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className="my_post_desc_text">
                                                                <Link href={`/post/${el?.id}`}>
                                                                    <div className="my_post_text">
                                                                        <div>{el?.posts[0].content}</div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className="my_post_desc_category">
                                                                <a className="my_post_category">{el?.category}</a>
                                                            </div>
                                                            <div className="my_post_desc_user">
                                                                <div className="my_post_desc_userinfo">
                                                                    <div className="my_post_author">
                                                                        💛 {el?.like?.length}
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
                                    <h3 className="empty">my post is empty</h3>
                                )}
                            </div>
                        </div>
                        <div className="my_scrap_wrapper">
                            <h3 className="my_scrap">My Scrapped Posts</h3>
                            <div className="my_scrap_container">
                                {myScrap ? (
                                    myScrap.map((el) => {
                                        return (
                                            <div className="my_post_item" key={el?.id}>
                                                <div className="my_post_item_inner">
                                                    <div className="my_post_item_option">
                                                        <div className="my_post_overlay"></div>
                                                    </div>
                                                    <div className="my_item_header">
                                                        <Link href={`/post/${el?.id}`}>
                                                            <div className="header_image">
                                                                <div className="img_inner">
                                                                    <Image
                                                                        layout="fill"
                                                                        alt={el?.title}
                                                                        src={
                                                                            el?.post_container.posts[0]?.img
                                                                                ? el?.post_container.posts[0]?.img
                                                                                : 'https://media.discordapp.net/attachments/881710985335934979/894413797043871784/Violet_PawletteTM_Gift_Set___Build-A-Bear_Workshop.png'
                                                                        }
                                                                        //src="https://media.discordapp.net/attachments/881710985335934979/894413797043871784/Violet_PawletteTM_Gift_Set___Build-A-Bear_Workshop.png"
                                                                        unoptimized="false"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className="my_post_desc">
                                                            <div className="my_post_desc_title">
                                                                <Link href={`/post/${el?.id}`}>
                                                                    <div className="my_post_title_font">
                                                                        {el?.title}
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className="my_post_desc_text">
                                                                <Link href={`/post/${el?.id}`}>
                                                                    <div className="my_post_text">
                                                                        <div>
                                                                            {el?.post_container.posts[0]?.content}
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className="my_post_desc_category">
                                                                <a className="my_post_category">{el?.category}</a>
                                                            </div>
                                                            <div className="my_post_desc_user">
                                                                <div className="my_post_desc_userinfo">
                                                                    <div className="my_post_author">
                                                                        💛 {el?.like?.length ? el?.like?.length : 1}
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
                                    <h3 className="empty">my scrap is empty</h3>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div id="no_data">페이지를 다시 불러와 주세요</div>
            )}
            <a className="top-btn" onClick={() => window.scrollTo(0, 0)}>
                <Image
                    src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png"
                    alt="top-button"
                    layout="fill"
                    unoptimized="false"
                />
            </a>
        </>
    );
}

export async function getServerSideProps(context) {
    const token = context.req.headers.cookie;
    const apiUrl = `${process.env.NEXT_PUBLIC_URL}/mypage`;
    const res = await axios.get(apiUrl, {
        headers: { cookie: token, 'Content-Type': 'application/json' },
    });

    const post = res.data.data.myPost;
    const scrap = res.data.data.myScrap;
    const alert = {
        like: res.data.data.myPost.like || null,
        dislike: res.data.data.myPost.dislike || null,
        scrap: res.data.data.myPost.scrap || null,
        comment: res.data.data.myPost.comment || null,
    };

    return {
        props: {
            myPost: post,
            myScrap: scrap,
            alert: alert,
        },
    };
}
