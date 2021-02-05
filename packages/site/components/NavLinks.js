import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'

const NavLinks = () => {
  // const [dropdownStatus, setDropdownStatus] = useState(false);
  const handleDropdownStatus = (e) => {
    // setDropdownStatus(!dropdownStatus);
    let clickedItem = e.currentTarget.parentNode
    clickedItem.querySelector('.dropdown-list').classList.toggle('show')
  }
  return (
    <ul className="main-nav__navigation-box">
      <li className="dropdown">
        <Link href="/">
          <>
            <a>Hem</a>
            <i className="fa fa-angle-down" onClick={handleDropdownStatus}></i>
          </>
        </Link>
        <ul className="dropdown-list">
          <li>
            <Link href="/">
              <a>Home One</a>
            </Link>
          </li>
          <li>
            <Link href="/index-2">
              <a>Home Two</a>
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <ScrollLink
          activeClass="current"
          to="features"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Funktioner
        </ScrollLink>
      </li>

      <li>
        <ScrollLink
          activeClass="current"
          to="app"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Screenshots
        </ScrollLink>
      </li>
      <li>
        <ScrollLink
          activeClass="current"
          to="pricing"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          Vad kostar det?
        </ScrollLink>
      </li>
    </ul>
  )
}

export default NavLinks
