'use client'
import Loading from '@/components/Common/Loading'
import ReviewItem from '@/components/Common/ReviewItem'
import { GET_All_CUSTOMERS_REVIEW } from '@/graphql/customersReview/queries'
import { useQuery } from '@apollo/client'
import { createTheme, useMediaQuery } from '@mui/material'
import { useRef, useState } from 'react'
import FilterReview from './FilterReview'

const theme = createTheme({
  breakpoints: {
    values: {
      sm: 768
    }
  }
})
const Reviews = ({ lang, data, arrYear, arrCountry, dictionary }) => {
  const listCountry = arrCountry?.map((item) => item?.slug)
  const [year,setYear] = useState(arrYear)
  const [country,setCountry] = useState(listCountry)


  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  let totalPage = useRef(0)
  const [activePage, setActivePage] = useState(1)
  // get review list
  const {
    data: reviewList,
    refetch,
    loading
  } = useQuery(GET_All_CUSTOMERS_REVIEW, {
    variables: {
      offset: 0,
      size: 7,
      language: lang?.toUpperCase(),
      yearSlug: year === "" ? arrYear : year,
      countrySlug: country === "" ? listCountry : country
    }
  })
  // calculate total page of reviews
  if (reviewList) {
    totalPage.current = Math.ceil(reviewList?.allCustomerReview?.pageInfo?.offsetPagination?.total / 7)
  }
  const paginations = new Array(totalPage.current).fill(0)
  const reviewData = reviewList?.allCustomerReview?.nodes?.filter((item) => item.translation !== null)
  let notFound = 'Not Found!'
  if(lang === 'fr') {
    notFound = 'Pas trouvé!'
  }
  if(lang === 'it') {
    notFound = 'Non trovato!'
  }
  return (
    <section
      className='relative z-10 content'
      id='about-us__review'
      style={{ paddingTop: '10vw', paddingBottom: '10vw' }}
    >
      <div className='md:w-[50vw] w-full text-textColor md:mb-[2vw] mb-[13.07vw]'>
        <h2
          data-aos-once='true'
          data-aos-disabled='true'
          data-aos='fade-up'
          data-aos-duration='1000'
          className='md:text-[5vw] xl:text-[4vw] text-[4.8vw] font-semibold capitalize md:leading-[110%] leading-[120%] font-optima md:mb-[1vw] mb-[2.13vw]'
        >
          {data?.heading}
        </h2>
        <p
          data-aos-once='true'
          data-aos-disabled='true'
          data-aos='fade-up'
          data-aos-duration='1200'
          className='md:text-[1.6vw] lg:text-[1.125vw] text-[3.73vw] leading-[150%] md:opacity-80 opacity-70'
        >
          {data?.desc}
        </p>
      </div>
      <FilterReview arrDes={arrCountry} arrYear={arrYear} handleDes={setCountry} handleYear={setYear} dictionary={dictionary}/>
      {/* reviews */}
      {!loading ? (
        <div className='md:grid md:grid-cols-2 mt-[4vw] max-md:mt-[8vw] w-full md:row-auto md:gap-[2.5vw] gap-[4.8vw] flex flex-col '>
          {reviewData?.length ? reviewData?.map((item, index) => {
            return (
              <div
                key={index}
                className={`${index === 0 && !onlySmallScreen && 'md:col-span-2 big-item md:gap-[2.5vw] review-full'}`}
              >
                <ReviewItem
                  data={item}
                  lang={lang}
                  dictionary={dictionary}
                />
              </div>
            )
          }) : <h3 className='text-[3.5vw] max-md:text-[3.73vw] font-optima font-[600] whitespace-nowrap ml-[85%]'>{notFound}</h3>}
        </div>
      ) : (
        <div className='flex items-center justify-center flex-1 w-full text-center h-[40vh]'>
          <Loading />
        </div>
      )}

      <div className='w-fit m-auto flex md:gap-[0.75vw] gap-[3.2vw] md:mt-[6.538vw] mt-[6.4vw]'>
        {paginations?.map((pagination, index) => {
          return (
            <div
              key={index}
            >
              <span
                className={`${
                  index + 1 === activePage ? 'bg-textColor text-white' : 'bg-primaryColor text-textColor opacity-10 '
                }   rounded-full md:w-[2.125vw] w-[9.07vw] md:h-[2.125vw] h-[9.07vw] text-center md:text-[1.125vw] text-[4.27vw] font-manrope leading-[150%] font-semibold flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  setActivePage(index + 1)
                  refetch({
                    offset: (index + 1) * 7,
                    size: 7
                  })
                }}
              >
                {index + 1}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Reviews
