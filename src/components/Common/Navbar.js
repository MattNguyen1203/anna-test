'use client'

import logo from '@/assets/images/VIVA-LOGO-02.png'
import bars from '@/assets/images/bars.svg'
import bookTourIcon from '@/assets/images/bookTourIcon.svg'
import planeF from '@/assets/images/planeF.svg'
import MenuDestinations from '@/components/Menu/Destinations'
// import MenuRcmService from '@/components/Menu/RecomendServices'
// import MenuStyle from '@/components/Menu/TravelStyle'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import SelectLang from '../Language/SelectLang'
// import MenuAbout from '../Menu/AboutUs/MenuAbout'
// import MenuMb from '../Menu/MenuMb'
// import BookTour from './BookTour'
// import InputSearchMb from './InputSearchMb'
// import ModalCustom from './ModalCustom'
import { createTheme, useMediaQuery } from '@mui/material'
import { usePathname } from 'next/navigation'
import { DataProvider } from '../Menu/DataContextMenu'
import Button from './Button'

import dynamic from 'next/dynamic'
const ModalCustom = dynamic(() => import('./ModalCustom'))

const MenuStyle = dynamic(() => import('@/components/Menu/TravelStyle'))

const MenuAbout = dynamic(() => import('../Menu/AboutUs/MenuAbout'))

const MenuMb = dynamic(() => import('../Menu/MenuMb'))
const BookTour = dynamic(() => import('./BookTour'))
const InputSearchMb = dynamic(() => import('./InputSearchMb'))
const MenuRcmService = dynamic(() => import('@/components/Menu/RecomendServices'))


