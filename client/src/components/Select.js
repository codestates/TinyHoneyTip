import React from 'react';

export default function Select({ post, setPost }) {
    const selectHandler = (e) => {
        if (e.target.value === 'title') {
            sortedTitle();
        } else if (e.target.value === 'like') {
            sortedLiked();
        } else if (e.target.value === 'update') {
            sortedUpdate();
        } else if (e.target.value === 'dislike') {
            sortedDisliked();
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
    const sortedDisliked = () => {
        const _post = [...post];
        setPost(
            _post.sort(function (a, b) {
                let likeA = a.dislike.length;
                let likeB = b.dislike.length;
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
                    <option value>??????</option>
                    <option value="title">?????????</option>
                    <option value="like">?????????</option>
                    <option value="dislike">????????????</option>
                    <option value="update">?????????</option>
                </select>
            </div>
        </>
    );
}
