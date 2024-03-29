'use client'
import iconDropdown from '@/assets/images/arrow-up.svg'
import fbIcon from '@/assets/images/facebook.svg'
import instarIcon from '@/assets/images/instar.svg'
import linkedIcon from '@/assets/images/linkedin.svg'
import logo from '@/assets/images/logo.svg'
import ytbIcon from '@/assets/images/youtube.svg'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import Button from '../Common/Button'
import SelectLang from '../Language/SelectLang'
import ServiceItem from './RecomendServices/ServiceItem'

import dynamic from 'next/dynamic'
const InputSearchMb = dynamic(() => import('../Common/InputSearchMb'))

function MenuMb({
  onCloseMenu,
  hotDeals,
  lang,
  dataMenuCountry,
  travelStylesList,
  rcmServicesList,
  menu,
  dataHome,
  titleAboutUs,
  contactInfo,
  socialMobile,
  dataFilter
}) {
  const [selected, setSelected] = useState(null)
  const contentEle = useRef()
  const contentEle2 = useRef()
  const contentEle3 = useRef()
  const contentEle4 = useRef()
  const contentEle5 = useRef()
  const handleSelect = (num) => {
    if (num === selected) {
      setSelected(null)
    } else {
      setSelected(num)
    }
  }

  let all = 'See all'
  if (lang === 'it') {
    all = 'Vedi tutto'
  }
  if (lang === 'fr') {
    all = 'Voir tout'
  }

  return (
    <div className='menu-mobile pb-[41.33vw]'>
      <div className='flex items-center justify-center h-[14.93vw] border-b border-solid border-textColor border-opacity-20'>
        <div className='flex items-center content'>
          <Link
            href={`/`}
            prefetch={false}
          >
            <Image
              src={logo}
              width={100}
              height={100}
              quality={85}
              alt='viva-travel'
              className='w-[10.4vw] object-cover'
            />
          </Link>
          <div className='flex-1 hidden max-lg:block'>
            <InputSearchMb
              lang={lang}
              dataFilter={dataFilter}
            />
          </div>
          <div
            className='cursor-pointer close'
            onClick={onCloseMenu}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='26'
              height='26'
              viewBox='0 0 26 26'
              fill='none'
              className='w-[6.93vw] h-[6.93vw] object-cover'
            >
              <line
                x1='20.0581'
                y1='7.17899'
                x2='7.04918'
                y2='20.188'
                stroke='#000'
                strokeWidth='1.2265'
              />
              <line
                x1='19.1909'
                y1='20.0576'
                x2='6.18192'
                y2='7.04863'
                stroke='#000'
                strokeWidth='1.2265'
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className='mt-[8.53vw] content'
        style={{ paddingTop: '4.27vw' }}
      >
        {/* Item 1 */}
        <div className='border-b border-solid row-menu border-textColor border-opacity-20'>
          <div
            className={`flex items-center justify-between ${selected === 1 ? 'active' : ''}`}
            onClick={() => handleSelect(1)}
          >
            <h3 className='text-[5.33vw] leading-[1.2] capitalize opacity-60'>{dataHome?.nav1}</h3>
            <Image
              src={iconDropdown}
              width={11}
              height={8}
              alt='img'
              className='drop-down max-lg:w-[3vw]'
            />
          </div>
          <div
            className='list menu-mb_item flex items-center gap-[7.47vw] !overflow-x-auto mt-[3.73vw] '
            ref={contentEle}
            style={
              selected === 1
                ? {
                    height: '28vw',
                    overflow: 'visible'
                  }
                : { height: '0px', overflow: 'hidden' }
            }
          >
            <div className='flex items-center gap-[7.47vw]'>
              {dataMenuCountry?.map((tour, index) => (
                <Link
                  href={`/${lang}/destinations/${tour?.slug}`}
                  key={index}
                  className='flex flex-col items-center justify-center flex-shrink-0'
                  onClick={onCloseMenu}
                  prefetch={false}
                >
                  <Image
                    src={tour?.country?.flag?.sourceUrl}
                    width={50}
                    height={50}
                    quality={85}
                    alt='img'
                    className='w-[14.93vw] h-[14.93vw] rounded-full object-cover'
                  />
                  <span className='uppercase text-[2.67vw] mt-[1.6vw] block'>{tour?.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Item 2 */}
        <div className='border-b border-solid row-menu border-textColor border-opacity-20'>
          <div
            className={`flex items-center justify-between mt-[3.73vw] ${selected === 2 ? 'active' : ''}`}
            onClick={() => handleSelect(2)}
          >
            <h3 className='text-[5.33vw] leading-[1.2] capitalize opacity-60'>{dataHome?.nav2}</h3>
            <Image
              src={iconDropdown}
              width={11}
              height={8}
              alt='img'
              className='drop-down max-lg:w-[3vw]'
            />
          </div>
          <div
            className='grid menu-mb_item grid-cols-3 gap-x-[15.2vw] gap-y-[7.47vw] mt-[4.27vw] px-[2.67vw] '
            ref={contentEle2}
            style={
              selected === 2
                ? {
                    height: contentEle2.current.scrollHeight,
                    overflow: 'visible'
                  }
                : { height: '0px', overflow: 'hidden' }
            }
          >
            {travelStylesList?.data?.allTourStyle?.nodes?.map((item, index) => (
              <div key={index}>
                <Link
                  href={`/${lang}/types-of-trips/${item?.slug}`}
                  className='flex flex-col items-center'
                  onClick={onCloseMenu}
                  prefetch={false}
                >
                  <div className='w-[17.3vw] h-[17.3vw] rounded-full border border-solid border-primaryColor flex items-center justify-center bg-[#FFFBE9]'>
                    <Image
                      src={item?.banner?.travelStyleInfo?.travelStyleImage?.sourceUrl}
                      width={50}
                      height={50}
                      quality={85}
                      alt='img'
                      className='w-[10.8vw] h-[10.8vw]  object-contain object-center'
                    />
                  </div>
                  <span className='uppercase text-[2.67vw] mt-[1.6vw] block text-center'>{item?.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* Item 3 */}
        <div className='row-menu border-textColor border-opacity-20'>
          <div
            className={`flex items-center justify-between mt-[3.73vw] ${selected === 3 ? 'active' : ''}`}
            onClick={() => handleSelect(3)}
          >
            <h3 className='text-[5.33vw] leading-[1.2] capitalize opacity-60'>
              <Link
                href={`/${lang}/hot-deals`}
                onClick={onCloseMenu}
                prefetch={false}
              >
                {dataHome?.nav3}
              </Link>
            </h3>
          </div>
        </div>
        {/* Item 4 */}
        <div className='row-menu'>
          <div
            className={`flex items-center justify-between mt-[3.73vw] ${selected === 4 ? 'active' : ''}`}
            onClick={() => handleSelect(4)}
          >
            <h3 className='text-[5.33vw] leading-[1.2] capitalize opacity-60'>{dataHome?.nav6}</h3>
            <Image
              src={iconDropdown}
              width={11}
              height={8}
              alt='img'
              className='drop-down max-lg:w-[3vw]'
            />
          </div>
          <div
            className={`hidden-scroll flex overflow-x-auto gap-[3.2vw] mt-[3.73vw] menu-mb_item rcmService_mb`}
            ref={contentEle4}
            style={
              selected === 4
                ? {
                    height: contentEle4.current.scrollHeight,
                    overflow: 'auto'
                  }
                : { height: '0px', overflow: 'hidden' }
            }
          >
            {rcmServicesList?.data?.categories?.nodes?.map((item, index) => (
              <ServiceItem
                key={index}
                data={item}
                lang={lang}
                onCloseMenu={onCloseMenu}
              />
            ))}
          </div>
        </div>
        {/* Item 5 */}
        <div className='flex items-center justify-between'>
          <Link
            href={`/${lang}/check-visa`}
            className='text-[5.33vw] opacity-60 capitalize leading-[1.2]'
            onClick={onCloseMenu}
            prefetch={false}
          >
            {dataHome?.nav4}
          </Link>
          <SelectLang lang={lang} />
        </div>
        {/* Item 6 */}
        <div className='row-menu'>
          <div
            className={`flex items-center justify-between mt-[3.73vw] w-max ${selected === 5 ? 'active' : ''}`}
            onClick={() => handleSelect(5)}
          >
            <h3 className='text-[5.33vw] leading-[1.2] capitalize opacity-60 mr-[3.2vw]'>{dataHome?.nav5}</h3>
            <Image
              src={iconDropdown}
              width={11}
              height={8}
              alt='img'
              className='drop-down max-lg:w-[3vw]'
            />
          </div>
          <div
            className='flex flex-col gap-[3.2vw] mt-[5.07vw] menu-mb_item'
            ref={contentEle5}
            style={
              selected === 5
                ? {
                    height: contentEle5.current.scrollHeight,
                    overflow: 'visible'
                  }
                : { height: '0px', overflow: 'hidden' }
            }
          >
            <Link
              href={`/${lang}/about-us/${titleAboutUs?.whoWeAreSlug}`}
              className='text-[3.667vw] text-textColor opacity-70 uppercase'
              onClick={onCloseMenu}
              prefetch={false}
            >
              {titleAboutUs?.whoWeAre}
            </Link>
            <Link
              href={`/${lang}/about-us/${titleAboutUs?.ResTravelSlug}`}
              className='text-[3.667vw] text-textColor opacity-70 uppercase'
              onClick={onCloseMenu}
              prefetch={false}
            >
              {titleAboutUs?.ResTravel}
            </Link>
            <Link
              href={`/${lang}/about-us/${titleAboutUs?.AboutUsSlug}`}
              className='text-[3.667vw] text-textColor opacity-70 uppercase'
              onClick={onCloseMenu}
              prefetch={false}
            >
              {titleAboutUs?.AboutUs}
            </Link>

            <Link
              href={`/${lang}/about-us/${titleAboutUs?.legacySlug}`}
              className='text-[3.667vw] text-textColor opacity-70 uppercase'
              onClick={onCloseMenu}
              prefetch={false}
            >
              {titleAboutUs?.legacy}
            </Link>
          </div>
        </div>
        {/* Item 7 */}
        <div>
          <Link
            href={`/${lang}/blog`}
            className='text-[5.33vw] opacity-60 capitalize leading-[1.2]'
            onClick={onCloseMenu}
            prefetch={false}
          >
            {dataHome?.nav7}
          </Link>
        </div>
        <span className='text-[3.2vw] opacity-80 mt-[20.8vw] block text-center'>
          {contactInfo && `${contactInfo[1]?.title}: ${contactInfo[1]?.content}`}
        </span>
        <Button className='btn-primary mt-[1.6vw] w-full items-center justify-center'>
          <span className='max-lg:text-[3.2vw]'>
            {contactInfo && `${contactInfo[0]?.title}: ${contactInfo[0]?.content}`}
          </span>
        </Button>
        {/* Socials */}
        <div className='flex items-center gap-[4.27vw] mt-[3.2vw] justify-center'>
          <Link
            href={socialMobile?.data?.page?.translation?.home?.footer?.column1?.linkFb ?? ''}
            className='max-md:w-[9.6vw] md:w-[6vw] md:h-[6vw] max-md:h-[9.6vw] rounded-full flex items-center justify-center border border-solid border-[#000] fb'
            prefetch={false}
          >
            <Image
              src={fbIcon}
              width={100}
              height={100}
              alt='img'
              className='object-cover max-md:w-[1.875vw] md:w-fit max-md:h-[3.5vw]'
            />
          </Link>

          <Link
            href={socialMobile?.data?.page?.translation?.home?.footer?.column1?.linkLinked ?? ''}
            className='max-md:w-[9.6vw] max-md:h-[9.6vw] md:w-[6vw] md:h-[6vw] rounded-full flex items-center justify-center border border-solid border-[#000] linked'
            prefetch={false}
          >
            <Image
              src={linkedIcon}
              width={100}
              height={100}
              alt='img'
              className='max-md:w-[3.36vw]  md:w-fit max-md:h-[3.36vw] object-cover'
            />
          </Link>
          <Link
            href={socialMobile?.data?.page?.translation?.home?.footer?.column1?.linkInstargram ?? ''}
            className='max-md:w-[9.6vw] max-md:h-[9.6vw] md:w-[6vw] md:h-[6vw] rounded-full flex items-center justify-center border border-solid border-[#000] instar'
            prefetch={false}
          >
            <Image
              src={instarIcon}
              width={100}
              height={100}
              alt='img'
              className='max-md:w-[3.84vw] md:w-fit max-md:h-[3.84vw] object-cover'
            />
          </Link>
          <Link
            href={socialMobile?.data?.page?.translation?.home?.footer?.column1?.linkYoutube ?? ''}
            className='max-md:w-[9.6vw]  md:w-[6vw] md:h-[6vw] max-md:h-[9.6vw] rounded-full flex items-center justify-center border border-solid border-[#000] ytb'
            prefetch={false}
          >
            <Image
              src={ytbIcon}
              width={100}
              height={100}
              alt='img'
              className='object-contain md:w-fit max-md:w-[4.28vw] max-md:h-[3.5vw]'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MenuMb
