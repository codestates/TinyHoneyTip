import React, { useState } from 'react';
import axios from 'axios';

import Header from "../../src/components/Header"
import Footer from "../../src/components/Footer"
import UploadPostContent from "../../src/post/PostContent"
import ToolBar from "../../src/post/ToolBar"

export default function PostUpload() {

    const [slide, setSlide] = useState([
        { img: '', content: '1st slide' },
        { img: '', content: '2st slide' },
        { img: '', content: '3st slide' },
        { img: '', content: '4st slide' },
        { img: '', content: '5st slide' },
    ])

    console.log(slide)

    const slideTextHandler = (key) => (e) => {
        
    }

    const deleteSlideHandler = (key) => (e) => {
        
    }

    return (
        <div className='post-upload-page'>
            <Header />
            <div className='post-upload-empty'></div>
            <div className='post-upload-container'>
                <UploadPostContent slide={slide}/>
                <ToolBar />
            </div>
            <Footer />
        </div>
    )
}