import React from "react";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay]);

import img1 from "../assets/img/partner2.png";

const Clients = () => {
  const params = {
    spaceBetween: 100,
    loop: true,
    autoplay: {
      delay: 3000
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      500: {
        spaceBetween: 50,
        slidesPerView: 3
      },
      768: {
        spaceBetween: 50,
        slidesPerView: 4
      },
      992: {
        slidesPerView: 5
      }
    }
  };
  return (
    <section className="pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="partner-carousel-wrap">
              <Swiper className="partner-carousel" {...params}>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
                <SwiperSlide className="single-partner">
                  <img src={img1} alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
