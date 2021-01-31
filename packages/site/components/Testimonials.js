import React, { useState } from "react";
import SwiperCore, { Autoplay, Thumbs, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import img1 from "../assets/img/wass.png";
import img2 from "../assets/img/karin.jpg";
import img3 from "../assets/img/feature/author1.png";

SwiperCore.use([Autoplay, Thumbs, Navigation]);

const Testimonials = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const testimmonialsParams = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: "#testi-swiper-button-next",
      prevEl: "#testi-swiper-button-prev"
    },
    autoplay: {
      delay: 3000
    }
  };
  const thumbnailsParam = {
    slidesPerView: 3,
    spaceBetween: 20,
    autoplay: {
      delay: 3000
    },
    breakpoints: {
      0: {
        slidesPerView: 2
      },
      500: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      }
    }
  };
  return (
    <section className="pt-120 pb-110 bg-2">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="testimonial-author-arousel text-center">
              <div className="testimonial-author-inner">
                <Swiper
                  className="author-carousel"
                  onSwiper={setThumbsSwiper}
                  {...thumbnailsParam}
                >
                  <SwiperSlide className="single-author-imge">
                    <img src={img1} alt="" />
                  </SwiperSlide>
                  <SwiperSlide className="single-author-imge">
                    <img src={img2} alt="" />
                  </SwiperSlide>
                  <SwiperSlide className="single-author-imge">
                    <img src={img3} alt="" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>

            <div className="testimonial-author-comment text-center">
              <Swiper
                className="author-comment-carousel"
                thumbs={{ swiper: thumbsSwiper }}
                {...testimmonialsParams}
              >
                <SwiperSlide className="single-author-comment">
                  <h4>
                    "Det känns bra att mänskligheten nu befrias från upphandlingshaveriets bojor. Framtiden är här! Och den kostade nästan ingenting. Öppen data är kärlek."
                  </h4>
                  <p>Fredrik Wass, förälder</p>
                </SwiperSlide>

                <SwiperSlide className="single-author-comment">
                  <h4>
                  "Oftast när jag behöver kolla upp något är jag stressad och på språng. Om det tar tid att logga in och leta så struntar jag till sist i det."
                  </h4>
                  <p>Karin Nygårds, lärare och förälder</p>
                </SwiperSlide>
                <SwiperSlide className="single-author-comment">
                  <h4>
                    This is due to their excellent service, competitive
                    <br /> pricing and customer support. It’s throughly
                    <br /> refresing to get such a personal touch.
                  </h4>
                  <p>Shirley Smith</p>
                </SwiperSlide>
              </Swiper>
              <div className="testimonial-author-comment-nav">
                <button id="testi-swiper-button-prev">
                  <i className="fa fa-angle-left"></i>
                </button>
                <button id="testi-swiper-button-next">
                  <i className="fa fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
