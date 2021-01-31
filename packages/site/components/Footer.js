import React from "react";
import footerBg from "../assets/img/footer-bg.png";
import footerLogo from "../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerbg">
        <img src={footerBg} className="svg" alt="" />
      </div>
      <div className="footer-top pt-120 pb-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget">
                <div className="footer-logo">
                  <a href="index.html">
                    <img src={footerLogo} alt="" />
                  </a>
                </div>
                <p>
                  Skolplattformen utvecklas av föräldrar för föräldrar. Vill du hjälpa till? Kom till vår <a href="https://github.com/kolplattformen">Github</a>, där finns all källkod och även uppgifter att ta tag i, vi behöver hjälp med allt från illustrationer, UX, Design och programmering. Vi har även en Discord där vi hjälps åt.
                  
                </p>

                <div className="footer-social-area">
                  <ul className="social-icons social-icons-light nav">
                    <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget">
                <div className="widget-header">
                  <h5>Vilka är vi?</h5>
                </div>

                <div className="widget-body">
                  <ul className="address-list">
                    <li>
                      <span>
                        <i className="fa  fa-twitter"></i>
                      </span>
                      <a href="https://twitter.com/@landgren">Christian Landgren</a>
                    </li>
                    <li>
                      <span>
                        <i className="fa  fa-twitter"></i>
                      </span>
                      <a href="https://twitter.com/@erikhellman">Erik Hellman</a>
                    </li>
                    <li>
                      <span>
                        <i className="fa  fa-twitter"></i>
                      </span>
                      <a href="https://twitter.com/@johanobrink">Johan Öbrink</a>
                    </li>
                   
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget">
                <div className="widget-header">
                  <h5>Extra Links</h5>
                </div>
              </div>

              <div className="widget-body">
                <div className="extra-link">
                  <div className="link-left">
                    <ul>
                      <li>
                        <a href="#">About</a>
                      </li>
                      <li>
                        <a href="#">Our Team</a>
                      </li>
                      <li>
                        <a href="#">Features</a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                      <li>
                        <a href="#">How It Works</a>
                      </li>
                    </ul>
                  </div>
                  <div className="link-right">
                    <ul>
                      <li>
                        <a href="#">Help</a>
                      </li>
                      <li>
                        <a href="#">Support</a>
                      </li>
                      <li>
                        <a href="#">Clients</a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget">
                <div className="widget-body">
                  <div className="twetter-post-inner">
                    <div className="footer-post-details">
                      @iteam1337 Digitalisering på riktigt. <br />
                      <a href="https://iteam.se">https://iteam.se</a>
                    </div>
                    <div className="twetter-post">
                      <span>
                        <i className="fa fa-twitter"></i>
                      </span>
                      Iteam, en sponsor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-text text-center">
          <p>© copyright 2019 by Layerdrops.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
