import React from 'react'
import notFoundImage from '@/assets/images/notFound/notFoundBg.jpg'
import notFoundImg from '@/assets/images/notFound/notFoundImg.png'

import Image from 'next/image'
import Link from 'next/link'

export default function NotFound({ lang }) {
  return (
    <div className='not-found w-full h-full flex items-center text-[40px] justify-center fixed top-0 left-0 z-[10]'>
      <Image
        src={notFoundImage}
        alt='not found'
        width={1000}
        height={1000}
        quality={85}
        className='absolute top-0 left-0 z-20 object-cover w-full h-full'
      />

      <div className='relative z-30 md:w-[43.625vw] w-[78.4vw]'>
        <div className='flex items-center w-full'>
          <div className='nf-404 md:text-[20.625vw] text-[37.06587vw] font-optima capitalize font-medium leading-[1.1]'>
            4
          </div>
          <Image
            src={notFoundImg}
            alt='not found'
            width={500}
            height={500}
            className='md:w-[22vw] w-[38.1344vw] md:h-[18.4373vw] h-[33.1344vw]'
          />
          <div className='nf-404 md:text-[20.625vw] text-[37.06587vw] font-optima capitalize font-medium leading-[1.1]'>
            4
          </div>
        </div>
        <div className='w-full md:text-[2vw] text-[3.73vw] font-semibold font-optima text-center'>
          Sorry! We can’t find the page you’re looking for.
        </div>
        <Link
          className='btn-primary w-fit h-fit px-[1.25vw] py-[2.875vw] m-auto md:mt-[1.94vw] mt-[6.4vw]'
          href={`/`}
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
