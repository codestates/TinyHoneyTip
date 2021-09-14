import React, { useState } from 'react';
import styles from '../../styles/Select.module.css';

export default function Select({ postList, setPostList }) {
    console.log(postList, 'select');
    const [selected, setSelected] = useState('');

    const changeSelectOptionHandler = (e) => {
        setSelected(e.target.value);
        if (e.target.value === '0') {
            setPostList(updatedContent(postList));
            console.log(postList);
        } else if (e.target.value === '1') {
            setPostList(likedContent(postList));
            console.log(postList);
        }
    };
    const updatedContent = (data) => {
        data?.sort(function (a, b) {
            return a.category - b.category;
        });
    };
    const likedContent = (data) => {
        data?.sort(function (a, b) {
            return a.like - b.like;
        });
    };
    return (
        <>
            <div className={styles.select_container}>
                <select className={styles.select} onChange={changeSelectOptionHandler}>
                    <option value="-1">선택</option>
                    <option value="0">최신순</option>
                    <option value="1">인기순</option>
                </select>
            </div>
        </>
    );
}
