import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import shape1 from '../assets/img/banner/shaps1.png'
import shape2 from '../assets/img/banner/shaps2.png'
import shape3 from '../assets/img/banner/shaps3.png'
import shape4 from '../assets/img/banner/shaps4.png'
import shape5 from '../assets/img/banner/shaps5.png'
import shape6 from '../assets/img/banner/shaps6.png'
import shape7 from '../assets/img/banner/shaps7.png'

import bannerMoc from '../assets/img/banner/mockup.png'

const Banner = () => {
  return (
    <div className="banner-area-inner">
      <div className={`banner-inner-area banner-area1`}>
        <Container>
          <Row className="align-items-center">
            <Col md={8} lg={6} xl={5}>
              <div className="banner-text-inner">
                <div className="banner-shape-wrap">
                  <div className="banner-shape-inner">
                    <img
                      src={shape1}
                      alt=""
                      className="shape shape1 rotate3d"
                    />
                    <img
                      src={shape2}
                      alt=""
                      className="shape shape2 rotate2d"
                    />
                    <img
                      src={shape3}
                      alt=""
                      className="shape shape3 rotate-2d"
                    />
                    <img
                      src={shape4}
                      alt=""
                      className="shape shape4 rotate3d"
                    />
                    <img
                      src={shape5}
                      alt=""
                      className="shape shape5 rotate2d"
                    />
                    <img
                      src={shape6}
                      alt=""
                      className="shape shape6 rotate-2d"
                    />
                    <img
                      src={shape7}
                      alt=""
                      className="shape shape7 rotate3d"
                    />
                  </div>
                </div>

                <h1>Öppna Skolplattformen</h1>
                <p>
                  Oavsett om du har tre eller sju barn - det är mycket att hålla
                  reda på. Stövlarna. Frånvaroanmälan nummer 17 i februari. Vad
                  vikarien heter den här veckan. En dåligt fungerande
                  Skolplattform som äter tid och ork? Det finns inte plats för
                  det. Så vi har byggt en bättre. Med all information du behöver
                  som förälder. Snabbare och framförallt - mycket mindre
                  krångel.
                </p>
                <p>
                  <b>
                    Appen är klar och kommer att dyka upp på App Store och
                    Google Play Store vilken dag som helst.
                  </b>
                </p>
                <p>
                  <a href="#" className="btn">
                    App Store
                  </a>
                  <a href="#" className="btn">
                    Google Play Store
                  </a>
                </p>
                <p>
                  <a href="privacy" className="btn">
                    Integritetspolicy
                  </a>
                </p>
              </div>
            </Col>
            <Col md={4} lg={5} className="  offset-lg-1  offse-xl-2">
              <div className="banner-image">
                <img src={bannerMoc} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Banner