const theme = createTheme({
  breakpoints: {
    values: {
      sm: 1023
    }
  }
})
export default function Navbar({
  dictionary,
  socialMobile,
  lang,
  dataHome,
  dataMenuCountry,
  travelStylesList,
  rcmServicesList,
  hotDeals,
  dataAboutUs,
  dataBookTour,
  contactInfo,
  dataFilter
}) {
  const refMb = useRef()
  const refMenu = useRef()
  const refNav = useRef()
  const refOverlay = useRef()
  const refBtnBookTour = useRef()
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const titleAboutUs = {
    whoWeAre: dataAboutUs?.wwrRes?.who_we_are?.banner?.title,
    ResTravel: dataAboutUs?.rtRes?.responsibleTravel?.banner?.title,
    AboutUs: dataAboutUs?.rvRes?.aboutUsReviews?.banner?.title,
    whoWeAreSlug: dataAboutUs?.wwrRes?.who_we_are?.banner?.slug,
    ResTravelSlug: dataAboutUs?.rtRes?.responsibleTravel?.banner?.slug,
    AboutUsSlug: dataAboutUs?.rvRes?.aboutUsReviews?.banner?.slug,
    legacy:dataAboutUs?.lgRes?.aboutUsLegacy?.title,
    legacySlug:dataAboutUs?.lgRes?.slug
  }
  //check pathName
  const pathName = usePathname()
  const [openModal, setOpenModal] = useState(false)

  const pathNameMbExclude = ['/blog', '/book-tour', 'recommended-services', '/review', '/search', '/voucher']
  const pathNamePcExclude = ['/destinations', '/types-of-trips', '/about-us', '/hot-deals', '/check-visa', '/blog', '/book-tour', 'recommended-services', '/review', '/search', '/voucher']

  useEffect(() => {
    const nav = document.querySelector('.navbar')
    const menuItems = refMenu?.current?.querySelectorAll('.menu-item')
    const menuNavs = refMenu?.current?.querySelectorAll('.nav-link:has(.menu-item)')
    // check header transpent or not
    const isTrans = onlySmallScreen
      ? !pathNameMbExclude.some((item) => pathName.includes(item)) && pathName !== "/" && pathName !== "/fr" && pathName !== "/it"
      : !pathNamePcExclude.some((item) => pathName.includes(item)) && pathName !== "/" && pathName !== "/fr" && pathName !== "/it"

    if (isTrans) {
      nav.classList.add('nav-mb-special')
    } else {
      nav.classList.remove('nav-mb-special')
    }

    //-------------------------
    window.addEventListener('scroll', function () {
      var scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (scrollPosition >= 200) {
        nav.classList.add('nav-active')
        nav.classList.remove('nav-mb-special')
        menuNavs.forEach((item, index) => {
          item.classList.remove('show')
        })
      } else {
        nav.classList.remove('nav-active')
        if (isTrans) {
          nav.classList.add('nav-mb-special')
        } else {
          nav.classList.remove('nav-mb-special')
        }
      }
    })
    // ===========================
    window.addEventListener('scroll', headerSticky)
    let lastScrolledPos = 0
    function headerSticky() {
      if (lastScrolledPos >= window.scrollY) {
        // nav.classList.remove('header-hide')
        if (menuItems) {
          menuItems.forEach((item) => {
            item.style.display = 'block'
            if (refOverlay.current) {
              refOverlay.current.style.display = 'block'
            }
          })
        }
      } else {
        // nav.classList.add('header-hide')
        if (menuItems) {
          menuItems.forEach((item) => {
            item.style.display = 'none'
            if (refOverlay.current) {
              refOverlay.current.style.display = 'none'
            }
          })
        }
      }
      lastScrolledPos = window.scrollY
    }

    menuItems?.forEach((item, index) => {
      var distance = menuNavs[index].getBoundingClientRect().left + menuNavs[index].clientWidth / 2
      item.style.transformOrigin = `${distance}px top`
    })
    menuNavs?.forEach((item, index) => {
      item.addEventListener('mouseover', function () {
        nav.classList.remove('nav-mb-special')
        item.classList.add('show')
        refOverlay.current.classList.add('active')
        if (menuItems) {
          menuItems.forEach((item) => {
            item.style.display = 'block'
            refOverlay.current.style.display = 'block'
          })
        }
        menuItems[index].style.transition = 'all 0.5s'
      })
      item.addEventListener('mouseout', function () {
        item.classList.remove('show')
        refOverlay.current.classList.remove('active')
        if (pathName.includes('tours') && !pathName.includes('destinations') && window.pageYOffset === 0) {
          nav.classList.add('nav-mb-special')
        } else {
          nav.classList.remove('nav-mb-special')
        }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName, onlySmallScreen])

  const handleCloseMenu = () => {
    const menuLink = refMenu?.current?.querySelector('.nav-link.show')
    const menuItem = refMenu?.current?.querySelector('.nav-link.show .menu-item')

    if (menuItem && menuLink) {
      menuLink.classList.remove('show')
      menuItem.style.transition = 'none'
      refOverlay.current.classList.remove('active')
    }
  }
  const handleClickBars = () => {
    refMb.current.classList.add('active')
  }
  const handleClickClose = () => {
    refMb.current.classList.remove('active')
  }

  const handleCloseNav = () => {
    if (refNav.current.classList.contains('nav-mb-special') && onlySmallScreen) {
      refNav.current.classList.remove('nav-mb-special')
    }
  }

  const book = dictionary.nav.booking_button
  const hot = dictionary.nav.hot
  const listTour = dictionary.nav.all_our_tours

  return (
    <div className='nav-container'>
      <nav
        className={`bg-white w-[100vw] navbar h-[5.375vw] max-lg:h-[14.93vw]`}
        ref={refNav}
      >
        <div
          className={`bg-trans flex items-center h-full w-full bg-white ${lang === 'fr' ? 'px-[6.125%]' : 'px-[8.125%]'
            }`}
        >
          <div className='flex items-center gap-x-[2vw]'>
            <Link href={`/${lang}`} prefetch={false}>
              <Image
                src={logo}
                width={100}
                height={100}
                alt='viva-travel'
                className='nav-logo w-[6.5vw] object-cover max-lg:w-[10.4vw]'
              />
            </Link>
            <div
              className='nav-list max-lg:hidden flex items-center gap-x-[2vw] mr-[6vw]'
              ref={refMenu}
            >
              <div className='relative flex flex-shrink-0'>
                <div
                  className='capitalize text-[1vw] nav-link cursor-pointer'
                  menu={dataHome?.nav1}
                >
                  <span>{dataHome?.nav1}</span>
                  <div className='menu-item'>
                    <MenuDestinations
                      data={dataMenuCountry}
                      lang={lang}
                      onCloseMenu={handleCloseMenu}
                    />
                  </div>
                </div>
              </div>
              <div
                className='capitalize text-[1vw] nav-link cursor-pointer'
                menu={dataHome?.nav2}
              >
                <span>{dataHome?.nav2}</span>
                <div className='menu-item '>
                  <MenuStyle
                    travelStylesList={travelStylesList}
                    lang={lang}
                    onCloseMenu={handleCloseMenu}
                  />
                </div>
              </div>
              <Link
                href={`/${lang}/hot-deals`}
                className='capitalize text-[1vw] nav-link cursor-pointer relative'
                menu={dataHome?.nav3}
                prefetch={false}
                // onClick={handleCloseMenu}
              >
                <span>{dataHome?.nav3}</span>
                <span className='icon-hot absolute top-[-0.75vw] right-[-0.375vw] px-[0.625vw] rounded-[99px] bg-primaryColor text-[0.75vw]'>
                  {hot}
                </span>
              </Link>
              <Link
                href={`/${lang}/check-visa`}
                className='capitalize text-[1vw] nav-link '
                menu={dataHome?.nav4}
                prefetch={false}
              >
                <span>{dataHome?.nav4}</span>
              </Link>
              <div
                className='capitalize text-[1vw] nav-link cursor-pointer'
                menu={dataHome?.nav5}
              >
                <span>{dataHome?.nav5}</span>
                <div className='menu-item'>
                  <MenuAbout
                    dataAboutUs={dataAboutUs}
                    onCloseMenu={handleCloseMenu}
                    lang={lang}
                  />
                </div>
              </div>
              <div
                className='capitalize text-[1vw] nav-link cursor-pointer'
                menu={dataHome?.nav6}
              >
                <span>{dataHome?.nav6}</span>
                <div className='menu-item'>
                  <MenuRcmService
                    rcmServicesList={rcmServicesList}
                    lang={lang}
                    onCloseMenu={handleCloseMenu}
                  />
                </div>
              </div>
              <Link
                href={`/${lang}/blog`}
                className='capitalize text-[1vw] nav-link cursor-pointer'
                menu={dataHome?.nav7}
                prefetch={false}
              >
                <span>{dataHome?.nav7}</span>
              </Link>
            </div>
          </div>
          <div
            className='flex ml-auto max-lg:hidden'
            ref={refBtnBookTour}
            // onClick={handleOpenPopup}
            onClick={() => setOpenModal(true)}
          >
            <Button className='flex-shrink-0 btn-primary mr-[3vw] px-4 ml-2.5'>
              <Image
                src={bookTourIcon}
                width={50}
                height={50}
                alt='img'
                className='w-[1.25vw] object-cover mr-[0.75vw]'
              />
              {book}
            </Button>
          </div>
          <div className='flex-shrink-0 max-lg:hidden'>
            <SelectLang lang={lang} />
          </div>
          <div className='flex-1 hidden max-lg:block'>
            <DataProvider>
              <InputSearchMb
                lang={lang}
                onCloseNav={handleCloseNav}
                dataFilter={dataFilter}
              />
            </DataProvider>
          </div>
          <Image
            src={bars}
            width={50}
            height={50}
            alt='bars'
            className={`w-[4.8vw] h-[2.93vw] ml-auto object-cover cursor-pointer hidden max-lg:block`}
            onClick={handleClickBars}
          />
        </div>
      </nav>
      <div
        className='menu-popup fixed inset-0 hidden overflow-x-hidden overflow-y-auto w-full h-full bg-white nav-mobile max-lg:block !z-[199] nav-mobile'
        ref={refMb}
      >
        <DataProvider>
          <MenuMb
            dataHome={dataHome}
            socialMobile={socialMobile}
            onCloseMenu={handleClickClose}
            lang={lang}
            titleAboutUs={titleAboutUs}
            hotDeals={hotDeals}
            dataMenuCountry={dataMenuCountry}
            travelStylesList={travelStylesList}
            rcmServicesList={rcmServicesList}
            menu
            contactInfo={contactInfo}
            dataFilter={dataFilter}
          />
        </DataProvider>
      </div>
      <div
        className={`${(pathName.includes('tours') && !pathName.includes('destinations')) || pathName.includes('hot-deals/')
          ? 'max-md:hidden'
          : ''
          } books-footer h-[15.2vw] fixed bottom-0 left-0 right-0 z-[99] hidden max-md:flex`}
      >
        <Link
          href={`/${lang}/search`}
          className='flex items-center gap-[1.6vw] w-[50%] bg-[#fff] justify-center'
          prefetch={false}
        >
          <Image
            src={planeF}
            width={50}
            height={50}
            alt='img'
            className='w-[4.26vw] h-[4.26vw]'
          />
          <span className='text-[3.46vw] font-[500]'>{listTour}</span>
        </Link>
        <div
          onClick={() => setOpenModal(true)}
          className='flex items-center gap-[1.6vw] w-[50%] bg-[#FFD220] justify-center'
        >
          <Image
            src={bookTourIcon}
            width={50}
            height={50}
            alt='img'
            className='w-[4.26vw] h-[4.26vw]'
          />
          <span className='text-[3.46vw] font-[500]'>{book}</span>
        </div>
      </div>

      {openModal && (
        <ModalCustom
          openModal={openModal}
          setOpenModal={setOpenModal}
          className='w-[91.46vw] md:w-[82.93vw] md:h-[90vh] h-[80vh]'
        >
          <div className='w-full h-full overflow-y-auto md:rounded-[16px] overflow-x-hidden'>
            <BookTour
              data={dataBookTour}
              setOpenModal={setOpenModal}
              lang={lang}
              dictionary={dictionary}
            />
          </div>
        </ModalCustom>
      )}
      <div
        className='overlay'
        ref={refOverlay}
      ></div>
    </div>
  )
}
