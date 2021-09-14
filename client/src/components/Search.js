import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Search.module.css';
import Thumbnail from './Thumbnail';

export default function Search({ postList }) {
    console.log(postList, 'search');

    const [searchKeyword, SetSearchKeyword] = useState('');

    const inputHandler = (e) => {
        SetSearchKeyword(([e.target.name] = e.target.value));
        console.log(searchKeyword);
    };
    const filteredContent = (data) => {
        data = data.filter((el) => {
            return el.title.indexOf(searchKeyword) > -1;
        });
        return data.map((list) => {
            return (
                <>
                    <Thumbnail list={list} />
                </>
            );
        });
    };
    return (
        <>
            <div className="post_list_title">🐝 꿀팁 둘러보기</div>
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
