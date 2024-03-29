import { Box } from '@mui/material'
import Image from 'next/image'
import scrollDown from '@/helpers/scrollDown'
import fetchData from '@/data/fetchData'
import { GET_BANNER_TRAVEL_STYLE } from '@/graphql/travelStyle/queries'
async function Banner({ slug,lang }) {
  // const scrollDownRef = useRef()
  const getPageInfo = await fetchData(GET_BANNER_TRAVEL_STYLE, {
    language: lang?.toUpperCase(),
    taxonomyValue: slug,
  })
  const data = getPageInfo?.data?.tourStyle?.translation?.banner?.banner
  const imageSrc = data?.banner
  return (
    <Box
      sx={{
        height: {
          xs: '74.67vw',
          sm: '74.67vw',
          md: '100vh'
        }
      }}
    >
      <div className='types-of-trips-banner relative h-[100%] flex justify-center items-center'>
        <Image
          alt={imageSrc?.altText || 'img-types-of-trips'}
          src={imageSrc?.sourceUrl}
          quality={85}
          fill
          className='w-[100%] h-screen object-cover z-[-1]'
        />
        <div className='flex flex-col justify-center text-center items-center absolute z-[10] max-md:pt-[22vw] '>
          <span className='text-center md:text-[1.94vw] text-[3.2vw] md:font-bold font-medium leading-normal text-[#fff] md:mb-[0.62vw] mb-[1.07vw] font-sans '>
            {data?.title}
          </span>
          <span className='md:w-[70vw] w-[67vw] font-optima text-[#fff] md:text-[4.5vw] text-[6.4vw] text-center font-semibold leading-[120%] uppercase '>
            {data?.heading}
          </span>
          <span className='md:w-[43vw] w-[66.27vw] max-md:w-[90%] text-center font-sans md:text-[1.5vw] text-[2.67vw] font-medium leading-[151%] text-[#fff] pb-[2.5vw]'>
            <span
              dangerouslySetInnerHTML={{ __html: data?.desc }}
              className='whitespace-pre-wrap types-of-trips-desc max-lg:text-[2vw] max-md:text-[3.773vw]'
            ></span>
          </span>

          <div
            // onClick={() => scrollDown(scrollDownRef, 'start')}
            className='flex flex-col gap-[0.94vw] text-center items-center justify-center explore cursor-pointer '
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='md:w-[1.375vw] md:h-[1.35vw] w-[3.2vw] h-[3.2vw] arrow-down '
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
            <span className='block max-md:hidden text-center font-manrope text-[0.875vw] not-italic font-semibold tracking-[0.04375vw] uppercase text-[#fff] max-lg:text-[1.6vw]'>
              {data?.subdesc}
            </span>
          </div>
        </div>
        {/* <div className='absolute bottom-[0] h-[12.4vw] left-[0] right-[0] md:flex hidden flex-shrink-0 bg-overlayBanner2'></div> */}
        <div
        className='absolute inset-0 block'
        style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.4) 45%)' }}
      ></div>
      </div>
      {/* <div ref={scrollDownRef}></div> */}
    </Box>
  )
}

export default Banner
