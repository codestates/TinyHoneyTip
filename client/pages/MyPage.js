import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Thumbnail from '../src/components/Thumbnail';
import pic from '../public/honeycomb.png';
import editPic from '../public/edit.png';

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
        getMyPage();
    }, []);

    function editMyPage() {
        axios.patch(`${process.env.NEXT_PUBLIC_URL}/mypage`, { newUserInfo }).then((res) => {
            if (res.message === 'ok') setNewUserInfo(res.data.userInfo);
        });
    }

    const editHandler = () => setEditBtn(editBtn ? false : true);

    return (
        <>
            <div className="wrapper">
                <div className="side_bar">
                    <div className="user_info">
                        <div className="profile_img"></div>
                        <h3 className="user_name">{newUserInfo.username}🐝벌님 안녕하세요</h3>
                        <button>
                            <Image onClick={editHandler} src={editPic} />
                        </button>
                        {editBtn ? (
                            <div className="user_info_body">
                                <form>
                                    이메일: {newUserInfo.email}
                                    <label htmlFor="userName">이름: </label>
                                    <input type="text" id="userName" placeholder="이름을 입력하세요"></input>
                                </form>
                            </div>
                        ) : (
                            <div className="user_info_body">
                                이메일: {newUserInfo.email}
                                이름: {newUserInfo.username}
                            </div>
                        )}
                    </div>
                    <div id="alert"></div>
                </div>
                <div className="my_post_wrapper">
                    <h3 className="my_post">내가 쓴 글</h3>
                    {myPost.map((el) => {
                        return <Thumbnail list={el} key={el.id}></Thumbnail>;
                    })}
                </div>
                <div className="my_scrap_wrapper">
                    <h3 className="my_scrap">내가 스크랩한 글</h3>
                    {myScrap.map((el) => {
                        return <Thumbnail list={el} key={el.id}></Thumbnail>;
                    })}
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
