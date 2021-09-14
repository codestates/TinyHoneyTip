import React, { useState } from 'react';
import styles from '../../styles/Select.module.css';

export default function Select({ postList }) {
    const [selected, setSelected] = useState('');
    const changeSelectOptionHandler = (e) => {
        setSelected(e.target.value);
    };

    const sortedResult = postList.map((el) => {
        if (selected === '0') {
            return el.sort((a, b) => a.category > b.category);
            console.log(el);
        }
        if (selected === '1') {
            return el.sort((a, b) => a.like > b.like);
            console.log(el);
        }
    });
    return (
        <>
            <div>
                <select onChange={changeSelectOptionHandler}>
                    <option value="-1"> 선택</option>
                    <option value="0">최신순</option>
                    <option value="1">인기순</option>
                </select>
            </div>
        </>
    );
}
