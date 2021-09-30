import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Best({ bestList }) {
    return (
        <>
            <div className="best_container">
                <div className="best_title_container"></div>
                <div className="best_list_container">
                    <div className="best_list_top">
                        <div className="best_list_title">🐝 BEST 꿀팁</div>
                        <div className="best_list">
                            {bestList?.slice(0, 5).map((best) => {
                                return (
                                    <div className="best_item" key={best.id}>
                                        <div className="best_item_inner">
                                            <div className="best_item_header">
                                                <Link href={`/post/${best?.id}`}>
                                                    <div className="header_image">
                                                        <div className="img_inner">
                                                            <Image
                                                                alt={best?.title}
                                                                layout="fill"
                                                                src={best?.post_page[0]?.img}
                                                            />
                                                        </div>
                                                    </div>
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
                                                                <div>{best?.post_page[0]?.content}</div>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="best_desc_category">
                                                        <a className="best_category">{best?.category}</a>
                                                    </div>
                                                    <div className="best_desc_user">
                                                        <div className="best_desc_userinfo">
                                                            <div className="best_author">❤️ {best?.like?.length}</div>
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
        </>
    );
}
