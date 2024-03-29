'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'

import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/free-mode'

function SlidePartners({ data: slidePartners, reverse }) {
  const dataSlide = slidePartners?.concat(slidePartners)?.concat(slidePartners)
  return (
    <div className='content'>
      <Swiper
        breakpoints={{
          768: {
            slidesPerView: 5,
            spaceBetween: 50
          }
        }}
        slidesPerView={3}
        spaceBetween={50}
        loop={true}
        centeredSlides={true}
        allowTouchMove={false}
        autoplay={{
          delay: 400,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          stopOnLastSlide: false,
          waitForTransition: true
        }}
        speed={1000}
        freeMode={true}
        modules={[Autoplay, FreeMode]}
        className='w-full mySwiper slide-partners'
      >
        {dataSlide?.map((item, index) => {
          return (
            <SwiperSlide className='w-[20%] partner-item' key={index * Math.random()}>
              <Image
                src={item?.sourceUrl}
                width={500}
                height={500}
                alt='partners'
                quality={85}
                className={`object-contain w-[13vw] h-[10.2vw] max-md:w-[26.33vw] max-md:h-[14.69vw] ${reverse ? 'max-md:-scale-125 -scale-90' : 'max-md:scale-125 scale-90'
                  }`}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default SlidePartners
