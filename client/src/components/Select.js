import React, { useEffect, useState } from 'react';

export default function Select({ post, setPost }) {
    const selectHandler = (e) => {
        if (e.target.value === 'title') {
            sortedTitle();
            console.log(post, 'title');
        } else if (e.target.value === 'like') {
            sortedLiked();
            console.log(post, 'like');
        } else if (e.target.value === 'update') {
            sortedUpdate();
            console.log(post, 'update');
        }
    };

    const sortedUpdate = () => {
        const _post = [...post];
        setPost(
            _post.sort(function (a, b) {
                let idA = a.id;
                let idB = b.id;
                if (idA < idB) return -1;
                if (idA > idB) return 1;
                return 0;
            }),
        );
    };

    const sortedTitle = () => {
        const _post = [...post];
        setPost(
            _post.sort(function (a, b) {
                let titleA = a.title.toUpperCase();
                let titleB = b.title.toUpperCase();
                if (titleA < titleB) return -1;
                if (titleA > titleB) return 1;
                return 0;
            }),
        );
    };

    const sortedLiked = () => {
        const _post = [...post];
        setPost(
            _post.sort(function (a, b) {
                let likeA = a.like.length;
                let likeB = b.like.length;
                if (likeA < likeB) return 1;
                if (likeA > likeB) return -1;
                return 0;
            }),
        );
    };
    return (
        <>
            <div className="select_container">
                <select className="select" onChange={selectHandler}>
                    <option value>선택</option>
                    <option value="title">이름순</option>
                    <option value="like">인기순</option>
                    <option value="update">최신순</option>
                </select>
            </div>
        </>
    );
}
