import NotFound from '@/components/Common/NotFound'
import { LANGUAGE_BOOK_IDS } from '@/configs/global-config'
import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { getDictionary } from '@/get-dictionary'
import { GET_ALL_REVIEWS } from '@/graphql/customersReview/queries'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import { GET_TOUR_META_DATA } from '@/graphql/metaData/queries'
import { GET_PROMOTION_TOUR_DETAIL, GET_RANDOM_PROMOTION_TOUR, GET_RELATED_PROMOTION_TOUR, GET_TOUR_DETAIL_HEADER, PROMOTION_TOUR_SLUGS } from '@/graphql/tourDetail/queries'
import TourDetail from '@/pageComponent/TourDetail'

export async function generateMetadata({ params: { slug, lang } }) {
  const res = await fetchData(GET_TOUR_META_DATA, {
    language: lang?.toUpperCase(),
    slug
  })
  const tourDetail = res?.data?.tours?.translation?.tourDetail
  const featuredImage = res?.data?.tours?.translation?.featuredImage
  const title = tourDetail?.meta?.title
  const excerpt = tourDetail?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams({ params }) {
  const { data } = await fetchData(PROMOTION_TOUR_SLUGS, { language: params.lang?.toUpperCase() })

  const tours = data?.promotionTours?.nodes || []

  return tours.map((tour) => ({
    slug: tour?.translation?.slug || undefined
  }))
}

export default async function page({ params: { lang, slug } }) {
  const [headerData, result, res, result4, dataBookTour, dictionary] = await Promise.all([
    fetchData(GET_TOUR_DETAIL_HEADER, { language: lang?.toUpperCase() }),
    fetchData(GET_PROMOTION_TOUR_DETAIL, { slug: slug, language: lang?.toUpperCase() }),
    fetchData(GET_RANDOM_PROMOTION_TOUR, {
      language: lang?.toUpperCase()
    }),
    fetchData(GET_ALL_REVIEWS, { language: lang?.toUpperCase() }),
    fetchData(GET_DATA_FORM_BOOKTOUR, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() }),
    getDictionary(lang)
  ])

  const styleTourArr = result?.data?.promotionTour?.translation?.tourStyle?.nodes
  const countriesTourArr = result?.data?.promotionTour?.translation?.countries?.nodes
  const tourDetailData = result?.data?.promotionTour?.translation?.tourDetail || {}
  const tourId = result?.data?.promotionTour?.translation?.id
  const tourContent = result?.data?.promotionTour?.translation?.content
  const country = result?.data?.promotionTour?.translation?.countries?.nodes[0]?.slug
  const reviewsList = result4?.data?.allCustomerReview?.nodes
  const randomTour = res?.data?.promotionTours?.nodes.filter((item, index) => item?.translation?.id !== tourId)

  const result2 = await fetchData(GET_RELATED_PROMOTION_TOUR, {
    taxonomyValue: country,
    taxonomyName: 'COUNTRIES',
    language: lang?.toUpperCase()
  })
  const relatedTours = result2?.data?.promotionTours?.nodes?.filter((item) => item?.translation?.id !== tourId)
  const listRandomTour = randomTour?.filter((value) => value?.translation && value)
  if (!tourId) {
    return <NotFound lang={lang} />
  }
  return (
    <TourDetail
      data={tourDetailData}
      tourContent={tourContent}
      headerData={headerData?.data?.page?.translation?.tourDetailHeading}
      relatedTours={!relatedTours || relatedTours?.length === 0 ? listRandomTour : relatedTours}
      tourId={tourId}
      reviewsList={reviewsList}
      lang={lang}
      dataBookTour={dataBookTour}
      slug={slug}
      styleTourArr={styleTourArr}
      countriesTourArr={countriesTourArr}
      dictionary={dictionary}
    />
  )
}