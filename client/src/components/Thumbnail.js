import Link from 'next/link';
import { useState } from 'react';
export default function Thumbnail({ list }) {
    const post = list;
    console.log(post.id);
    return (
        <>
            {/* <div className="post_list">
                <div className="best_item">
                    <div className="best_item_inner">
                        <div className="best_item_option">
                            <div className="item_overlay"></div>
                        </div>
                        <div className="best_item_header">
                            <Link href={`/post/${post.id}`}>
                                <a className="header_image">
                                    <img className="img_inner" alt={post.title} src={post.post_page[0].img} />
                                </a>
                            </Link>
                            <div className="best_desc">
                                <div className="best_desc_title">
                                    <Link href={`/post/${post.id}`}>
                                        <a className="best_title_font">{post.title}</a>
                                    </Link>
                                </div>
                                <div className="best_desc_text">
                                    <Link href={`/post/${list.id}`}>
                                        <a className="best_text">
                                            <div>{post.post_page[0].content}</div>
                                        </a>
                                    </Link>
                                </div>
                                <div className="best_desc_category">
                                    <a className="best_category">{post.category}</a>
                                </div>
                                <div className="best_desc_user">
                                    <div className="best_desc_userinfo">
                                        <div className="best_author">🐝 글쓴이</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}
