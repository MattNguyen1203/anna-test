import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { GET_META_DATA } from '@/graphql/travelStyle/queries'
import Travel from '@/pageComponent/TravelStyle'

export async function generateMetadata({ params: { lang, slug } }) {
  const res = await fetchData(GET_META_DATA, {
    language: lang?.toUpperCase(),
    slug
  })
  if (!res) return {}
  const { banner } = res?.data?.tourStyle?.translation || ''
  const title = banner?.meta?.title
  const excerpt = banner?.meta?.description
  return getMeta(title, excerpt)
}

function page({ params: { lang, slug } }) {
  return (
    <div>
      <Travel
        lang={lang}
        slug={slug}
      />
    </div>
  )
}

export default page
