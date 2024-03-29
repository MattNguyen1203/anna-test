import coconut from '@/assets/images/coconut.png'
import Button from '@/components/Common/Button'
import Image from 'next/image'
import Link from 'next/link'
import SlideReview from './SlideReview'
import VideoReview from './VideoReview'
import bgReview from '@/assets/images/bg-rev.png'

function Review({ data, button, lang }) {
  return (
    <div>
      <div className='flex gap-x-[2vw] items-end overflow-hidden relative custom-review pt-[9.37vw]'>
        <Image
          alt='beach'
          src={bgReview}
          quality={85}
          fill
          className='absolute w-full h-auto object-cover top-0 z-[-1]'
        />
        <Image
          alt='tree'
          src={coconut}
          quality={85}
          fill
          className='max-md:hidden absolute md:w-[17.5vw] md:h-[20.625vw] top-[5vw] right-0'
        />
        <div className='w-[35.1875vw] max-md:hidden'>
          <VideoReview
            className='video__review'
            data={data?.video}
            videoInfo={data?.customerReview?.customerReview}
            lang={lang}
          />
        </div>
        <div className='w-[62vw] max-md:w-full'>
          <h2
            data-aos-once='true'
            data-aos-disabled='true'
            data-aos='fade-up'
            data-aos-duration='1000'
            data-aos-offset='-1200'
            className='heading-1 max-md:pl-[4.27vw]'
          >
            {data?.title}
          </h2>
          <p
            data-aos-once='true'
            data-aos-disabled='true'
            data-aos='fade-up'
            data-aos-duration='1000'
            data-aos-offset='-1200'
            className='text-[1.125vw] leading-normal mb-[5.31vw] w-[30.875vw] max-md:text-[3.73vw] max-md:w-full max-md:pl-[4.27vw] max-md:mt-[2.13vw] max-lg:w-[40vw] max-lg:text-[1.6vw]'
            dangerouslySetInnerHTML={{ __html: `${data?.text}` }}
          ></p>
          <SlideReview
            data={data?.listReview}
            lang={lang}
          />
        </div>
      </div>
      <div className='mt-[3.5vw] flex justify-center max-md:hidden'>
        <Link href={`/${lang}/about-us/reviews`}>
          <Button
            className='btn-secondary'
            content={button?.buttonseemore}
          >
            <span>{button?.buttonseemore}</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Review
