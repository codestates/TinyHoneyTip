import Select from '../components/Select';
import Search from '../components/Search';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Best({ postList, setPostList }) {
    const [curList, setCurList] = useState([]);
    // let data = postList.sort(function (a, b) {
    //     let likeA = a.like.length;
    //     let likeB = b.like.length;
    //     if (likeA < likeB) return -1;
    //     if (likeA > likeB) return 1;
    //     return 0;
    // });
    // 인기순 정렬 (좋아요 수가 다 같아서 모르겠음 되는지)

    let data = postList.sort(function (a, b) {
        let cateA = a.category.toUpperCase();
        let cateB = b.category.toUpperCase();
        if (cateA < cateB) return -1;
        if (cateA > cateB) return 1;
        return 0;
    });

    console.log(curList);
    useEffect(() => {
        setCurList(data);
    });
    // 카테고리 이름순 정렬 작동함.
    return (
        <>
            <div className="best_container">
                <div className="best_title_container"></div>
                <div className="best_list_container">
                    <div className="best_list_top">
                        <div className="best_list_title">🐝 BEST 꿀팁</div>
                        <div className="best_list">
                            {postList?.slice(0, 5).map((best) => {
                                return (
                                    <div className="best_item" key={best.id}>
                                        <div className="best_item_inner">
                                            <div className="best_item_option">
                                                <div className="item_overlay"></div>
                                            </div>
                                            <div className="best_item_header">
                                                <Link href={`/post/${best?.id}`}>
                                                    <a className="header_image">
                                                        <img
                                                            className="img_inner"
                                                            alt={best?.title}
                                                            src={best?.post_page[0][0].img}
                                                        />
                                                    </a>
                                                </Link>
                                                <div className="best_desc">
                                                    <div className="best_desc_title">
                                                        <Link href={`/post/${best?.id}`}>
                                                            <a className="best_title_font">{best?.title}</a>
                                                        </Link>
                                                    </div>
                                                    <div className="best_desc_text">
                                                        <Link href={`/post/${best?.id}`}>
                                                            <a className="best_text">
                                                                <div>{best?.post_page[0][0].content}</div>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="best_desc_category">
                                                        <a className="best_category">{best?.category}</a>
                                                    </div>
                                                    <div className="best_desc_user">
                                                        <div className="best_desc_userinfo">
                                                            <div className="best_author">❤️ {best?.like.length}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="search_line">
                            <Select postList={postList} setPostList={setPostList} />
                            <Search postList={postList} setPostList={setPostList} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
