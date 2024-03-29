'use client'
import responsibleBg from '@/assets/images/about/responsibleBg.png'
import Image from 'next/image'

export default function Responsible({ data = {} }) {
  return (
    <section className='relative pb-[7.5vw] rounded-2xl md:rounded-none mt-[-7.2vw] bg-white z-10 md:mt-0'>
      <Image
        src={responsibleBg}
        alt='Responsible Travel'
        quality={85}
        fill
        className='absolute top-0 left-0 w-full h-full z-[-1]'
      />

      <div className='content'>
        {/* title */}
        <div className='text-textColor md:w-[65vw] m-auto mb-[0.6vw] md:mb-[5.25vw] md:pt-[6.125vw] pt-[13.6vw] text-center'>
          <h2
            className='md:text-[4vw] text-[5.86667vw] font-optima font-semibold md:leading-[110%] leading-[120%] mb-[1vw]'
            data-aos-once='true'
            data-aos='fade-up'
            data-aos-duration='1000'
            data-aos-disabled='true'
          >
            {data?.title}
          </h2>
          <div
            data-aos-once='true'
            data-aos-disabled='true'
            data-aos='fade-up'
            data-aos-duration='1200'
            className='md:w-[80%] md:font-manrope leading-[150%] md:text-[1.6vw] xl:text-[1.125vw] text-[3.733vw] opacity-80 text-center m-auto'
          >
            {data?.desc}
          </div>
        </div>

        {/* main content */}

        <div className='flex flex-col md:gap-[6.5vw] gap-[9.07vw]'>
          {data?.posts?.map((post, index) => {
            return (
              <div
                key={index}
                className={`items-center ${
                  index % 2 !== 0 && 'md:flex-row-reverse'
                } md:flex justify-between gap-[4.6875vw] items-end`}
              >
                <main
                  className='mb-[6.4vw] md:mb-0'
                  data-aos-once='true'
                  data-aos-duration='1000'
                  data-aos='fade-right'
                  data-aos-disabled='true'
                >
                  <div className='items-end max-md:flex md:mb-[2vw] max-md:mb-[4.27vw]'>
                    <div className='text-primaryColor md:text-[6vw] leading-[1] max-md:mr-[3vw] text-[17.07vw] font-optima font-semibold opacity-60'>
                      {index < 10 ? `0${index + 1}` : index}
                    </div>
                    <h3 className='text-textColor md:text-[2.8vw] xl:text-[2.5vw] text-[4.27vw] font-optima font-semibold md:leading-[110%] leading-[120%]'>
                      {post.title}
                    </h3>
                  </div>
                  <p className='text-textColor md:text-[1.6vw] xl:text-[1.125vw] text-justify text-[3.733vw] md:font-medium leading-[150%] md:font-manrope opacity-80'>
                    {post.content}
                  </p>
                </main>
                <Image
                  src={post?.image?.sourceUrl}
                  alt={post?.image?.altText || 'post img'}
                  width={1000}
                  height={1000}
                  quality={85}
                  className='md:w-[35.93vw] w-full md:h-[35.93vw] h-[91.47vw] object-cover'
                  data-aos-once='true'
                  data-aos-duration='1000'
                  data-aos='fade-left'
                  data-aos-disabled='true'
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
