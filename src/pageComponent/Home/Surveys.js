'use client'
import bgTourItemMB from '@/assets/images/bg-fb-mb.jpg'
import bgSurvey from '@/assets/images/bg-surveys.png'
import imgPerson from '@/assets/images/survey-person.png'
import BookTour from '@/components/Common/BookTour'
import Button from '@/components/Common/Button'
import ModalCustom from '@/components/Common/ModalCustom'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

function Surveys({ data, button, lang, dataBookTour, dictionary }) {
  const [openModal, setOpenModal] = useState(false)
  const refBtnBookTour = useRef()

  return (
    <div className='h-[auto] relative max-md:pt-[18vw]'>
      <Image
        alt='surveys'
        src={bgSurvey}
        quality={85}
        fill
        className='absolute w-full h-[90vw] object-cover top-0 z-[-1] hidden md:block'
      />
      <Image
        alt='img'
        src={bgTourItemMB}
        quality={85}
        className='absolute w-full h-[90vw] object-cover top-0 z-[-1] md:hidden'
      />
      <div className='flex content pt-[6.38vw] max-md:flex-col max-md:pt-[14.93vw] relative z-10'>
        <div className='w-[43vw] max-md:w-full'>
          <h2
            className='heading-1'
            data-aos-disabled='true'
            data-aos-once='true'
            data-aos='fade-up'
            data-aos-duration='1000'
          >
            {data?.title}
          </h2>
          <p
            data-aos-once='true'
            data-aos='fade-up'
            data-aos-disabled='true'
            data-aos-duration='1000'
            className='mt-[1.5vw] text-[1.125vw] text-textColor opacity-70 text-justify leading-[150%] max-md:text-[3.73vw] max-lg:text-[1.6vw]'
          >
            {data?.text}
          </p>
          <ul className='grid grid-cols-3 md:pr-[11.69vw] gap-x-[3.75vw] justify-items-center gap-y-[2vw] mt-[2vw] max-md:mt-[6.93vw] max-md:gap-x-[15.75vw] max-md:gap-y-[3.2vw]'>
            {data?.type?.map((item, index) => (
              <li
                data-aos-once='true'
                data-aos-disabled='true'
                data-aos='zoom-out-up'
                data-aos-duration='1000'
                key={index}
                className='flex flex-col items-center w-28'
              >
                <Image
                  src={item?.icon?.sourceUrl}
                  width={100}
                  height={100}
                  quality={85}
                  alt='img'
                  className='w-[4.375vw] h-[4.375vw] object-contain max-md:w-[14.99vw] max-md:h-[14.99vw]'
                />
                <span className='text-[1vw] capitalize mt-[0.62vw] font-[500] text-textColor leading-normal max-md:text-[3.2vw] max-lg:text-[1.4vw]'>
                  {item?.text}
                </span>
              </li>
            ))}
          </ul>
          <div
            data-aos-disabled='true'
            data-aos-once='true'
            data-aos='fade-up'
            data-aos-duration='1000'
            className='flex gap-x-[1vw] mt-[3.25vw] max-md:gap-x-[2.67vw] max-md:mt-[8.53vw]'
          >
            <div
              className='flex'
              ref={refBtnBookTour}
              onClick={() => setOpenModal(true)}
            >
              <Button
                className='btn-primary'
                content={dictionary?.nav.booking_button}
              >
                <span>{dictionary?.nav.booking_button}</span>
              </Button>
            </div>
            <Link href={`/${lang}/about-us/who-we-are`}>
              <Button
                className='btn-secondary'
                content={button?.buttonseemore}
              >
                <span>{button?.buttonseemore}</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className='relative flex flex-col-reverse flex-1 max-md:mt-[20.08vw]'>
          <Image
            src={imgPerson}
            width={500}
            height={500}
            quality={85}
            alt='img'
            className='relative z-20 w-[47vw] h-[34vw] object-contain max-md:w-full max-md:h-[70.9vw] md:right-[-14%]'
          />
          <div
            className='circle w-[33.54285vw] h-[33.54285vw] max-md:w-[69.828vw] max-md:h-[69.828vw] rounded-full bg-bgCircle opacity-60 absolute bottom-[9.73vw] left-[20%]'
            data-aos-once='true'
            data-aos='fade-up'
            data-aos-duration='2000'
          ></div>
        </div>
      </div>
      {openModal && (
        <ModalCustom
          openModal={openModal}
          setOpenModal={setOpenModal}
          className='w-[91.46vw] md:w-[82.93vw] md:h-[90vh] h-[80vh]'
        >
          <div className='w-full h-full overflow-y-auto md:rounded-[16px] overflow-x-hidden'>
            <BookTour
              data={dataBookTour}
              setOpenModal={setOpenModal}
              lang={lang}
              dictionary={dictionary}
            />
          </div>
        </ModalCustom>
      )}
      <div
        className='absolute bottom-0 w-full h-[10vw]'
        style={{
          background: 'linear-gradient(0deg, #FFF 0%, rgba(255, 255, 255, 0.49) 63.88%, rgba(255, 255, 255, 0.00) 100%)'
        }}
      ></div>
    </div>
  )
}

export default Surveys
