'use client'

import Button from '@/components/Common/Button'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import PopupSearch from './PopupSearch'
import searchIcon from '@/assets/images/search-normal.svg'
import { usePathname } from 'next/navigation'

export default function SearchButton({ lang }) {
  const pathName = usePathname()
  const [popup, setPopup] = useState(false)
  const searchRef = useRef()
  useEffect(() => {
    if (pathName.includes('/search') || pathName.includes('/destinations')) {
      searchRef.current.classList.add('hidden')
    } else {
      searchRef.current.classList.remove('hidden')
    }
  }, [pathName])

  function handleOpenPopup() {
    setPopup(true)
  }
  function handleClosePopup() {
    setPopup(false)
  }
  let search = 'Search'
  if(lang === 'fr') {
    search = 'Rechercher'
  }
  if(lang === 'it') {
    search = 'Cerca'
  }

  return (
    <div ref={searchRef}>
      <div className='fixed right-0 bottom-[50%] max-lg:hidden z-[45]'>
        <Button
          className='py-[1vw] px-[1.5vw] bg-primaryColor flex items-center text-[1vw] font-[500] gap-x-[0.75vw] cursor-pointer'
          onClick={handleOpenPopup}
        >
          <Image
            src={searchIcon}
            width={50}
            height={50}
            alt="search icon"
            className='w-[1.25vw] h-[1.25vw]'
          />
          {/* {search} */}
        </Button>
      </div>
      {popup && (
        <div className='fixed left-0 top-0 flex items-center justify-center z-[99] w-full h-full transition-all'>
          <PopupSearch lang={lang} onClose= {handleClosePopup}/>
          <div
            onClick={handleClosePopup}
            className='absolute inset-0 max-md:block'
            style={{ background: 'rgba(0,0,0,0.6)' }}
          ></div>
        </div>
      )}
    </div>
  )
}
