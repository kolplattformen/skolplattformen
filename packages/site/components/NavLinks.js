import Link from 'next/link'
import React from 'react'
import { Link as ScrollLink } from 'react-scroll'

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
      </li>
      <li>
        <ScrollLink
          activeClass="current"
          to="features"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          href="/"
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
          href="/"
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
          href="/"
        >
          Vad kostar det?
        </ScrollLink>
      </li>
    </ul>
  )
}

export default NavLinks
