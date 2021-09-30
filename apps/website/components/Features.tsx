import SwiperCore, { Autoplay, Pagination, SwiperOptions } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import FeatureCard from './FeatureCard'
import SectionTitle from './SectionTitle'
import { FEATURES_DATA } from './featureData'

SwiperCore.use([Pagination, Autoplay])

const Features = () => {
  const swiperParams: SwiperOptions = {
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
    <section className="max-w-6xl px-5 mx-auto md:px-0" id="funktioner">
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          title="Enkelhet och snabbhet"
          text="Vi vill att det ska vara enkelt att få en överblick över vad som händer i skolan. Vi har gjort allt för att ge dig en enkel och snabb översikt över alla dina barn och det som är aktuellt just nu i skolan."
        />
      </div>
      <Swiper className="feature-carousel" {...swiperParams}>
        {FEATURES_DATA.map(({ title, text, image }) => (
          <SwiperSlide key={title}>
            {({ isActive }: { isActive: boolean }) => (
              <FeatureCard
                isActive={isActive}
                title={title}
                text={text}
                image={image}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        id="features-paginations"
        className="flex justify-center mt-8 space-x-2"
      />
    </section>
  )
}

export default Features
