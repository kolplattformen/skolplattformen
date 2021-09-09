import NavLink from 'next/link'
import { useRouter } from 'next/router'
import { Link as ScrollLink } from 'react-scroll'
import { pageview } from './gtag'
import { useIntl } from 'react-intl'

interface NavLinksProps {
  onClick?: () => void
}

interface LinkProps {
  href: string
  to: string
}

const NavLinks = ({ onClick }: NavLinksProps) => {
  const { pathname } = useRouter()
  const intl = useIntl()

  const path = (href: string) => {
    const hashIndex = href.indexOf('#')
    if (hashIndex < 0) return href
    return href.substring(0, hashIndex)
  }

  const Link: React.FC<LinkProps> = ({ href, to, children }) =>
    path(href) === pathname ? (
      <ScrollLink
        activeClass="current"
        to={to}
        href={`#${to}`}
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onClick={() => {
          pageview(href)
          onClick?.()
        }}
      >
        {children}
      </ScrollLink>
    ) : (
      <NavLink href={href}>
        <a onClick={() => onClick?.()}>{children}</a>
      </NavLink>
    )

  return (
    <ul className="flex flex-col text-xl text-gray-800 dark:text-white md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 md:text-base">
      <li>
        <Link to="wrapper" href="/#">
          {intl.formatMessage({ id: 'navigation.home' })}
        </Link>
      </li>
      <li>
        <NavLink href="/aktuellt">Aktuellt</NavLink>
      </li>
      <li>
        <Link to="funktioner" href="/#funktioner">
          {intl.formatMessage({ id: 'navigation.functions' })}
        </Link>
      </li>
      <li>
        <Link to="screenshots" href="/#screenshots">
          {intl.formatMessage({ id: 'navigation.screenshots' })}
        </Link>
      </li>
      <li>
        <Link to="vad-kostar-det" href="/#vad-kostar-det">
          {intl.formatMessage({ id: 'navigation.whatdoesitcost' })}
        </Link>
      </li>
    </ul>
  )
}

export default NavLinks
