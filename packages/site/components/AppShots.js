import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Pagination, Autoplay])

import SectionTitle from './SectionTitle'

import img1 from '../assets/img/feature/app-img.png'
import img2 from '../assets/img/feature/app-img2.png'
import img3 from '../assets/img/feature/app-img3.png'
import img4 from '../assets/img/feature/app-img4.png'
import img5 from '../assets/img/feature/app-img5.png'

const AppShots = () => {
  const swiperParams = {
    speed: 1000,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '#appshot-paginations',
      type: 'bullets',
      clickable: 'true',
    },
    slidesPerView: 5,
    // Responsive breakpoints
    breakpoints: {
      0: {
        slidesPerGroup: 2,
        slidesPerView: 2,
      },
      767: {
        slidesPerGroup: 3,
        slidesPerView: 3,
      },
      991: {
        slidesPerGroup: 2,
        slidesPerView: 3,
      },
      1499: {
        slidesPerGroup: 5,
        slidesPerView: 5,
      },
    },
  }
  return (
    <section className="pt-120 pb-155 app-shot-one" id="app">
      <Container>
        <Row className="justify-content-center">
          <Col md={12} lg={8}>
            <SectionTitle
              title="Så här ser appen ut"
              text="Alla fina illustrationer är gjorda av illustratören och läraren Karin Nygårds. Texterna är påhittade och nyheterna är tagna från andra källor för att skydda personuppgifter."
            />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <div className="app-shot-one__carousel">
          <Swiper className="app-carousel" {...swiperParams}>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img1} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img2} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img3} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img4} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img5} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img1} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img2} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img3} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img4} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img5} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img1} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img2} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img3} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img4} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img5} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img1} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img2} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img3} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img4} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="single-app-image">
                <img src={img5} alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
          <div
            id="appshot-paginations"
            className="swiper-pagination d-flex justify-content-center align-items-center"
          />
        </div>
      </Container>
    </section>
  )
}

export default AppShots
