import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

export default function Home() {
  // 스크롤 제거
  // window.addEventListener("wheel", function(e){
  //   e.preventDefault();
  // },{passive : false});

  // window.addEventListener('scroll', ()=>{
  //   console.log('scrolled')
  // })

  // section 개수에 맞게 수정
  const sectionCount = 5;
  const [currentSection, setCurrentSection] = useState(1);

  const sectionHandler = () => {

  }

  // const handleScroll = () => {
  //   if (currentSection === sectionCount) {

  //   } else {
  //     setCurrentSection(currentSection + 1);
  //   }
  //   console.log(currentSection)
  // }

  // const throttleUsingRaf = (cb) => {
  //   var rAfTimeout = 300;

  //   return function () {
  //     if (rAfTimeout) {
  //       window.cancelAnimationFrame(rAfTimeout);
  //     }
  //     rAfTimeout = window.requestAnimationFrame(function () {
  //       cb();
  //     })
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', throttleUsingRaf(handleScroll));

  //   // const sections = document.querySelectorAll('section');
  //   // const firstSection = sections[0].offsetTop;
  //   // const secondSection = sections[1].offsetTop;
  //   return () => window.removeEventListener('scroll', throttleUsingRaf(handleScroll))
  // })


  return (
    <div className='landing'>
      <Header />
      <div className='landing__sections'>
        <section className='landing__section' id="section1">
          {/* 첫 번째 섹션에 바로 시작하기 버튼 추가? */}
          <div className='landing__section1__text'>
            <h1 className='landing__section1__tittle'>
              Tiny Honey Tip
            </h1>
            <h2 className='landing__section1__p'>
              당신의 작고 소중한 꿀팁을 <br /><br />공유하고<br /><br /> 새로운 꿀팁을 얻으세요!
            </h2>
          </div>
          <img className='landing__section1__pic' src='./honeycomb.png' alt='honeycomb' />
          <a onClick={() => {
            let nextSection = document.getElementById('section2').offsetTop;
            console.log(nextSection)
            window.scrollTo(0, nextSection)
          }}>
            <div className='scroll-down'></div>
          </a>
        </section>
        <section className='landing__section' id="section2">
          <div className='landing__section1__text'>
            <h2 className='landing__section1__p'>
              일상에서 꼭 필요한 각종 사소한 꿀팁을 <br /><br />시간 낭비없이 본론만 얻으세요!
              {/* 여긴 자동으로 넘어가는 이미지 슬라이드 */}
            </h2>
            <div className='landing__section2__slide'>
              {/* 이미지 개수에 따라 style 수정 */}
              <ul style={{ width: `calc(100% * 4)` }}>
                <li style={{ width: `calc(100% / 4)` }}>
                  <img src=''></img>
                </li>
                <li style={{ width: `calc(100% / 4)` }}>
                  <img src=''></img>
                </li>
                <li style={{ width: `calc(100% / 4)` }}>
                  <img src=''></img>
                </li>
                <li style={{ width: `calc(100% / 4)` }}>
                  <img src=''></img>
                </li>
              </ul>
            </div>
          </div>
          <a onClick={() => {
            let nextSection = document.getElementById('section3').offsetTop;
            console.log(nextSection)
            window.scrollTo(0, nextSection)
          }}>
            <div className='scroll-down'></div>
          </a>
        </section>
        <section className='landing__section' id="section3">
          <div className='landing__section1__text'>
            <h2 className='landing__section1__p'>
              뭐시기
              {/* 갖고있는 작고 소중한 꿀팁을 템플릿으로 <br /><br />
              깔끔하게 정리하고 <br /><br />
              그와 동시에 다른 사람들의 꿀팁을 스크랩하여 저장하고 <br /><br />
              꿀팁저장소에서 언제 어디서든 <br /><br />
              필요할 때 다시 꺼내볼 수 있습니다! */}
              {/* 여긴 수동으로 넘어가는 gif 슬라이드 */}
            </h2>
            <div className='landing__section3__slide'>
              <input type='radio' name='section3-pos' id='section-pos1' />
              <input type='radio' name='section3-pos' id='section-pos2' />
              <input type='radio' name='section3-pos' id='section-pos3' />
              <input type='radio' name='section3-pos' id='section-pos4' />
              <ul style={{ width: `calc(100% * 4)` }}>
                <li style={{ width: `calc(100% / 4)` }}>
                  <img src=''></img>
                </li>
                <li style={{ width: `calc(100% / 4)` }}>
                  <img src=''></img>
                </li>
                <li style={{ width: `calc(100% / 4)` }}>
                  <img src=''></img>
                </li>
                <li style={{ width: `calc(100% / 4)` }}>
                  <img src=''></img>
                </li>
              </ul>
              <p class='section3__bullet'>
                <label for='section-pos1'>1</label>
                <label for='section-pos2'>2</label>
                <label for='section-pos3'>3</label>
                <label for='section-pos4'>4</label>
              </p>
            </div>
          </div>
          <a onClick={() => {
            let nextSection = document.getElementById('section4').offsetTop;
            console.log(nextSection)
            window.scrollTo(0, nextSection)
          }}>
            <div className='scroll-down'></div>
          </a>
        </section>
        <section className='landing__section' id="section4">
          <div className='landing__section1__text'>
            <h1 className='landing__section1__tittle'>
              Tiny Honey Tip
            </h1>
            <h2 className='landing__section1__p'>
              혹시 알아요? <br /><br />대박 HoneyTip 기다리고 있을지...!
            </h2>
          </div>
          <Link href='/content'>
            <button className='landing__start-btn'>
              시작하기
            </button>
          </Link>
        </section>
      </div>
      <a className='top-btn' onClick={() => window.scrollTo(0, 0)}>
        <img src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png" />
      </a>
      <div className='scroll__down'></div>
      <Footer />
    </div>
  )
}
