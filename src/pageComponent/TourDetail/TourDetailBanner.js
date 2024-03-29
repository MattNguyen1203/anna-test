'use client'
import { useEffect, useRef, useState } from 'react'
// import required modules
import Image from 'next/image'
import locationIcon from '@/assets/images/location.svg'
import star from '@/assets/images/tourDetail/star.svg'
import btnDown2 from '@/assets/images/tourDetail/btnDown2.svg'
import { Slider as SlideBar } from '@mui/material'
import videoBG from '@/assets/images/about/videoBG.jpg'
import smallPlayBtn from '@/assets/images/smallPlayBtn.svg'
import playBtn from '@/assets/images/about/playBtn.svg'

// import slick slider
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function TourDetailBanner({ data = {}, headerData, price, lang }) {
  const { gallery, location, rate, video, title } = data
  let listGallery = gallery ?? [];
  if (gallery === null || gallery === undefined) {
    listGallery = [];
  } else if (gallery.length === 1) {
    listGallery.push(...Array.from({ length: gallery.length * 3 }, () => gallery[0]));
  } else if (gallery.length < 4 && gallery.length > 1) {
    listGallery.push(...gallery);
  }
  const icons = new Array(Math.ceil(data?.rate || 5)).fill(0)
  const outsideRef = useRef()
  const [isPlay, setIsPlay] = useState(false)
  const videoRef = useRef()
  const [slider, setSlider] = useState()
  const [thumbs, setThumbs] = useState()

  // scroll to next section
  const handleScrollDown = () => {
    outsideRef.current.scrollIntoView({
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    isPlay && slider.slickPause()
  }, [isPlay,slider])

  let priceT = '$'
  if(lang === 'it' || lang === 'fr') {
    priceT = '€'
  }
  return (
    <section className='w-full h-[100vh] max-lg:h-[50vh] tour-banner-wrapper relative overflow-hidden md:block hidden '>
      <Slider
        asNavFor={thumbs}
        ref={(slide) => setSlider(slide)}
        arrows={false}
        fade={true}
        speed={800}
        autoplay={true}
        autoplaySpeed={3000}
        infinite={true}
      >
        {video?.uploadVideo?.mediaItemUrl && (
          <div className='relative w-full h-full'>
            {!isPlay && (
              <div className='w-full h-full'>
                <Image
                  src={video?.overlayImage?.sourceUrl || videoBG}
                  alt={video?.overlayImage?.altText || video?.overlayImage?.title || 'Travel'}
                  width={1000}
                  height={1000}
                  priority
                  quality={85}
                  className='z-0 object-cover w-full h-full cursor-pointer select-none'
                />
                <Image
                  src={playBtn}
                  alt='playBtn'
                  className={`cursor-pointer absolute z-[30] w-[7.2vw] h-[8.4375vw] max-lg:w-[14vw] max-lg:h-[16vw] bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2`}
                  onClick={() => {
                    setIsPlay(true)
                    videoRef.current?.play()
                  }}
                />
                <div className='bg-[#00000033] w-full h-full absolute top-0 left-0 z-[20]'></div>
                <div
                  className='absolute top-0 left-0 w-full h-full cursor-pointer'
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 58.36%, rgba(0, 0, 0, 0.23) 71.19%, rgba(0, 0, 0, 0.34) 78.89%, rgba(0, 0, 0, 0.60) 96.15%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)'
                  }}
                ></div>
              </div>
            )}
          </div>
        )}
        {listGallery?.map((img, index) => {
          return (
            <div
              key={index}
              className='relative w-full h-full'
            >
              <Image
                src={img?.sourceUrl}
                alt={img?.altText || img?.title || 'img'}
                width={1000}
                height={1000}
                quality={85}
                priority
                className='object-cover w-full h-full cursor-pointer select-none'
              />
              <div className='bg-[#00000033] w-full h-full absolute top-0 left-0 cursor-pointer'></div>
              <div
                className='absolute top-0 left-0 w-full h-full cursor-pointer'
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 58.36%, rgba(0, 0, 0, 0.23) 71.19%, rgba(0, 0, 0, 0.34) 78.89%, rgba(0, 0, 0, 0.60) 96.15%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)'
                }}
              ></div>
            </div>
          )
        })}
      </Slider>

      {isPlay && (
        <video
          controls={isPlay}
          className={`object-fill w-full h-full z-[10] absolute top-0 left-0`}
          width={2000}
          height={1000}
          ref={videoRef}
          onEnded={() => {
            setIsPlay(false)
            slider.slickPlay()
          }}
        >
          <source
            type='video/mp4'
            className='w-full h-full'
            src={video?.uploadVideo?.mediaItemUrl}
          />
        </video>
      )}
      <div className='absolute bottom-[3.19vw] left-[8.12vw] z-10'>
        <div className='flex gap-[8px] items-center'>
          <Image
            src={locationIcon}
            alt='locationIcon'
            width={100}
            height={100}
            priority
            className='w-[1.5vw] h-[1.5vw]'
          />
          <span className='text-[1.5vw] leading-normal text-primaryColor select-none'>{location}</span>
        </div>

        <div className='select-none w-[39.0625vw] text-[2.5vw] font-optima font-semibold leading-[1.2] text-white'>
          {title || ''}
        </div>
      </div>

      <div className='select-none tour-banner'>
        <div>
          <div className='w-[32vw] flex items-center justify-between pr-[2.87vw] text-white'>
            <div>
              <div className='flex gap-[10px] items-center font-bold leading-normal'>
                <span className='max-lg:text-[1.75vw] text-[1.25vw]'>{headerData?.priceHeader}:</span>
                <span className=' max-w-[20vw] text-[1.875vw] max-lg:text-[2.5vw] capitalize line-clamp-1'>
                  {price} {priceT}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-[1.25vw] max-lg:text-[1.75vw] font-medium leading-normal'>{rate || 5}</span>
                <span className='flex gap-x-1'>
                  {icons?.map((icon, index) => {
                    return (
                      <Image
                        src={star}
                        alt='star'
                        width={20}
                        height={20}
                        className='w-[1.375vw] h-[1.375vw]'
                        key={index}
                      />
                    )
                  })}
                </span>
              </div>
            </div>
            <div
              className='flex flex-col items-center justify-center gap-1 cursor-pointer tour-detail-scroll'
              onClick={handleScrollDown}
            >
              <div className='rounded-full w-[2.8125vw] max-lg:w-[4vw] h-[2.8125vw] max-lg:h-[4vw] bg-primaryColor flex items-center justify-center'>
                <Image
                  src={btnDown2}
                  alt='btnDown2'
                  width={15}
                  height={15}
                  className='w-[0.86188vw] max-lg:w-[1.25vw] h-[0.75844vw] max-lg:h-[1.25vw]'
                />
              </div>
              <span className='text-[0.75vw] max-lg:text-[1.25vw] font-medium leading-normal tracking-[0.6px] uppercase text-center'>
                {headerData?.buttonContent}
              </span>
            </div>
          </div>

          <SlideBar
            aria-label='picture'
            defaultValue={0}
            valueLabelDisplay='off'
            max={0}
            style={{ color: '#8E999F' }}
            className='tour-banner-slider'
          />
        </div>

        <Slider
          asNavFor={slider}
          ref={(slide) => setThumbs(slide)}
          slidesToShow={4}
          focusOnSelect={true}
          arrows={false}
          infinite={true}
          speed={800}
          onSwipe={() => {
            setIsPlay(false)
            slider.slickPlay()
          }}
        >
          {video?.uploadVideo?.mediaItemUrl && (
            <div className='relative'>
              <Image
                src={video?.overlayImage?.sourceUrl || videoBG}
                alt={video?.overlayImage?.altText || ''}
                width={200}
                height={200}
                priority
                quality={85}
                className='w-[7.1875vw] h-[4.9375vw] max-lg:rounded object-cover rounded-lg select-none cursor-pointer'
              />
              <Image
                src={smallPlayBtn}
                alt='smallPlayBtn'
                width={30}
                height={30}
                className='w-[0.75vw] h-[0.9375vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              />
            </div>
          )}
          {listGallery?.map((img, index) => {
            return (
              <div key={index}>
                <Image
                  src={img?.sourceUrl}
                  alt={img?.altText || img?.title || 'img'}
                  priority
                  width={1000}
                  height={1000}
                  quality={85}
                  className='w-[7.1875vw] h-[4.9375vw] object-cover rounded-lg max-lg:rounded select-none cursor-pointer'
                />
              </div>
            )
          })}
        </Slider>
      </div>
      <div className='w-full h-[100vh] bg-[rgba(0,0,0,.5)] absolute top-0 left-0 z-[-10]'></div>

      <div ref={outsideRef}></div>
    </section>
  )
}
