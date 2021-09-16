import React, { useState } from 'react';
import styles from '../../styles/Select.module.css';

export default function Select({ postList, setPostList }) {
    console.log(postList, 'select');
    const [selected, setSelected] = useState('');

    const changeSelectOptionHandler = (e) => {
        setSelected(e.target.value);
        if (e.target.value === 'title') {
            titledContent();
            console.log(postList);
        } else if (e.target.value === 'like') {
            likedContent();
            console.log(postList);
        }
    };
    const titledContent = () => {
        postList.sort(function (a, b) {
            let titleA = a.title.toUpperCase();
            let titleB = b.title.toUpperCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        });
    };
    const likedContent = () => {
        postList.sort(function (a, b) {
            let likeA = a.like.length;
            let likeB = b.like.length;
            if (likeA < likeB) return -1;
            if (likeA > likeB) return 1;
            return 0;
        });
    };
    return (
        <>
            <div className={styles.select_container}>
                <select className={styles.select} onChange={changeSelectOptionHandler}>
                    <option value="all">선택</option>
                    <option value="title">이름순</option>
                    <option value="like">인기순</option>
                </select>
            </div>
        </>
    );
}
