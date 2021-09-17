export default function Category({ isClick, clickHandler, categoryHandler }) {
    const categories = ['전체', '건강', '운동', '생활', '동물', '쇼핑', '휴지통'];
    return (
        <>
            {isClick ? (
                <nav className="nav_area">
                    <div className="nav_container">
                        <button className="nav_btn" onClick={clickHandler}>
                            <h1>카테고리</h1>
                            <section>
                                {categories.map((cate) => {
                                    return (
                                        <div onClick={(e) => categoryHandler(e)} key={cate}>
                                            <button className="nav_items" onClick={(e) => categoryHandler(e)}>
                                                <div className="category">
                                                    <img className="cate_icon" alt={cate} src="" />
                                                    {cate}
                                                </div>
                                            </button>
                                        </div>
                                    );
                                })}
                            </section>
                        </button>
                    </div>
                </nav>
            ) : (
                <nav className="nav_area">
                    <div className="nav_container">
                        <button className="nav_btn" onClick={(e) => clickHandler(e)}>
                            <h1>카테고리</h1>
                        </button>
                    </div>
                </nav>
            )}
        </>
    );
}
