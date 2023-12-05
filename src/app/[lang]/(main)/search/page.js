import { LANGUAGE_BOOK_IDS } from '@/configs/global-config'
import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { getDictionary } from '@/get-dictionary'
import { GET_META_DATA, GET_SEARCH_INFO } from '@/graphql/search/queries'
import Search from '@/pageComponent/Search/Search'

export async function generateMetadata({ params: { lang } }) {
  const res = await fetchData(GET_META_DATA, {
    language: lang?.toUpperCase()
  })

  const title = res?.data?.page?.translation?.search?.meta?.title
  const excerpt = res?.data?.page?.translation?.search?.meta?.description
  return getMeta(title, excerpt, res?.data?.page?.translation?.featuredImage)
}
async function page({ params: { lang } }) {

  const [
    searchInfoData] = await Promise.all([
      fetchData(GET_SEARCH_INFO, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() })
    ])
  const searchInfo = searchInfoData?.data?.page?.translation?.search
  const dictionary = await getDictionary(lang)

  return (
    <div>
      <Search
        searchInfo={searchInfo}
        lang={lang}
        dictionary={dictionary}
      />
    </div>
  )
}

export default page
