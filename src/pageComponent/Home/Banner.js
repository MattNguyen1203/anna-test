import banner from '@/assets/images/banner.jpg'
import Image from 'next/image'
import FilterBanner from './FilterBanner.js'
import { getDictionary } from '@/get-dictionary.js'
import ScrollDown from '@/components/Common/ScrollDown.js'

async function Banner({ data, lang, dataFilter }) {
  const dictionary = await getDictionary(lang)

  return (
    <div className='h-[100vh] relative banner max-lg:h-[84.8vw]'>
      <div className='relative z-40 wrapper-banner'>
        <div className='flex flex-col'>
          <h1 className='font-viva text-[9.375vw] heading-banner max-md:text-[12.125vw]'>ASIA</h1>
          <h2 className='font-viva text-[9.375vw] heading-banner max-md:text-[12.125vw]'>VIVA TRAVEL</h2>
        </div>

        <h2 className='text-[#fff] text-center text-[2.25vw] leading-[1.2] capitalize max-md:text-[3.73vw]'>
          {data?.text}
        </h2>
        <div className='filter-tour flex  ml-auto mr-auto mt-[3.06vw] bg-white w-max py-[1.5vw] pl-[2.87vw] pr-[2vw] rounded-[1.125vw] max-lg:hidden'>
          <FilterBanner
            lang={lang}
            dataFilter={dataFilter}
          />
        </div>
        <div className='relative flex flex-col gap-[0.94vw] text-center items-center cursor-pointer justify-center md:mt-[2.19vw] mt-[4.8vw]'>
          <ScrollDown block='home-wrapper' />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='arrow-down md:w-[1.375vw] md:h-[1.35vw] w-[3.2vw] h-[3.2vw]'
            viewBox='0 0 24 25'
            fill='none'
          >
            <path
              d='M1 1L12 12L23 1'
              stroke='white'
              strokeWidth='2'
            />
            <path
              d='M1 12L12 23L23 12'
              stroke='white'
              strokeWidth='2'
            />
          </svg>
          <span
            className='md:block hidden text-center font-manrope text-[0.875vw] not-italic font-semibold tracking-[0.04375vw] uppercase text-[#fff] relative z-[99]'
            style={{ textShadow: '1px 1px 2px #000, 0 0 1em #000, 0 0 0.2em #000' }}
          >
            {dictionary.home.banner_explore}
          </span>
        </div>
      </div>
      <Image
        src={data?.background?.sourceUrl || banner}
        width={1600}
        height={1000}
        quality={85}
        alt={data?.background?.altText || data?.background?.title || 'banner'}
        priority
        className='absolute inset-0 object-cover w-full h-full bg-blend-multiply'
      />
      <div className='overlay-banner max-md:hidden'></div>
      <div
        className='absolute inset-0 block'
        style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.4) 45%)' }}
      ></div>
    </div>
  )
}

export default Banner
