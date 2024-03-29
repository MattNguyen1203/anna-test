import Image from 'next/image'
import icon from '@/assets/images/logoMega.svg'
import Link from 'next/link'
function AboutItem({ data, slug, onCloseMenu, lang }) {
  return (
    <Link
      href={`/${lang}/${slug}`}
      className='relative w-[26.25vw] h-fit ourTour_menu rounded-[0.625vw]'
      onClick={onCloseMenu}
      prefetch={false}
    >
      <Image
        src={data?.backgroundMenu?.sourceUrl || data?.image?.sourceUrl}
        width={200}
        height={200}
        quality={85}
        alt={data?.backgroundMenu?.altText || data?.image?.altText}
        className='h-[19vw] w-full object-cover rounded-[0.625vw]'
      />
      <div className='absolute bottom-0 pb-[1.95vw] z-10 flex flex-col items-center justify-center w-full'>
        <Image
          src={icon}
          width={100}
          height={100}
          quality={85}
          alt='img'
          className='w-[3.56vw] h-[2.625vw] object-contain'
        />
        <span className='text-[2vw] text-white text-center uppercase font-optima mt-[0.68vw] block font-[600]'>{data?.title}</span>
      </div>
      <div
        className='absolute bottom-0 left-0 right-0 h-[10.9375vw] rounded-[0.625vw] bg-menuOverlaySty'
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.37) 41.89%, rgba(0, 0, 0, 0.81) 100%)'
        }}
      ></div>
    </Link>
  )
}

export default AboutItem
