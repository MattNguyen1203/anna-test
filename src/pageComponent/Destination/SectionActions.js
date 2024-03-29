import fetchData from '@/data/fetchData'
import { DATA_COUNTRY, DATA_ICONS_COUNTRY } from '@/graphql/country/queries'
import ListAction from './ListAction'
import { Skeleton } from '@mui/material'
async function SectionActions({ lang, slug }) {
  const [dataCountry, dataIcons] = await Promise.all([
    fetchData(DATA_COUNTRY, {
      language: lang?.toUpperCase(),
      taxonomyValue: slug
    }),
    fetchData(DATA_ICONS_COUNTRY, { language: lang.toUpperCase(), slug: "cG9zdDozMDQ1" })
  ])

  const listActions = dataIcons?.data?.page?.translation

  const data = dataCountry?.data?.countries

  const infoCountry = data?.translation?.country?.info

  const arrInfoCountry = []
  arrInfoCountry.push(infoCountry?.population)
  arrInfoCountry.push(infoCountry?.area)
  arrInfoCountry.push(infoCountry?.language)
  arrInfoCountry.push(infoCountry?.currency)
  arrInfoCountry.push(infoCountry?.wheather)
  arrInfoCountry.push(infoCountry?.timze)


  return (
    <div className='md:px-[10.25vw] justify-between px-[8vw] md:rounded-[0] rounded-[4.27vw] md:mt-[4vw] relative md:top-0 top-[-5vw] bg-white md:pt-[0] pt-[16.53vw] md:pb-[0] pb-[15vw] grid max-md:grid-cols-3 max-md:gap-y-[6.53vw] max-md:gap-x-[14.93vw] grid-cols-6 gap-[7.38vw] md:grid-rows-1'>
      {listActions?.travelStyle?.icons?.map((action, index) => (
        <ListAction
          key={index}
          icon={action?.image?.sourceUrl}
          title={action?.name}
          desc={arrInfoCountry[index]}
        />
      ))}
    </div>
  )
}

SectionActions.Skeleton = function SectionActionsSkeleton() {
  return (
    <div className='md:px-[10.25vw] justify-between px-[8vw] md:rounded-[0] rounded-[4.27vw] md:mt-[4vw] relative md:top-0 top-[-5vw] bg-white md:pt-[0] pt-[16.53vw] md:pb-[0] pb-[15vw] grid max-md:grid-cols-3 max-md:gap-y-[6.53vw] max-md:gap-x-[14.93vw] grid-cols-6 gap-[7.38vw] md:grid-rows-1'>
      {[...Array(6)].map((_, index) => (
        <div key={index} className='flex flex-col items-center justify-center'>
          <div className='md:w-[5vw] md:h-[5vw] w-[12.8vw] h-[12.8vw]'>
            <Skeleton variant="circular" width="100%" height="100%" />
          </div>
          <div className='text-[#171717] text-center font-manrope md:text-[1.25vw] text-[3.2vw] font-extrabold leading-[150%] mt-[1.5vw] '>
            <Skeleton
              variant='text'
              width={100}
              height={40}
            />
          </div>
        </div>

      ))}
    </div>
  )
}

export default SectionActions
