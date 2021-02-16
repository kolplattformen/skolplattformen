import NavLinks from './NavLinks'
import Link from './Link'

const MobileMenu = () => {
  return (
    <div className="side-menu__block">
      <div className="side-menu__block-overlay custom-cursor__overlay">
        <div className="cursor"></div>
        <div className="cursor-follower"></div>
      </div>
      <div className="side-menu__block-inner ">
        <div className="side-menu__top justify-content-end">
          <a href="#" className="side-menu__toggler side-menu__close-btn">
            <i className="fa fa-times"></i>
          </a>
        </div>

        <nav className="mobile-nav__container">
          <NavLinks />
        </nav>
        <div className="side-menu__sep"></div>
        <div className="side-menu__content">
          <p>
            Skolplattformen.org är en öppen programvara som byggs av frustrerade
            föräldrar. Hjälp till du också. Kontakta oss nedan:
          </p>
          <p>
            <Link href="mailto:info@skolplattformen.org">
              info@skolplattformen.org
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
