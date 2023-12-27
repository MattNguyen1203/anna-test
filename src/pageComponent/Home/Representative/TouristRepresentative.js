import Image from 'next/image'
import SlideRepresentMb from './SlideRepresentMb'
import SlideRepresent from './SlideRepresentative'
import bgSurvey from '@/assets/images/bg-survey.png'


function TouristRepresentative({ data }) {
  return (
    <div className='tourist-representative relative pt-[4.69vw] pb-[8.42vw] max-md:pt-[13.81vw]'>
      <Image
        alt='beach'
        src={bgSurvey}
        quality={85}
        fill
        className='absolute w-full h-auto object-cover top-0 z-[-1]'
      />
      <div className='flex md:flex-row flex-col items-center content pb-[6.4vw] md:pb-[3.2vw]'>
        <h2
          className='heading-1 md:w-[28.9375vw] w-full '
          data-aos-once='true'
          data-aos-disabled='true'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          {data?.title}
        </h2>
        <p
          className='text-[1.125vw] max-md:text-[3.73vw] leading-normal text-justify md:w-[36vw] w-full ml-auto max-md:opacity-70 opacity-80 text-textColor max-lg:text-[1.6vw] max-md:mb-[6.4vw]'
          data-aos-once='true'
          data-aos-disabled='true'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          {data?.desc}
        </p>
      </div>
      <div
        data-aos-once='true'
        data-aos-disabled='true'
        data-aos='fade-up'
        data-aos-duration='1000'
        className='max-md:hidden'
      >
        <SlideRepresent data={data?.members} />
      </div>
      <div className='hidden max-md:block'>
        <SlideRepresentMb data={data?.members} />
      </div>
    </div>
  )
}

export default TouristRepresentative
