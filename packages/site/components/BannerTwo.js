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

const BannerTwo = () => {
  return (
    <div className="banner-area-inner">
      <div className="banner-inner-area banner-area1 banner2">
        <Container>
          <Row className="align-items-center">
            <Col md={8} lg={6} xl={5}>
              <div className="banner-text-inner">
                <h1>Välkommen till den öppna skolplattformen</h1>
                <p>
                  Vi tröttnade på att vänta på att Skolplattformen skulle bli
                  användbar så vi tog saken i egna händer och byggde en egen.
                  Appen hämtar samma information som på den gamla
                  Skolplattformen men visar den på ett snabbare och lättare
                  sätt.
                </p>
                <a href="#" className="btn">
                  App Store
                </a>
                <a href="#" className="btn">
                  Se Exempel
                </a>
              </div>
            </Col>
            <div className="col-lg-5 offset-lg-1 col-md-4 offse-xl-2">
              <div className="banner-shape-wrap">
                <div className="banner-shape-inner">
                  <img src={shape1} alt="" className="shape shape1 rotate3d" />
                  <img src={shape2} alt="" className="shape shape2 rotate2d" />
                  <img src={shape3} alt="" className="shape shape3 rotate-2d" />
                  <img src={shape4} alt="" className="shape shape4 rotate3d" />
                  <img src={shape5} alt="" className="shape shape5 rotate2d" />
                  <img src={shape6} alt="" className="shape shape6 rotate-2d" />
                  <img src={shape7} alt="" className="shape shape7 rotate3d" />
                </div>
              </div>
              <div className="banner-image">
                <img src={bannerMoc} alt="" />
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default BannerTwo
