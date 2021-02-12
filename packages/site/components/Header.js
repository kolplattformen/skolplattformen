import Link from 'next/link'
import React from 'react'
import headerLogo from '../assets/img/logo.png'
import NavLinks from './NavLinks'
import classnames from 'classnames'

const HeaderHome = () => {
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
    <header className="fixed top-0 left-0 right-0 z-10">
      <div
        className={classnames(
          'bg-white bg-opacity-0 duration-200 transition-colors',
          {
            'shadow-md fade-in-down bg-opacity-100': sticky,
          }
        )}
      >
        <div className="sticky flex items-center justify-between max-w-6xl py-4 mx-auto">
          <Link href="/">
            <a>
              <img className="h-24" src={headerLogo} alt="Skolplattformen" />
            </a>
          </Link>
          <nav>
            <div className="header-menu">
              <div id="menu-button" className="block">
                <i className="fa fa-bars"></i>
              </div>
              <NavLinks />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default HeaderHome
