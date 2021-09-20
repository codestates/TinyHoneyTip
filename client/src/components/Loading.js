import React from 'react';
import styles from '../../styles/Loading.module.css';

export default function Loading() {
    return (
        <div className={styles.loading_Container}>
            <img src="../../public/honeycomb.png" />
            <div>Loading...</div>
        </div>
    );
}
