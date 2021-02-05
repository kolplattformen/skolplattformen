import React from "react";
import NavLinks from "./NavLinks";

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
            Skolplattformen.org är en öppen programvara som byggs av frustrerade föräldrar. Hjälp till du också. Kontakta oss nedan:
          </p>
          <p>
            <a href="mailto:info@skolplattformen.org">info@skolplattformen.org</a> <br />
            <a href="tel:+46707755831">+46 70 775 58 31</a>
          </p>
          <div className="side-menu__social">
            <a href="#">
              <i className="fa fa-facebook-square"></i>
            </a>
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa fa-pinterest-p"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
