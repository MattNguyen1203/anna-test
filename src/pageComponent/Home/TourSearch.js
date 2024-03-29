import Image from 'next/image'
import imgTour from '@/assets/images/tour.jpg'
import React from 'react'
import Link from 'next/link'

function TourSearch({ data, onClose, lang }) {
  const tourData = data?.translation?.tourDetail?.banner
  return (
    <Link
      href={`/${lang}/${encodeURIComponent(data?.translation?.slug)}`}
      className='flex gap-[1vw] bg-slate-50 hover:bg-slate-100 transition-all'
      onClick={onClose}
    >
      <Image
        src={tourData?.gallery ? tourData?.gallery[0]?.sourceUrl : imgTour}
        width={50}
        height={50}
        quality={85}
        alt={tourData?.gallery?.[0]?.altText || 'thumb tour'}
        className='w-[4vw] h-[4vw] object-cover'
      />
      <h3 className='text-[1.1vw] pt-2'>{tourData?.title}</h3>
    </Link>
  )
}

export default TourSearch
