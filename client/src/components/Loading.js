import React from 'react';
import styles from '../../styles/Loading.module.css';

export default function Loading() {
    return (
        <div className={styles.loading_back}>
            <div className={styles.loading_Container}>
                <section className={styles.loading}>
                    Now loading
                    <span className={styles.loading__author}> 위이이잉 🐝, 꿀팁을 찾아 헤메는 중 🍯</span>
                    <div className={styles.spinner}>
                        <div className={styles.petal} id={styles.p1}></div>
                        <div className={styles.petal} id={styles.p2}></div>
                        <div className={styles.petal} id={styles.p3}></div>
                        <div className={styles.petal} id={styles.p4}></div>
                    </div>
                </section>
            </div>
        </div>
    );
}
