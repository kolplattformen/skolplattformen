import Link from 'next/link'
import React from 'react'
import headerLogo from '../assets/img/logo.png'
import NavLinks from './NavLinks'

const HeaderHome = (props) => {
  const [sticky, setSticky] = React.useState(false)

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setSticky(true)
    } else if (window.scrollY < 70) {
      setSticky(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    mobileMenu()
    return () => {
      mobileMenu()
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const mobileMenu = () => {
    document
      .querySelector('.side-menu__toggler')
      .addEventListener('click', function (e) {
        document.querySelector('.side-menu__block').classList.toggle('active')
        e.preventDefault()
      })

    //Close Mobile Menu
    let sideMenuCloser = document.querySelectorAll(
      '.side-menu__close-btn, .side-menu__block-overlay'
    )

    sideMenuCloser.forEach((sideMenuCloserBtn) => {
      sideMenuCloserBtn.addEventListener('click', function (e) {
        document.querySelector('.side-menu__block').classList.remove('active')
        e.preventDefault()
      })
    })
  }

  return (
    <header className={`header ${props.extraClassName}`}>
      <div
        className={`main-header ${sticky === true ? 'sticky fadeInDown' : ' '}`}
      >
        <div className="main-menu-wrap">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <img src={headerLogo} alt="Skolplattformen" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-4 col-6 menu-button">
                <div className="menu--inner-area clearfix">
                  <div className="menu-wraper">
                    <nav>
                      <div className="header-menu">
                        <div
                          id="menu-button"
                          className="menu-opened side-menu__toggler"
                        >
                          <i className="fa fa-bars"></i>
                        </div>
                        <NavLinks />
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-5 d-md-block d-none">
                <div className="urgent-call text-right">
                  <a
                    href="#"
                    className="btn"
                    onClick={() =>
                      alert(
                        'Håll ut! Appen kommer snart på App Store och Google Play'
                      )
                    }
                  >
                    Ladda ner
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderHome
