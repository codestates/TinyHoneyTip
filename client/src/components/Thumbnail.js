import Search from './Search';
import Link from 'next/link';
export default function Thumbnail({ postList, list }) {
    return (
        <>
            <div className="post_list_title">🐝 꿀팁 둘러보기</div>
            <Search postList={postList} />
            <div className="post_list">
                {postList.map((best) => {
                    return (
                        <div className="best_item">
                            <div className="best_item_inner">
                                <div className="best_item_option">
                                    <div className="item_overlay"></div>
                                </div>
                                <div className="best_item_header">
                                    <Link href={`/post/${best.id}`}>
                                        <a className="header_image">
                                            <img className="img_inner" alt={best.title} src={best.post_page[0].img} />
                                        </a>
                                    </Link>
                                    <div className="best_desc">
                                        <div className="best_desc_title">
                                            <Link href={`/post/${best.id}`}>
                                                <a className="best_title_font">{best.title}</a>
                                            </Link>
                                        </div>
                                        <div className="best_desc_text">
                                            <Link href={`/post/${best.id}`}>
                                                <a className="best_text">
                                                    <div>{best.post_page[0].content}</div>
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="best_desc_category">
                                            <a className="best_category">{best.category}</a>
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
                    );
                })}
            </div>
        </>
    );
}
