import { TOURS_SLUG_QUERY } from '@/app/[lang]/sitemap'
import NotFound from '@/components/Common/NotFound'
import { LANGUAGE_BOOK_IDS } from '@/configs/global-config'
import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { getDictionary } from '@/get-dictionary'
import { GET_ALL_REVIEWS } from '@/graphql/customersReview/queries'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import { GET_TOUR_META_DATA } from '@/graphql/metaData/queries'
import { GET_RANDOM_TOUR, GET_RELATED_TOUR, GET_TOUR_DETAIL, GET_TOUR_DETAIL_HEADER } from '@/graphql/tourDetail/queries'
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
  const { data } = await fetchData(TOURS_SLUG_QUERY, { language: params.lang?.toUpperCase() })

  const tours = data?.allTours?.nodes || []

  return tours.map((tour) => ({
    slug: tour?.translation?.slug || undefined
  }))
}

export default async function page({ params: { lang, slug } }) {
  const [headerData, result, res, result4, dataBookTour, dictionary] = await Promise.all([
    fetchData(GET_TOUR_DETAIL_HEADER, { language: lang?.toUpperCase() }),
    fetchData(GET_TOUR_DETAIL, { slug: slug, language: lang?.toUpperCase() }),
    fetchData(GET_RANDOM_TOUR, {
      language: lang?.toUpperCase()
    }),
    fetchData(GET_ALL_REVIEWS, { language: lang?.toUpperCase() }),
    fetchData(GET_DATA_FORM_BOOKTOUR, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() }),
    getDictionary(lang)
  ])

  const styleTourArr = result?.data?.tours?.translation?.tourStyle?.nodes
  const countriesTourArr = result?.data?.tours?.translation?.countries?.nodes
  const tourDetailData = result?.data?.tours?.translation?.tourDetail || {}
  const tourId = result?.data?.tours?.translation?.id
  const tourContent = result?.data?.tours?.translation?.content
  const country = result?.data?.tours?.translation?.countries?.nodes[0]?.slug
  const reviewsList = result4?.data?.allCustomerReview?.nodes
  const randomTour = res?.data?.allTours?.nodes.filter((item, index) => item?.translation?.id !== tourId)

  const result2 = await fetchData(GET_RELATED_TOUR, {
    taxonomyValue: country,
    taxonomyName: 'COUNTRIES',
    language: lang?.toUpperCase()
  })
  const relatedTours = result2?.data?.allTours?.nodes?.filter((item) => item?.translation?.id !== tourId)
  if (!tourId) {
    return <NotFound lang={lang} />
  }
  return (
    <TourDetail
      data={tourDetailData}
      tourContent={tourContent}
      headerData={headerData?.data?.page?.translation?.tourDetailHeading}
      relatedTours={!relatedTours || relatedTours?.length === 0 ? randomTour : relatedTours}
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