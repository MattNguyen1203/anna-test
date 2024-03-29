'use client' // Error components must be Client Components

import { useEffect } from 'react'
import notFoundImage from '@/assets/images/notFound/notFoundBg.jpg'
import notFoundImg from '@/assets/images/notFound/notFoundImg.png'

import Image from 'next/image'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("error-global", error)
  }, [error])

  return (
    <div className='not-found w-[100vw] h-[100vh] flex items-center text-[40px] justify-center fixed top-0 left-0 z-[10]'>
      <Image
        src={notFoundImage}
        alt='not found'
        width={1000}
        height={1000}
        quality={100}
        className='absolute top-0 left-0 z-20 object-cover w-full h-full'
      />

      <div className='relative z-30 md:w-[43.625vw] w-[78.4vw]'>
        <div className='flex items-center w-full'>
          <div className='nf-404 md:text-[20.625vw] text-[37.06587vw] font-optima capitalize font-medium leading-[1.1]'>
            5
          </div>
          <Image
            src={notFoundImg}
            alt='not found'
            width={500}
            height={500}
            className='md:w-[22vw] w-[38.1344vw] md:h-[18.4373vw] h-[33.1344vw]'
          />
          <div className='nf-404 md:text-[20.625vw] text-[37.06587vw] font-optima capitalize font-medium leading-[1.1]'>
            0
          </div>
        </div>
        <div className='w-full md:text-[2vw] text-[3.73vw] font-semibold font-optima text-center'>
          Sorry! Something went Wrong! Please try to reset or contact to owner!
        </div>
        <button
          className='btn-primary w-fit h-fit px-[1.25vw] py-[2.875vw] m-auto md:mt-[1.94vw] mt-[6.4vw]'
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}