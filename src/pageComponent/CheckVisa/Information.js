'use client'
import Button from '@/components/Common/Button'
import Image from 'next/image'
import plane from '@/assets/images/checkVisa_Plane.png'
import ExemptVisa from './ExemptVisa'
import { createTheme, useMediaQuery } from '@mui/material'
import { useData } from './DataContext'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ModalCustom from '@/components/Common/ModalCustom'
import BookTour from '@/components/Common/BookTour'
import ApplyVisa from '@/components/Common/ApplyVisa'
import subBannerBg3 from '@/assets/images/subBannerBg3.png'

function Information({ data, lang, dataBookTour, dictionary }) {
  const { dataB, isInitPage } = useData()
  const [openModal, setOpenModal] = useState(false)
  const refBtnBookTour = useRef()
  const dataInfo = data?.checkvisa?.infodetail
  const theme = createTheme({
    breakpoints: {
      values: {
        sm: 768
      }
    }
  })
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const check = dataB?.titleVisa || dataB?.contentVisa
  return (
    <div className='relative w-full'>
      <div className='w-full md:mt-[6.13vw] mt-[11.47vw] md:px-[8.13vw] px-[4.27vw]'>
        {isInitPage && (check ? <ExemptVisa title={dataB?.titleVisa} desc={dataB?.contentVisa} dataInfo={dataInfo} /> : <h2 className='text-[#bf4242] font-optima md:text-[2.5vw] text-[5.86667vw] font-semibold leading-[110%] md:mb-[1.5vw] mb-[2.13vw]'>{dictionary?.message?.not_found_information}</h2>)}
        <div className='md:mt-[1vw] flex md:flex-row flex-col md:gap-[5.6vw] items-center'>
          <div className='flex flex-col'>
            <h2 className='md:text-[2.875vw] font-optima text-[5.86667vw] md:leading-[120%] capitalize md:mb-[1.5vw] mb-[2.1333vw] md:w-[44.625vw] w-[74.66667vw] font-semibold'>
              {data?.checkvisa?.ready?.title}
            </h2>
            <p className='font-optima xl:text-[1vw] md:text-[2vw] text-[3.73333vw] font-normal max-md:w-[91.46667vw] leading-[150%] opacity-80 text-textColor'>
              {data?.checkvisa?.ready?.desc}
            </p>

            <div className='md:mt-[3.75vw] mt-[6.4vw] flex md:gap-[1.88vw] gap-[2.67vw]'>
              <div className='flex' ref={refBtnBookTour} onClick={() => setOpenModal(true)}>
                <Button className='btn-primary' content={dataInfo?.buttonapply}><span>{dataInfo?.buttonapply}</span></Button>
              </div>
              <Link href={`/${lang}/search`}>
                <Button className='btn-secondary' content={dataInfo?.button}><span>{dataInfo?.button}</span></Button>
              </Link>
            </div>
          </div>

          <div className='max-md:my-[8vw]'>
            <Image
              alt='checkvisaimg'
              src={subBannerBg3}
              width={400}
              height={400}
              className='object-cover md:w-full md:h-[33.81563vw]'
              quality={85}
            />
          </div>
        </div>
      </div>
      {openModal && (
        <ModalCustom
          openModal={openModal}
          setOpenModal={setOpenModal}
          className='w-[91.46vw] md:w-[82.93vw] md:h-[90vh] h-[80vh]'
        >
          <div className='w-full h-full overflow-y-auto md:rounded-[16px] overflow-x-hidden'>
            <ApplyVisa data={dataBookTour} setOpenModal={setOpenModal} lang={lang} dictionary={dictionary} />
          </div>
        </ModalCustom>
      )}
    </div>
  )
}

export default Information
