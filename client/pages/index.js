import React, {useEffect, useState} from 'react'
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

  const handleScroll = () => {
    if(currentSection===sectionCount){

    }else{
      setCurrentSection(currentSection+1);
    }
    console.log(currentSection)
  }

  useEffect( () => {
    window.addEventListener('scroll',handleScroll);
    
    // const sections = document.querySelectorAll('section');
    // const firstSection = sections[0].offsetTop;
    // const secondSection = sections[1].offsetTop;
    return () => window.removeEventListener('scroll', handleScroll)
  })


  return (
    <div className='landing'>
      <Header />
      <div className='landing__sections'>
        <section className='landing__section' id="section1">
          <div className='landing__section1__text'>
            <h1 className='landing__section1__tittle'>
              Tiny Honey Tip
            </h1>
            <h2 className='landing__section1__p'>
              당신의 작고 소중한 꿀팁을 <br/><br/>공유하고<br/><br/> 새로운 꿀팁을 얻으세요!
            </h2>
          </div>
          <img className='landing__section1__pic' src='./honeycomb.png'alt='honeycomb'/>
          <a href='#section2'>
            <div className='scroll-down'></div>
          </a>
        </section>
        <section className='landing__section' id="section2">
          <div className='landing__section1__text'>
            <h2 className='landing__section1__p'>
              일상에서 꼭 필요한 각종 사소한 꿀팁을 <br/><br/>시간 낭비없이 본론만 얻으세요!
            </h2>
          </div>
          <a href='#section3'>
            <div className='scroll-down'></div>
          </a>
        </section>
        <section className='landing__section' id="section3">
          <div className='landing__section1__text'>
            <h2 className='landing__section1__p'>
              갖고있는 작고 소중한 꿀팁을 템플릿으로 <br/><br/>
              깔끔하게 정리하고 <br/><br/>
              그와 동시에 다른 사람들의 꿀팁을 스크랩하여 저장하고 <br/><br/>
              꿀팁저장소에서 언제 어디서든 <br/><br/>
              필요할 때 다시 꺼내볼 수 있습니다!    
            </h2>
          </div>
          <a href='#section4'>
            <div className='scroll-down'></div>
          </a>
        </section>
        <section className='landing__section' id="section4">
          <div className='landing__section1__text'>
            <h1 className='landing__section1__tittle'>
              Tiny Honey Tip
            </h1>
            <h2 className='landing__section1__p'>
              혹시 알아요? <br/><br/>대박 HoneyTip 기다리고 있을지...!
            </h2>
          </div>
          <Link href='/content'>
            <button className='landing__start-btn'>
              시작하기
            </button>
          </Link>
        </section>
      </div>
      <a className='top-btn' onClick={()=>window.scrollTo(0,0)}>
        <img src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png"/> 
      </a>
      <div className='scroll__down'></div>
      <Footer />
    </div>
  )
}
