import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Pagination, Autoplay])

import SectionTitle from './SectionTitle'
import FeatureCard from './FeatureCard'

import img1 from '../assets/img/icons/project-management.svg'
import img2 from '../assets/img/icons/solution.svg'
import img3 from '../assets/img/icons/planning.svg'
import img4 from '../assets/img/icons/goal.svg'

const FEATURES_DATA = [
  {
    title: 'Öppen källkod',
    text: 'Har du egna förslag på förbättringar? Du kan hjälpa till.',
    image: img1,
  },
  {
    title: 'Bygger på ny teknik',
    text:
      'Till skillnad från den gamla skolplattformen så bygger den öppna på senaste tekniken.',
    image: img2,
  },
  {
    title: 'Det här är bara början',
    text:
      'Vi hoppas med denna app inspirera till fler initiativ i hela den offentliga digitaliseringen.',
    image: img4,
  },
  {
    title: 'Kan byggas ut till fler skolsystem',
    text:
      'Just nu stöds bara Stockholm Stads skolplattform men med din hjälp kan fler skolplattformar integreras så att du slipper logga in i flera appar om du har barn i olika skolor.',
    image: img3,
  },
  {
    title: 'Skolan är allas vårt ansvar',
    text:
      'Vi insåg att klaga inte hjälper så mycket så vi tog tag i problemet istället. Häng med!',
    image: img1,
  },
]

const Features = () => {
  const swiperParams = {
    slidesPerView: 3,
    slidesPerGroup: 3,
    centeredSlides: true,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '#features-paginations',
      type: 'bullets',
      clickable: true,
    },
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
      },
      575: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerGroup: 2,
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      992: {
        slidesPerGroup: 3,
        slidesPerView: 3,
      },
    },
  }
  return (
    <section className="pb-110" id="funktioner">
      <Container>
        <Row className="justify-content-center">
          <Col md={12} lg={8}>
            <SectionTitle
              title="Enkelhet och snabbhet"
              text="Vi vill att det ska vara enkelt att få en överblick över vad som händer i skolan. Vi har gjort allt för att ge dig en enkel och snabb översikt över alla dina barn och det som är aktuellt just nu i skolan."
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xl={10} lg={12}>
            <Swiper className="feature-carousel" {...swiperParams}>
              {FEATURES_DATA.map((feature, index) => (
                <SwiperSlide key={`feature-post-${index}`}>
                  <FeatureCard
                    title={feature.title}
                    text={feature.text}
                    image={feature.image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              id="features-paginations"
              className="swiper-pagination d-flex justify-content-center align-items-center"
            />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Features
