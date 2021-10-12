export default function Alert({ isOk, okHandler, message }) {
    return (
        <>
            {isOk ? (
                <div className="Alert_back">
                    <div className="Alert_container">
                        <div className="Alert_box">{message}</div>
                        <div>
                            <button className="Alert_btn" onClick={okHandler}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
