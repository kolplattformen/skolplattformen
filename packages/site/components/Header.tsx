import Link from 'next/link'
import headerLogo from '../assets/img/logo.png'
import React from 'react'
import NavLinks from './NavLinks'
import classnames from 'classnames'
import Icon from './Icon'

type UseMobileCallback = (ev: MediaQueryListEvent) => any

const useMobile = (cb: UseMobileCallback) => {
  React.useEffect(() => {
    const mobileMql = window.matchMedia('(max-width: 480px)')

    mobileMql.addEventListener?.('change', cb)

    // Safari < 14
    if (mobileMql.addListener) {
      mobileMql.addListener(cb)
    }

    return () => {
      mobileMql.removeEventListener?.('change', cb)

      if (mobileMql.removeListener) {
        mobileMql.removeListener(cb)
      }
    }
  }, [])
}

const HeaderHome = () => {
  const [displayMobileMenu, setDisplayMobileMenu] = React.useState(false)

  useMobile((e) => {
    if (!e.matches) {
      setDisplayMobileMenu(false)
    }
  })

  return (
    <>
      <header>
        <div
          className={classnames(
            'bg-white bg-opacity-0 duration-200 transition-colors sticky z-10'
          )}
        >
          <div className="flex items-center justify-between max-w-6xl px-5 py-4 mx-auto md:px-2">
            <Link href="/">
              <a>
                <img
                  className="h-12 md:h-24"
                  src={headerLogo}
                  alt="Skolplattformen"
                />
              </a>
            </Link>
            <nav className="hidden md:block">
              <NavLinks />
            </nav>
          </div>
        </div>
      </header>
      <button
        aria-label={displayMobileMenu ? 'Stäng meny' : 'Visa meny'}
        className="fixed z-30 block w-16 p-5 text-white bg-gray-900 dark:bg-gray-700 rounded-full md:hidden bottom-5 right-5"
        onClick={() => setDisplayMobileMenu(!displayMobileMenu)}
      >
        {displayMobileMenu ? <Icon.Times /> : <Icon.Menu />}
      </button>
      {displayMobileMenu && (
        <>
          <div
            className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50"
            onClick={() => setDisplayMobileMenu(false)}
          />
          <div className="fixed top-0 bottom-0 left-0 z-20 w-9/12 h-screen p-5 bg-white dark:bg-gray-800">
            <NavLinks onClick={() => setDisplayMobileMenu(false)} />
          </div>
        </>
      )}
    </>
  )
}

export default HeaderHome
