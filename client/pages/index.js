import React, {useEffect, useState} from 'react'
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
          <div className='landing__section__1'>
            first section
          </div>
        </section>
        <section className='landing__section' id="section2">
          <div>
            second section
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
