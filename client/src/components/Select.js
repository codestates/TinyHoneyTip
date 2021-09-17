import React, { useEffect, useState } from 'react';
import styles from '../../styles/Select.module.css';

export default function Select({ postList, setPostList }) {
    const changeSelectOptionHandler = (e) => {
        if (e.target.value === 'title') {
            sortedTitle();
            // console.log(postList);
        } else if (e.target.value === 'like') {
            sortedLiked();
            // console.log(postList);
        } else if (e.target.value === 'update') {
            sortedUpdate();
            // console.log(postList);
        }
    };
    const sortedUpdate = () => {
        postList.sort(function (a, b) {
            let idA = a.id;
            let idB = b.id;
            if (idA < idB) return -1;
            if (idA > idB) return 1;
            return 0;
        });
    };
    const sortedTitle = () => {
        postList.sort(function (a, b) {
            let titleA = a.title.toUpperCase();
            let titleB = b.title.toUpperCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        });
    };
    const sortedLiked = () => {
        postList.sort(function (a, b) {
            let likeA = a.like.length;
            let likeB = b.like.length;
            if (likeA < likeB) return -1;
            if (likeA > likeB) return 1;
            return 0;
        });
    };
    // console.log(postList, 'select');
    return (
        <>
            <div className={styles.select_container}>
                <select className={styles.select} onChange={changeSelectOptionHandler}>
                    <option value>선택</option>
                    <option value="title">이름순</option>
                    <option value="like">인기순</option>
                    <option value="update">최신순</option>
                </select>
            </div>
        </>
    );
}
