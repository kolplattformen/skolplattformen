import footerLogo from '../assets/img/logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top pt-120 pb-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget">
                <div className="footer-logo">
                  <img src={footerLogo} alt="" />
                </div>
                <p>
                  Skolplattformen utvecklas av föräldrar för föräldrar. Vill du
                  hjälpa till? Kom till vår{' '}
                  <a href="https://github.com/kolplattformen">Github</a>, där
                  finns all källkod och även uppgifter att ta tag i, vi behöver
                  hjälp med allt från illustrationer, UX, design och
                  programmering. Vi har även en Discord där vi hjälps åt.
                </p>
                <p>
                  <a href="mailto:info@skolplattformen.org">
                    info@skolplattformen.org
                  </a>
                </p>
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
                        <i className="fa fa-twitter"></i>
                      </span>
                      <a href="https://twitter.com/@landgren">
                        Christian Landgren
                      </a>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-twitter"></i>
                      </span>
                      <a href="https://twitter.com/@erikhellman">
                        Erik Hellman
                      </a>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-twitter"></i>
                      </span>
                      <a href="https://twitter.com/@johanobrink">
                        Johan Öbrink
                      </a>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-twitter"></i>
                      </span>
                      <a href="https://twitter.com/@oppnaskolplatt">
                        Öppna Skolplattformen
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget">
                <div className="widget-header">
                  <h5>Länkar</h5>
                </div>
              </div>

              <div className="widget-body">
                <div className="extra-link">
                  <div className="link-left">
                    <ul>
                      <li>
                        <a href="/integritet">Integritetspolicy</a>
                      </li>
                      <li>
                        <a href="/qa">Frågor och svar</a>
                      </li>
                    </ul>
                  </div>
                  <div className="link-right"></div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget">
                <div className="widget-body">
                  <div className="twitter-post-inner">
                    <div className="footer-post-details">
                      @iteam1337 Digitalisering på riktigt. <br />
                      <a href="https://iteam.se">https://iteam.se</a>
                    </div>
                    <div className="twitter-post">
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
          <p>© copyright 2021 by Not free beer HB</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
