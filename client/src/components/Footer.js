
export default function Footer() {
    return(
        <div className='footer'>
            <div className = 'footer__logo-box'>
                <div className = 'footer__logo'>
                    Tiny Honey Tip
                </div>
                <div className = 'footer__logo-copyright'>
                    Honeycomber @2021
                </div>
            </div>
            <div className = 'footer__boxes'>
                <div className = 'footer__box'>
                    <h1 className = 'footer__box__title'>
                        ABOUT
                    </h1>
                    <div className = 'footer__box__content'>
                        <a className = 'footer__box__content__el' href='https://github.com/codestates/TinyHoneyTip'>
                            Repository
                        </a>
                        <a className = 'footer__box__content__el' href='https://github.com/codestates/TinyHoneyTip/wiki'>
                            Wiki
                        </a>
                    </div>
                </div>
                <div className = 'footer__box'>
                    <h1 className = 'footer__box__title'>
                        TEAM
                    </h1>
                    <div className = 'footer__box__content'>
                        <div className = 'footer__box__content__row'>
                            <a className = 'footer__box__content__el' href='https://github.com/baemki'>
                                배민기
                            </a>
                            <a  className = 'footer__box__content__el' href='https://github.com/peb4010'>
                                박은빈
                            </a>
                        </div>
                        <div className = 'footer__box__content__row'>
                            <a  className = 'footer__box__content__el' href='https://github.com/SangminSuk'>
                                석상민
                            </a>
                            <a  className = 'footer__box__content__el' href='https://github.com/wktaylorla'>
                                라혜린
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}