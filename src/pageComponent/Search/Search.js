'use client'
import closeImg from '@/assets/images/close.svg'
import { DATA_BEST_TOUR, DATA_TAXONOMIES_BUDGET_GQL, DATA_TAXONOMIES_COUNTRY_GQL, DATA_TAXONOMIES_DURATION_GQL, DATA_TAXONOMIES_TOUR_STYLE_GQL, getDataBestSeller } from '@/graphql/filter/queries'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import ListTour from './ListTour'
import Sidebar from './Sidebar'
import OtherTours from './OtherTours'
import NewRelease from './NewRelease'
import { Button, SwipeableDrawer, useMediaQuery } from '@mui/material'
import theme from '@/components/ThemeRegistry/theme'
import Image from 'next/image'
import { useQueryState } from 'next-usequerystate'
import { GET_ALL_POST_FILTER_BY_COUNTRY } from '@/graphql/post/queries'
const tourBackup = new Array(6).fill()
const Search = ({ lang, searchInfo, dictionary }) => {
  const [des, setDes] = useQueryState('country')
  const [bud, setBud] = useQueryState('budget')
  const [day, setDay] = useQueryState('duration')
  const [travelStyle, setTravelStyle] = useQueryState('style')
  const [seller, setSeller] = useQueryState('seller')

  let params = {
    day: day,
    budget: bud,
    style: travelStyle,
    country: des,
    seller: seller,
  }
  const { data: budgets } = useQuery(DATA_TAXONOMIES_BUDGET_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  const { data: durations } = useQuery(DATA_TAXONOMIES_DURATION_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  const { data: countries } = useQuery(DATA_TAXONOMIES_COUNTRY_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  const { data: styles } = useQuery(DATA_TAXONOMIES_TOUR_STYLE_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  // =================================================================
  const dataFilter = {
    countries: countries?.allCountries?.nodes,
    style: styles?.allTourStyle?.nodes,
    budget: budgets?.allBudget?.nodes,
    duration: durations?.allDuration?.nodes
  }

  function handleTaxonomiesSlug(data) {
    const newArrDataTaxonomies = []
    data?.map((item) => {
      newArrDataTaxonomies.push(item?.slug)
    })
    return newArrDataTaxonomies
  }
  function handleTaxonomiesName(data) {
    const newArrDataTaxonomies = []
    data?.map((item) => {
      newArrDataTaxonomies.push(item?.name)
    })
    return newArrDataTaxonomies
  }
  const newArrDataTaxonomiesCountry = handleTaxonomiesName(dataFilter?.countries)
  const newArrDataTaxonomiesStyleTravel = handleTaxonomiesSlug(dataFilter?.style)
  const newArrDataTaxonomiesBudget = handleTaxonomiesName(dataFilter?.budget)
  const newArrDataTaxonomiesDuration = handleTaxonomiesName(dataFilter?.duration)

  const dataQuery = {
    country: newArrDataTaxonomiesCountry,
    style: newArrDataTaxonomiesStyleTravel,
    budget: newArrDataTaxonomiesBudget,
    duration: newArrDataTaxonomiesDuration
  }
  const { data: dataBestTours, refetch, loading } = useQuery(getDataBestSeller(seller), {
    variables: {
      language: lang?.toUpperCase(),
      countrySlug: !des || !des?.length ? newArrDataTaxonomiesCountry : des,
      styleTourSlug: !travelStyle || !travelStyle?.length ? newArrDataTaxonomiesStyleTravel : typeof travelStyle === 'string' ? travelStyle.split(',') : travelStyle,
      budget: !bud || !bud.length ? newArrDataTaxonomiesBudget : bud,
      duration: !day || !day.length ? newArrDataTaxonomiesDuration : typeof day === 'string' ? day.split(',') : day,
      bestSellerSlug: seller,
      offset: 0,
      size: 9
    }
  })
  const { data: dataBlog } = useQuery(GET_ALL_POST_FILTER_BY_COUNTRY, {
    variables: {
      language: lang?.toUpperCase(),
      destinationName: !des || !des?.length ? newArrDataTaxonomiesCountry : des
    }
  })

  let allTours = dataBestTours?.allTours?.nodes
  const listBlog = dataBlog?.blogs?.nodes

  if (!allTours) {
    allTours = tourBackup
  }

  const pageInfo = dataBestTours?.allTours?.pageInfo?.offsetPagination?.total
  const totalPage = Math.ceil(pageInfo / 9)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [isOpenModal, setIsOpenModal] = useState(false)
  const handleCloseFilter = () => {
    setIsOpenModal(false)
  }

  let search = 'Search'
  if (lang === 'it') {
    search = 'Cerca'
  }
  if (lang === 'fr') {
    search = 'Rechercher'
  }

  return (
    <div className='max-md:mt-[21.6vw] mt-[6.56vw] md:px-[8.13vw] search__page'>
      <div className='flex justify-between max-md:px-[4.27vw] items-center'>
        <h1 className='text-[4vw] font-optima leading-[4.4vw] capitalize font-semibold md:mb-[3.44vw]'>
          {searchInfo?.title}
        </h1>
        <div className='flex md:hidden gap-[1.6vw] items-center' onClick={() => {
          setIsOpenModal(true)
        }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-[4.26667vw] h-[4.26667vw]'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
          >
            <path
              d='M2 4.16699C1.86739 4.16699 1.74021 4.21967 1.64645 4.31344C1.55268 4.40721 1.5 4.53438 1.5 4.66699C1.5 4.7996 1.55268 4.92678 1.64645 5.02055C1.74021 5.11431 1.86739 5.16699 2 5.16699V4.16699ZM2 10.8337C1.86739 10.8337 1.74021 10.8863 1.64645 10.9801C1.55268 11.0739 1.5 11.2011 1.5 11.3337C1.5 11.4663 1.55268 11.5934 1.64645 11.6872C1.74021 11.781 1.86739 11.8337 2 11.8337V10.8337ZM6 11.8337C6.13261 11.8337 6.25979 11.781 6.35355 11.6872C6.44732 11.5934 6.5 11.4663 6.5 11.3337C6.5 11.2011 6.44732 11.0739 6.35355 10.9801C6.25979 10.8863 6.13261 10.8337 6 10.8337V11.8337ZM14 11.8337C14.1326 11.8337 14.2598 11.781 14.3536 11.6872C14.4473 11.5934 14.5 11.4663 14.5 11.3337C14.5 11.2011 14.4473 11.0739 14.3536 10.9801C14.2598 10.8863 14.1326 10.8337 14 10.8337V11.8337ZM10 4.16699C9.86739 4.16699 9.74022 4.21967 9.64645 4.31344C9.55268 4.40721 9.5 4.53438 9.5 4.66699C9.5 4.7996 9.55268 4.92678 9.64645 5.02055C9.74022 5.11431 9.86739 5.16699 10 5.16699V4.16699ZM14 5.16699C14.1326 5.16699 14.2598 5.11431 14.3536 5.02055C14.4473 4.92678 14.5 4.7996 14.5 4.66699C14.5 4.53438 14.4473 4.40721 14.3536 4.31344C14.2598 4.21967 14.1326 4.16699 14 4.16699V5.16699ZM2 5.16699H4V4.16699H2V5.16699ZM2 11.8337H6V10.8337H2V11.8337ZM12 11.8337H14V10.8337H12V11.8337ZM10 5.16699H14V4.16699H10V5.16699ZM11.5 11.3337C11.5 11.7315 11.342 12.113 11.0607 12.3943C10.7794 12.6756 10.3978 12.8337 10 12.8337V13.8337C10.663 13.8337 11.2989 13.5703 11.7678 13.1014C12.2366 12.6326 12.5 11.9967 12.5 11.3337H11.5ZM10 12.8337C9.60218 12.8337 9.22064 12.6756 8.93934 12.3943C8.65804 12.113 8.5 11.7315 8.5 11.3337H7.5C7.5 11.9967 7.76339 12.6326 8.23223 13.1014C8.70107 13.5703 9.33696 13.8337 10 13.8337V12.8337ZM8.5 11.3337C8.5 10.9358 8.65804 10.5543 8.93934 10.273C9.22064 9.99169 9.60218 9.83366 10 9.83366V8.83366C9.33696 8.83366 8.70107 9.09705 8.23223 9.56589C7.76339 10.0347 7.5 10.6706 7.5 11.3337H8.5ZM10 9.83366C10.3978 9.83366 10.7794 9.99169 11.0607 10.273C11.342 10.5543 11.5 10.9358 11.5 11.3337H12.5C12.5 10.6706 12.2366 10.0347 11.7678 9.56589C11.2989 9.09705 10.663 8.83366 10 8.83366V9.83366ZM7.5 4.66699C7.5 5.06482 7.34196 5.44635 7.06066 5.72765C6.77936 6.00896 6.39782 6.16699 6 6.16699V7.16699C6.66304 7.16699 7.29893 6.9036 7.76777 6.43476C8.23661 5.96592 8.5 5.33003 8.5 4.66699H7.5ZM6 6.16699C5.60218 6.16699 5.22064 6.00896 4.93934 5.72765C4.65804 5.44635 4.5 5.06482 4.5 4.66699H3.5C3.5 5.33003 3.76339 5.96592 4.23223 6.43476C4.70107 6.9036 5.33696 7.16699 6 7.16699V6.16699ZM4.5 4.66699C4.5 4.26917 4.65804 3.88764 4.93934 3.60633C5.22064 3.32503 5.60218 3.16699 6 3.16699V2.16699C5.33696 2.16699 4.70107 2.43038 4.23223 2.89923C3.76339 3.36807 3.5 4.00395 3.5 4.66699H4.5ZM6 3.16699C6.39782 3.16699 6.77936 3.32503 7.06066 3.60633C7.34196 3.88764 7.5 4.26917 7.5 4.66699H8.5C8.5 4.00395 8.23661 3.36807 7.76777 2.89923C7.29893 2.43038 6.66304 2.16699 6 2.16699V3.16699Z'
              fill='#171717'
            />
          </svg>
          <p
            className='text-[3.73333vw] leading-[160%] text-textColor'
          >
            {dictionary?.nav?.filter}
          </p>
        </div>
      </div>
      <div className='search flex gap-[3.56vw]'>
        {onlySmallScreen ? (
          <SwipeableDrawer
            sx={{ height: '75vh' }}
            anchor={'bottom'}
            open={isOpenModal}
            onClose={() => setIsOpenModal(false)}
          >
            <div className='bg-white'>
              <Image
                src={closeImg}
                alt='close'
                width={20}
                height={20}
                className='md:hidden absolute md:top-[4.53vw] top-[2.5vw] right-[4.53vw] 
              max-md:w-[4vw] max-md:right-[10vw] max-md:top-[5vw] max-md:h-[4vw] z-50'
                onClick={handleCloseFilter}
              />
            </div>
            <Sidebar
              dataFilter={dataFilter}
              searchInfo={searchInfo}
              isOpenModal={isOpenModal}
              setOpenModal={setIsOpenModal}
              params={params}
              lang={lang}
              onDay={(data) => setDay(data)}
              onDestination={(data) => setDes(data)}
              onTravelStyle={(data) => setTravelStyle(data)}
              onBudget={(data) => setBud(data)}
              onBestSeller={(data) => setSeller(data)}
              dictionary={dictionary}
            />
            <div className='mx-[4.26vw] w-auto my-[8vw] bg-white md:hidden'>
              <Button
                onClick={() => setIsOpenModal(false)}
                sx={{
                  backgroundColor: '#FFD220',
                  textTransform: 'capitalize',
                  width: '89.48vw',
                  borderRadius: '2.13vw',
                  padding: '3.2vw',
                  textAlign: 'center',
                  fontSize: '3.73vw',
                  fontWeight: '600'
                }}
                color='primary'
                variant='contained'
              >
                {search}
              </Button>
            </div>
          </SwipeableDrawer>
        ) : (
          <Sidebar
            dataFilter={dataFilter}
            searchInfo={searchInfo}
            params={params}
            lang={lang}
            onDay={(data) => setDay(data)}
            onDestination={(data) => setDes(data)}
            onTravelStyle={(data) => setTravelStyle(data)}
            onBudget={(data) => setBud(data)}
            onBestSeller={(data) => setSeller(data)}
            isOpenModal={isOpenModal}
            dictionary={dictionary}
          />
        )}
        {
          <div className='flex-1'>
            {allTours?.length !== 0 ? (
              <ListTour
                totalPage={totalPage}
                refetch={refetch}
                allTours={allTours}
                loading={loading}
                results={searchInfo?.foundResults}
                dataFilter={dataFilter}
                lang={lang}
                pageInfo={pageInfo}
              />
            ) : (
              <OtherTours
                dataQuery={dataQuery}
                dataFilter={dataFilter}
                lang={lang}
                params={params}
                results={searchInfo?.foundResults}
                searchInfo={searchInfo} />
            )}
          </div>
        }
      </div>
      {(listBlog && listBlog?.length !== 0) &&
        <NewRelease
          title={searchInfo?.newRelated}
          button={searchInfo?.button}
          lang={lang}
          listBlog={listBlog}
          dictionary={dictionary}
        />
      }
    </div>
  )
}

export default Search
