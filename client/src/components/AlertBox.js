import styles from '../../styles/Alert.module.css';

export default function Alert({ isOk, okHandler, message }) {
    return (
        <>
            {isOk ? (
                <div className={styles.Alert_back}>
                    <div className={styles.Alert_container}>
                        <div className={styles.Alert_box}>{message}</div>
                        <div>
                            <button className={styles.Alert_btn} onClick={okHandler}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
