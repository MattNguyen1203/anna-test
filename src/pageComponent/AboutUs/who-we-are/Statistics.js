'use client'

import commaRes from '@/assets/images/about/commaRes.svg'
import subIcon from '@/assets/images/about/subIcon.svg'
import comma from '@/assets/images/comma.svg'
import sloganBg from '@/assets/images/sloganBg.png'
import wave from '@/assets/images/wave.svg'
import waveNormal from '@/assets/images/waveNormal.svg'
import waveNormalWhite from '@/assets/images/waveNormalWhite.svg'
import waveShort from '@/assets/images/waveShort.svg'
import waveWhite from '@/assets/images/waveWhite.svg'
import CountDown from '@/components/Common/CountDown'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

var timeoutId = null
export default function Statistics({ data }) {

  const imgRef = useRef([])
  const [scrollPositions, setScrollPositions] = useState([-1300, 1300, -1300, 1300, -1300, 1300, -1300])

  const handleScroll = () => {
    setScrollPositions([0, 0, 0, 0, 0, 0, 0, 0, 0])
  }

  const numberRef = useRef()
  useEffect(() => {
    const onScroll = () => {
      if (numberRef.current) {
        const rect = numberRef.current?.getBoundingClientRect()
        const viewHeight = Math.max(numberRef.current.clientHeight || 0, window.innerHeight || 0)
        if (rect.top <= viewHeight && rect.bottom >= 0) {
          timeoutId = setTimeout(() => {
            handleScroll()
          }, 500);
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      timeoutId && clearTimeout(timeoutId)
    }
  }, [])

  return (
    <section
      className='about-statistic overflow-x-hidden md:mt-[6.125vw] rounded-2xl md:rounded-none mt-[-7.2vw] bg-white z-10 relative
      pt-[25.6vw] md:pt-0'
    >
      <Image
        src={subIcon}
        alt='subIcon'
        className='md:hidden w-[27.46vw] h-[15.73vw] absolute top-[8.53vw] right-[8.5%]'
      />

      {/* description about company */}
      <div className='content relative md:mb-[3.125vw] mb-[6.4vw] md:mt-[4.6vw]'>
        <Image
          data-aos-once='true'
          data-aos-disabled='true'
          data-aos='fade-up'
          data-aos-duration='1000'
          src={comma}
          alt='comma'
          className='md:flex hidden md:w-[11.8125vw] md:h-[12.1875vw] w-[18.13vw] h-[13.33vw] absolute lg:top-[-4.625vw] md:top-[-3vw] lg:left-[-3.1875vw] md:left-[1vw]'
        />

        <Image
          src={commaRes}
          alt='commaRes'
          className='md:hidden flex md:w-[11.8125vw] md:h-[12.1875vw] w-[18.13vw] h-[13.33vw] absolute top-[-4.625vw] left-[2.1875vw]'
        />

        <div
          data-aos-once='true'
          data-aos-disabled='true'
          data-aos='fade-up'
          data-aos-duration='1000'
          className='statistic-desc md:w-[56.4375vw] w-full text-justify text-[#414141] font-optima font-semibold xl:text-[2.5625vw] md:text-[3.5625vw] text-[5.4vw] leading-[150%] md:tracking-[-2.05px] tracking-[-1.2px]'
          dangerouslySetInnerHTML={{ __html: `${data?.description}` }}
        ></div>
      </div>

      {/* list stat*/}

      <div className='flex justify-between md:gap-[8.3125vw] gap-[4vw] overflow-hidden flex-wrap md:flex-nowrap px-[4.26vw]'>
        {data?.statistics?.map((item, index) => {
          return (
            <CountDown
              key={index}
              data={item}
              time={2000}
            />
          )
        })}
      </div>

      {/* slogan*/}
      <div className='slogan-container' >
        <div className='slogan relative mt-[9.3125vw]'>
          <div className='slogan-des down text-[2.7vw] absolute bottom-0 left-0 font-manrope font-extrabold tracking-[-0.96px] leading-[140%] max-md:hidden'>
            <div
              style={{
                transform: `translateX(${scrollPositions[0]}px)`,
                transition: 'transform 0.6s ease-in-out'
              }}
              ref={(e) => (imgRef.current[0] = e)}
              className='text-[4.375vw] font-optima leading-[120%]'
            >
              {data?.slogan?.line1}
            </div>
            <div
              style={{
                transform: `translateX(${scrollPositions[1]}px)`,
                transition: 'transform 0.6s ease-in-out'
              }}
              ref={(e) => (imgRef.current[6] = e)}
            >
              {data?.slogan?.line2}
            </div>
            <div
              style={{
                transform: `translateX(${scrollPositions[2]}px)`,
                transition: 'transform 0.6s ease-in-out'
              }}
              ref={(e) => (imgRef.current[2] = e)}
            >
              {data?.slogan?.line3}
            </div>
            <div
              style={{
                transform: `translateX(${scrollPositions[3]}px)`,
                transition: 'transform 0.6s ease-in-out'
              }}
              ref={(e) => (imgRef.current[7] = e)}
            >
              {data?.slogan?.line4}
            </div>
          </div>
          {/*<Image*/}
          {/*  style={{*/}
          {/*    transform: `translateX(${scrollPositions[4]}px)`,*/}
          {/*    transition: 'transform 0.6s ease-in-out'*/}
          {/*  }}*/}
          {/*  ref={(e) => (imgRef.current[0] = e)}*/}
          {/*  src={wave}*/}
          {/*  alt='Wave'*/}
          {/*  className='wave absolute bottom-[8.75vw] -left-[3.12vw] max-md:w-[32.658vw] max-md:h-[2.23vw] '*/}
          {/*/>*/}
          {/*<Image*/}
          {/*  style={{*/}
          {/*    transform: `translateX(${scrollPositions[5]}px)`,*/}
          {/*    transition: 'transform 0.6s ease-in-out'*/}
          {/*  }}*/}
          {/*  ref={(e) => (imgRef.current[0] = e)}*/}
          {/*  src={waveNormal}*/}
          {/*  alt='Wave'*/}
          {/*  className='wave absolute top-[9.69vw] right-[40%] max-md:w-[32.658vw] max-md:h-[2.23vw] max-md:right-0'*/}
          {/*/>*/}
          <div className='slogan-img'>
            <Image
              src={data?.slogan?.image?.sourceUrl || sloganBg}
              alt={data?.slogan?.image?.altText || 'slogan'}
              width={1000}
              height={1000}
              className='slogan-img max-md:w-[73.32vw] max-md:h-[73.32vw] object-cover'
            />
            <div
              className='slogan-des up text-[2.7vw] absolute bottom-0 left-0 font-manrope font-extrabold tracking-[-0.96px] leading-[140%]
             max-md:mt-[10vw] max-md:hidden'
            >
              <div
                style={{
                  transform: `translateX(${scrollPositions[0]}px)`,
                  transition: 'transform 0.6s ease-in-out'
                }}
                ref={(e) => (imgRef.current[0] = e)}
                className='text-[4.375vw] font-optima leading-[120%]'
              >
                {data?.slogan?.line1}
              </div>
              <div
                style={{
                  transform: `translateX(${scrollPositions[1]}px)`,
                  transition: 'transform 0.6s ease-in-out'
                }}
                ref={(e) => (imgRef.current[6] = e)}
              >
                {data?.slogan?.line2}
              </div>
              <div
                style={{
                  transform: `translateX(${scrollPositions[2]}px)`,
                  transition: 'transform 0.6s ease-in-out'
                }}
                ref={(e) => (imgRef.current[2] = e)}
              >
                {data?.slogan?.line3}
              </div>
              <div
                style={{
                  transform: `translateX(${scrollPositions[3]}px)`,
                  transition: 'transform 0.6s ease-in-out'
                }}
                ref={(e) => (imgRef.current[7] = e)}
              >
                {data?.slogan?.line4}
              </div>
            </div>
            {/*<Image*/}
            {/*  style={{*/}
            {/*    transform: `translateX(${scrollPositions[4]}px)`,*/}
            {/*    transition: 'transform 0.6s ease-in-out'*/}
            {/*  }}*/}
            {/*  ref={(e) => (imgRef.current[0] = e)}*/}
            {/*  src={waveWhite}*/}
            {/*  alt='Wave'*/}
            {/*  className='wave absolute bottom-[8.75vw] -left-[3.12vw] max-md:w-[32.658vw] max-md:h-[2.23vw]'*/}
            {/*/>*/}
            {/*<Image*/}
            {/*  style={{*/}
            {/*    transform: `translateX(${scrollPositions[5]}px)`,*/}
            {/*    transition: 'transform 0.6s ease-in-out'*/}
            {/*  }}*/}
            {/*  ref={(e) => (imgRef.current[0] = e)}*/}
            {/*  src={waveNormalWhite}*/}
            {/*  alt='Wave'*/}
            {/*  className='wave absolute top-[9.69vw] right-[40%] max-md:w-[32.658vw] max-md:h-[2.23vw] max-md:right-0'*/}
            {/*/>*/}
            <div ref={numberRef}
              style={{
                transform: `translateX(${scrollPositions[6]}px)`,
                transition: 'transform 0.6s ease-in-out'
              }}
            />
          </div>
        </div>
        <div className='hidden max-md:flex max-md:flex-col text-center mt-[6.1vw]'>
          <h3 className='text-[7.26vw] leading-[8.96vw] mb-[2.1vw] whitespace-nowrap font-semibold font-optima uppercase'>
            {data?.slogan?.line1}
          </h3>
          <p className='max-md:hidden text-[4.26vw] leading-[6.4vw]'>
            {`${data?.slogan?.line2} ${data?.slogan?.line3} ${data?.slogan?.line4}`}
          </p>
          <div className='hidden max-md:block'>
            <p className='max-md:hidden text-[4.26vw] leading-[6.4vw]'>
              {`${data?.slogan?.line2} `}
            </p>
            <p className='max-md:hidden text-[4.26vw] leading-[6.4vw]'>
              {`${data?.slogan?.line3} `}
            </p>
            <p className='max-md:hidden text-[4.26vw] leading-[6.4vw]'>
              {`${data?.slogan?.line4} `}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
