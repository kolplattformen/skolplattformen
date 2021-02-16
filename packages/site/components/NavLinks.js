import NavLink from 'next/link'
import { useRouter } from 'next/router'
import { Link as ScrollLink } from 'react-scroll'
import { pageview } from './gtag'

const NavLinks = ({ onClick }) => {
  const { pathname } = useRouter()

  const path = (href) => {
    const hashIndex = href.indexOf('#')
    if (hashIndex < 0) return href
    return href.substring(0, hashIndex)
  }

  const Link = ({ href, to, children }) =>
    path(href) === pathname ? (
      <ScrollLink
        activeClass="current"
        to={to}
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onClick={() => {
          pageview(href)
          onClick?.()
        }}
      >
        <a href={href}>{children}</a>
      </ScrollLink>
    ) : (
      <NavLink href={href}>
        <a>{children}</a>
      </NavLink>
    )

  return (
    <ul className="flex flex-col text-xl text-gray-800 md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 md:text-base">
      <li>
        <Link to="wrapper" href="/#">
          Hem
        </Link>
      </li>
      <li>
        <Link to="funktioner" href="/#funktioner">
          Funktioner
        </Link>
      </li>
      <li>
        <Link to="screenshots" href="/#screenshots">
          Screenshots
        </Link>
      </li>
      <li>
        <Link to="vad-kostar-det" href="/#vad-kostar-det">
          Vad kostar det?
        </Link>
      </li>
    </ul>
  )
}

export default NavLinks
