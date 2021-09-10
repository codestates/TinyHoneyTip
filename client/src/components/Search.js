import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Search.module.css';

export default function Search({ postList }) {
    const [searchKeyword, SetSearchKeyword] = useState('');

    const inputHandler = (e) => {
        SetSearchKeyword(([e.target.name] = e.target.value));
        console.log(searchKeyword);
    };
    const filteredContent = (data) => {
        data = data.filter((el) => {
            return el.post.title.indexOf(searchKeyword) > -1;
        });
        return data.map((list) => {
            return (
                <li>
                    <Link href={`/post/${list.id}`}>
                        <div className={styles.postList_container}>
                            <h1>썸네일 타이틀</h1>
                            <img>썸네일 이미지</img>
                        </div>
                    </Link>
                </li>
            );
        });
    };
    return (
        <>
            <div className={styles.search_container}>
                <input
                    className={styles.search_input}
                    placeholder="검색어를 입력하세요"
                    name="searchKeyword"
                    onChange={inputHandler}
                    value={searchKeyword}
                />
            </div>
            <div>
                {filteredContent(postList).length !== 0 ? (
                    <div>{filteredContent(postList)}</div>
                ) : (
                    '검색 결과가 없습니다.'
                )}
            </div>
        </>
    );
}
