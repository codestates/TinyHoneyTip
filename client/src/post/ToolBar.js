import React, { useState } from 'react';

export default function ToolBar () {
    const [currentEditPage, setCurrentEditPage] = useState(1);
    // current page에 class줘서 표시되도록하기.

    return(
        <div className='post__toolbar'>
            ToolBar
            <div className='post__toolbar__label'>
                {/* map 으로 사용 section만큼 라벨 생성 */}
                {/* 페이지 삭제시 slice해서 뒷페이지 내용이 앞으로 당겨지게 해야됨 */}
                <button>
                    <h1>n page</h1>
                </button>
                {/* 5페이지되면 표시 안되게 */}
                <button>
                    페이지 추가
                </button>
            </div>
            <div className='post__toolbar__edit-section'>
                {/* map으로 페이지만큼 생성 */}
                <section className='post__toolBar__section'>
                    <textarea />
                    <label 
                        
                    >
                        이미지 업로드
                        <input
                            type='file'
                            accept='image/jpg, image/png, image/jpeg'
                            name='image'
                        />
                    </label>
                    {/* 페이지 삭제시 이전페이지 section으로 넘어가도록. */}
                    {/* 총 페이지가 1일경우 삭제 안되도록 */}
                    <button>
                        페이지 삭제
                    </button>
                    <button>
                        업로드
                    </button>
                </section>
            </div>
        </div>
    )
}