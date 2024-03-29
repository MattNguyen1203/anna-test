import Image from 'next/image'
import Link from 'next/link'
function ServiceItem({ data, lang, onCloseMenu }) {
  return (
    <Link
      href={`/${lang}/recommended-services/${data?.slug}`}
      onClick={onCloseMenu}
      className='flex-1 rounded-[1vw]'
      prefetch={false}
    >
      <div className='relative h-[19vw] ourTour_menu max-md:h-[36vw] max-md:w-[52.53vw] max-lg:w-full max-md:flex-shrink-0 rounded-[1vw]'>
        {data?.recommendservice?.recommendservice?.image && (
          <Image
            src={data?.recommendservice?.recommendservice?.image?.sourceUrl}
            width={500}
            height={500}
            quality={85}
            alt='img'
            className='object-cover w-full h-full rounded-[1vw]'
          />
        )}

        <div className='absolute bottom-0 pb-[1.5vw] px-[1.69vw] z-10 max-md:pb-[3.2vw] max-md:pl-[3.73vw]'>
          <h3 className='text-white uppercase text-[1vw] font-[800] leading-[1.2] font-manrope max-md:text-[3.73vw] max-lg:text-[1.6vw]'>
            {data?.name}
          </h3>
          <span className='mt-[0.5vw] text-[0.75vw] font-[500] text-primaryColor max-md:text-[2.66vw] block max-lg:text-[1.6vw]'>
            {data?.posts?.pageInfo?.offsetPagination?.total}+ {data?.recommendservice?.recommendservice?.related}
          </span>
        </div>
        <div className='absolute inset-0 bg-menuOverlaySty rounded-[1vw]'></div>
      </div>
    </Link>
  )
}

export default ServiceItem
