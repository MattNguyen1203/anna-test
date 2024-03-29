import fetchData from "@/data/fetchData"
import { getMeta } from "@/data/metaData/getMeta"
import { DATA_RELATED_TOUR_REVIEW, REVIEWS_SLUG_QUERY, REVIEW_DETAIl } from "@/graphql/customersReview/queries"
import ReviewDetail from "@/pageComponent/ReviewDetail/ReviewDetail"

export async function generateMetadata({ params: { slug, lang } }) {
  const res = await fetchData(REVIEW_DETAIl, { slug: slug, language: lang?.toUpperCase() })
  const title = res?.data?.customerReview?.translation?.title + " - " + res?.data?.customerReview?.translation?.customerReview?.tours?.title
  return getMeta(title, null, null)
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams({ params }) {
  const { data } = await fetchData(REVIEWS_SLUG_QUERY, { language: params.lang?.toUpperCase() })

  const reviews = data?.allCustomerReview?.nodes || []
  
  return reviews.map((review) => ({
    slug: review?.translation?.slug || undefined
  }))
}

async function page({ params: { lang, slug } }) {
  const data = await fetchData(REVIEW_DETAIl, { slug: slug, language: lang?.toUpperCase() })
  const dataReview = data?.data?.customerReview?.translation
  const listCountry = dataReview?.customerReview?.tours?.countries?.nodes
  const countrySlug = listCountry?.map(item => item?.slug)
  const relatedTour = await fetchData(
    DATA_RELATED_TOUR_REVIEW,
    {
      language: lang?.toUpperCase(),
      countrySlug: countrySlug
    }
  )
  const relatedTourNotNull = relatedTour?.data?.allTours?.nodes.filter(item => {
    return item?.translation !== null && item?.translation?.slug !== null
  })
  return (
    <ReviewDetail dataTour={relatedTourNotNull} data={dataReview} lang={lang} />
  )
}

export default page