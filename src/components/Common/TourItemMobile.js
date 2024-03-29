'use client'

import Image from 'next/image'

import imgStar from '@/assets/images/star_yellow.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { iconsTour } from '@/lib/Icons'
import { Skeleton } from '@mui/material'
import imgTour from '@/assets/images/tour.jpg'

function TourItemMobile({ data, lang, loading }) {
  const tourData = data?.translation?.tourDetail?.banner || data?.tourDetail?.banner
  const checkBestTour = data?.translation?.bestSeller?.nodes || data?.bestSeller?.nodes
  const price = data?.translation?.tourDetail?.priceTour || data?.tourDetail?.priceTour
  const slugTour = data?.translation?.slug || data?.slug
  let listRate = null
  if (tourData?.rate) listRate = new Array(Math.round(tourData?.rate)).fill(0)
  const pathName = usePathname()
  const isPromotion = pathName.includes('hot-deals')
  let bestTour = false
  if (checkBestTour?.length > 0) {
    bestTour = true
  }
  let tag = 'Best Seller'
  let priceTour = '$'

  if (lang === 'fr') {
    tag = 'Best Seller'
    priceTour = '€'
  }
  if (lang === 'it') {
    tag = 'Best Seller'
    priceTour = '€'
  }
  return (
    <Link
      href={`/${lang}${isPromotion ? '/hot-deals' : ''}/${encodeURIComponent(slugTour)}`}
      className={` p-[4.27vw] min-h-[46.4vw] h-auto flex gap-[4.27vw] bg-white`}
    >
      <div className='max-h-[54vw] w-[45%] rounded-[1.067vw]'>
        {!loading ? (
          <div className='relative w-full h-full'>
            <Image
              alt={tourData?.gallery ? tourData?.gallery[0]?.altText || 'img tour' : 'img tour'}
              src={tourData?.gallery?.[0]?.sourceUrl || imgTour}
              quality={85}
              width={300}
              height={300}
              className='h-[100%] w-[100%] object-cover rounded-[1.067vw]'
              loading='lazy'
            />
            {bestTour ? (
              <span className='absolute top-3 left-3 tag-best_tour text-[2.667vw] w-max px-2 py-1 text-[#2b2b2b] bg-primaryColor block'>
                {tag}
              </span>
            ) : (
              ''
            )}
          </div>
        ) : (
          <Skeleton
            variant='rounded'
            width={'100%'}
            height={'100%'}
          />
        )}
      </div>

      <div className='flex flex-col flex-1'>
        {!loading ? (
          <div className='flex gap-[0.5736vw] items-center mb-[0.53vw]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-[2.66667vw] h-[2.66667vw]'
              viewBox='0 0 10 11'
              fill='none'
            >
              <path
                opacity='0.2'
                d='M6.74648 1.60645H3.25898C1.73815 1.60645 0.833984 2.51061 0.833984 4.02728V7.51478C0.833984 9.03145 1.73815 9.93561 3.25482 9.93561H6.74232C8.25899 9.93561 9.16315 9.03145 9.16315 7.51478V4.02728C9.16732 2.51061 8.26315 1.60645 6.74648 1.60645Z'
                fill='#171717'
              />
              <path
                d='M7.22989 4.54394L6.25489 7.6856C6.02155 8.43144 4.97572 8.44394 4.72989 7.70227L4.43822 6.83977C4.35905 6.60227 4.17155 6.41061 3.93405 6.33561L3.06739 6.04394C2.32989 5.79811 2.34239 4.74394 3.08822 4.51894L6.22989 3.53977C6.84655 3.35227 7.42572 3.93144 7.22989 4.54394Z'
                fill='#171717'
              />
            </svg>
            <span className='text-justify font-sans text-[2.67vw] text-textColor leading-[150%]'>
              {tourData?.location}
            </span>
          </div>
        ) : (
          <Skeleton
            variant='text'
            sx={{ fontSize: '1rem' }}
          />
        )}

        {!loading ? (
          <span className=' font-sans text-[#171717] text-[3.2vw] font-bold leading-[120%] tracking-[-0.064vw] max-w-[45vw]'>
            {tourData?.title}
          </span>
        ) : (
          <Skeleton
            variant='text'
            sx={{ fontSize: '1rem' }}
          />
        )}

        <div className='flex gap-[0.53333vw] items-center mt-[2.13vw]'>
          <span className='text-[#171717] text-[2.67vw] text-justify font-medium leading-[150%] opacity-70 '>
            {tourData?.rate}
          </span>
          <div className='flex gap-[0.53vw]'>
            {listRate?.map((rate, index) => (
              <Image
                key={index}
                alt='image star'
                src={imgStar}
              />
            ))}
          </div>
        </div>
        {!loading ? (
          <span className='text-[#171717] text-justify font-sans text-[4.27vw] font-bold leading-[150%] capitalize mb-[6.4vw]'>
            {price} {priceTour}
          </span>
        ) : (
          <Skeleton
            variant='text'
            sx={{ fontSize: '1rem' }}
          />
        )}

        {!loading ? (
          <div className='flex gap-[1.448vw] flex-wrap'>
            {tourData?.icons?.map((icon, index) => (
              <div
                key={index}
                className='w-[5.86667vw] h-[5.86667vw] bg-[#FFF8DE] justify-center flex items-center rounded-[0.72vw] object-contain'
              >
                <Image
                  alt={icon}
                  src={iconsTour[icon]}
                  width={20}
                  height={20}
                  className='w-[3.2vw] h-[3.2vw]'
                />
              </div>
            ))}
          </div>
        ) : (
          <Skeleton
            style={{ marginTop: '3vw' }}
            variant='rectangular'
            width={'100%'}
            height={30}
          />
        )}
      </div>
    </Link>
  )
}

export default TourItemMobile
