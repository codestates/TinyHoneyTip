import { useState } from 'react';

export default function Category({ setPost, init }) {
    const [isClick, setClick] = useState(false);
    const categories = ['🐝 전체', '🎬 취미', '🍗 음식', '💪 건강', '💡 생활', '🐾 동물', '💸 쇼핑', '⭐️ 기타'];

    const categoryHandler = (e) => {
        if (e.target.innerText.indexOf('전체') > -1) {
            setPost(init);
            return;
        } else {
            const filteredData = init?.filter((el) => {
                return e.target.innerText.indexOf(el?.category) > -1;
            });
            setPost(filteredData);
        }
    };

    const clickHandler = () => {
        setClick(!isClick);
    };

    return (
        <>
            {isClick ? (
                <button className="nav_btn" onClick={clickHandler}>
                    <h1>카테고리</h1>
                    <section>
                        {categories.map((cate) => {
                            return (
                                <div onClick={(e) => categoryHandler(e)} key={cate}>
                                    <button className="nav_items" onClick={(e) => categoryHandler(e)}>
                                        <div className="category">{cate}</div>
                                    </button>
                                </div>
                            );
                        })}
                    </section>
                </button>
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
