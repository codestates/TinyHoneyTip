import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Search.module.css';
import Thumbnail from './Thumbnail';
import Select from './Select';

export default function Search({ postList }) {
    const [searchKeyword, SetSearchKeyword] = useState('');

    const inputHandler = (e) => {
        SetSearchKeyword(([e.target.name] = e.target.value));
    };
    const filteredContent = (data) => {
        data = data.filter((el) => {
            return el.title.indexOf(searchKeyword) > -1;
        });
        return data.map((list) => {
            return <Thumbnail list={list} key={list.id} />;
        });
    };
    return (
        <>
            <div className={styles.post_list_title}>🐝 꿀팁 둘러보기</div>
            <div className={styles.search_container}>
                <input
                    className={styles.search_input}
                    placeholder="검색어를 입력하세요"
                    name="searchKeyword"
                    onChange={inputHandler}
                    value={searchKeyword}
                />
                <Select postList={postList} />
            </div>
            <div>
                {filteredContent(postList)?.length !== 0 ? (
                    <div className={styles.post_list}>{filteredContent(postList)}</div>
                ) : (
                    '검색 결과가 없습니다.'
                )}
            </div>
        </>
    );
}
