'use client'
import imgTour from '@/assets/images/tour.jpg'
import imgLocation from '@/assets/images/route-square.svg'
import imgStar from '@/assets/images/star-rate.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { iconsTour } from '@/lib/Icons'
import { Skeleton } from '@mui/material'

function TourItem({ data, menu, lang, loading, className, onCloseMenu }) {
  const tourData = data?.translation?.tourDetail?.banner || data?.tourDetail?.banner
  const checkBestTour = data?.translation?.bestSeller?.nodes || data?.bestSeller?.nodes
  const price = data?.translation?.tourDetail?.priceTour || data?.tourDetail?.priceTour
  let icons = null
  if (tourData?.rate) icons = new Array(Math.round(tourData?.rate)).fill(0)
  const pathName = usePathname()
  const isPromotion = pathName.includes('hot-deals')
  let bestTour = false
  let priceTour = '$'
  if (checkBestTour?.length > 0) {
    bestTour = true
  }
  let tag = 'Best Seller'
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
      onClick={onCloseMenu}
      href={`/${lang}${isPromotion || menu ? '/hot-deals' : ''}/${encodeURIComponent(data?.translation?.slug || data?.slug)}`}
      className={`${menu
          ? 'lg:h-[13.5vw] md:w-[30vw] md:h-[35vw] w-[52.5vw] h-[67.23vw]'
          : 'lg:h-[24.5vw] md:h-[28vw] h-[62.7vw] w-full'
        } flex md:rounded-[1vw] rounded-[2.75vw] relative max-lg:flex-shrink-0 tour-item cursor-pointer`}
    >
      {!loading ? (
        <div className='relative w-full h-full'>
          <Image
            src={tourData?.gallery?.length ? tourData?.gallery[0]?.sourceUrl : imgTour}
            width={364}
            height={471}
            priority
            quality={85}
            alt={tourData?.gallery?.[0]?.altText || tourData?.gallery?.[0]?.title || 'thumb tour'}
            className='h-full object-cover w-full md:rounded-[1vw] rounded-[2.75vw] img-tour'
          />
          {bestTour ? <span className='absolute top-[1vw] left-[1.5vw] max-md:top-[3vw] max-md:left-[3.5vw] tag-best_tour text-[calc(0.75vw+0.15rem)] w-max px-[1vw] py-[0.5vw] text-[#2b2b2b] font-[500] bg-primaryColor block max-md:text-[2.667vw] max-md:px-4'>{tag}</span> : ""}
        </div>
      ) : (
        <Skeleton
          variant='rounded'
          width={'100%'}
          height={'100%'}
        />
      )}
      {!loading ? (
        <div
          className='overlayItem'
          style={{ position: 'absolute' }}
        ></div>
      ) : (
        ''
      )}
      <div className='absolute bottom-0 info md:pl-[1.5vw] md:pr-[0.94vw] px-[3.2vw] md:pb-[1.19vw] pb-[3.2vw] w-full'>
        {!loading ? (
          <div className='flex items-center gap-x-[0.25vw]'>
            <Image
              src={imgLocation}
              width={100}
              height={100}
              alt='location'
              className='md:w-[2vw] lg:w-[1vw] md:h-[2vw] lg:h-[1vw] w-[2.66vw] h-[2.66vw] object-cover'
            />
            <span className='leading-normal text-primaryColor max-lg:text-[1.4vw] text-[0.875vw] max-md:text-[2.66vw]'>
              {tourData?.location}
            </span>
          </div>
        ) : (
          <Skeleton
            variant='text'
            sx={{ fontSize: '1rem' }}
          />
        )}

        <h3 className='line-clamp-2'>
          <Link
            href={`/${lang}${isPromotion || menu ? '/hot-deals' : ''}/${encodeURIComponent(
              data?.translation?.slug || data?.slug
            )}`}
            className={`text-white ${!loading ? 'title-tour' : ''
              } max-lg:text-[1.6vw] !line-clamp-2 text-[1.125vw] max-md:text-[2.93vw] font-bold tracking-tight leading-[1.2] mt-[0.25vw] ${className || ''
              }`}
          >
            {!loading ? (
              tourData?.title
            ) : (
              <Skeleton
                variant='text'
                sx={{ fontSize: '2rem' }}
              />
            )}
          </Link>
        </h3>
        {/* icons*/}
        <div className='flex md:gap-[0.35vw] gap-[1vw] mt-[0.75vw] flex-wrap'>
          {tourData?.icons?.map((icon, index) => {
            return (
              <div
                key={index}
                className='md:w-[1.5vw] md:h-[1.5vw] w-[5vw] h-[5vw] rounded-[6px] bg-[#FFF8DE] flex items-center justify-center'
              >
                <Image
                  src={iconsTour[icon]}
                  alt={icon}
                  className='md:w-[1vw] md:h-[1vw] w-[2.75vw] h-[2.75vw]'
                  width={20}
                  height={20}
                />
              </div>
            )
          })}
        </div>
        <div className={`${menu ? 'md:mt-[0.3vw]' : 'md:mt-[0.81vw]'} flex items-center justify-between mt-[2.13vw]`}>
          {!loading ? (
            <span className='text-primaryColor max-lg:text-[1.2vw] text-[1vw] max-md:text-[2.67vw]'>{price} {priceTour}</span>
          ) : (
            <Skeleton
              variant='rectangular'
              width={'80%'}
              height={50}
            />
          )}
          {!loading ? (
            <div
              className='text-[#434447] md:gap-x-[0.2vw] gap-x-[0.8vw] flex items-center
             md:text-[1.2vw] lg:text-[0.75vw] text-[2.67vw] bg-white md:py-[0.19vw] md:px-[1w] lg:px-[0.5vw] px-[1.28vw] 
             py-[0.5vw] rounded-full w-fit'
            >
              {tourData?.rate}
              <Image
                src={imgStar}
                width={100}
                height={100}
                alt='star'
                className='md:w-[1.2vw] lg:w-[0.6875vw] md:h-[1.2vw] lg:h-[0.6875vw] w-[2.56vw] h-[2.56vw] object-cover'
              />
            </div>
          ) : (
            <Skeleton
              variant='circular'
              width={50}
              height={50}
            />
          )}
        </div>
      </div>
    </Link>
  )
}

export default TourItem
