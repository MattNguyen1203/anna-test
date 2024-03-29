'use client'
import Image from 'next/image'
import Link from 'next/link'

import bgStyle from '@/assets/images/bg-styleMb.jpg'

function TravelStyleMb({ data, title, lang }) {
  return (
    <div className='hidden max-md:block relative pt-[10.67vw] pb-[15.73vw]'>
      {/* <Image
        alt='beach'
        src={bgStyle}
        quality={85}
        fill
        className='absolute w-full h-auto object-cover top-0 z-[-1]'
      /> */}
      <h2 className='heading-1 pb-[5.33vw] border-b border-solid border-[#ccc] text-center mx-[4.27vw]'>{title}</h2>
      <div className='grid menu-mb_item grid-cols-3 gap-x-[12.27vw] gap-y-[5.6vw] mt-[5.33vw] px-[4.27vw] '>
        {data?.travelStyleList?.map((item, index) => (
          <div key={index}>
            <Link
              href={`/${lang}/types-of-trips/${item?.slug}`}
              className='flex flex-col items-center justify-center'
            >
              <div className='w-[17.3vw] h-[17.3vw] rounded-full border border-solid border-primaryColor flex items-center justify-center bg-[#FFFBE9]'>
                <Image
                  src={item?.banner?.travelStyleInfo?.travelStyleImage?.sourceUrl}
                  quality={85}
                  width={50}
                  height={50}
                  alt={item?.image?.altText || 'style travel'}
                  className='w-[10.8vw] h-[10.8vw] object-center object-contain'
                />
              </div>
              <span className='uppercase text-center text-[2.93333vw] text-textColor font-[500] leading-[120%] mt-[1.6vw] block'>
                {item?.banner?.travelStyleInfo?.travelStyleName}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TravelStyleMb
