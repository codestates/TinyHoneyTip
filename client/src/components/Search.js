import { useState } from 'react';
import styles from '../../styles/Search.module.css';

export default function Search({ inputHandler }) {
    return (
        <>
            <div className={styles.search_box}>
                <input
                    type="text"
                    className={styles.search_txt}
                    name="input"
                    onChange={inputHandler}
                    placeholder="검색어를 입력하세요"
                />
                <svg className={styles.search_icon} viewBox="0 0 20 20" fill="none">
                    <path
                        d="M12.3243 4.98201C14.3159 6.97369 14.3159 10.2028 12.3243 12.1945C10.3326 14.1862 7.10345 14.1862 5.11177 12.1945C3.1201 10.2028 3.1201 6.97369 5.11177 4.98201C7.10345 2.99034 10.3326 2.99034 12.3243 4.98201ZM14.8612 12.8929C16.9167 9.96687 16.6367 5.90038 14.0213 3.28496C11.0924 0.356024 6.34365 0.356024 3.41472 3.28496C0.485785 6.21389 0.485785 10.9626 3.41472 13.8916C6.07942 16.5563 10.2504 16.7967 13.1869 14.6127L17.8336 19.2595C18.3022 19.7281 19.062 19.7281 19.5307 19.2595C19.9993 18.7908 19.9993 18.031 19.5307 17.5624L14.8612 12.8929Z"
                        fill="rgba(244, 193, 65, 0.8)"></path>
                </svg>
            </div>
        </>
    );
}
