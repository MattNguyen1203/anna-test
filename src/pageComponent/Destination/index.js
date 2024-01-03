import Banner from './Banner'
import CustomerReview from './CustomerReview'
import FilterPopup from './FilterPopup'
import OurBlog from './OurBlog'
import SectionActions from './SectionActions'
import SlideDestination from './SlideDestination'
async function index({ lang, slug, dictionary }) {
  return (
    <div>
      <Banner
        slug={slug}
        lang={lang}
      />
      <FilterPopup lang={lang} slug={slug} />
      <SectionActions lang={lang} slug={slug} />
      <SlideDestination
        lang={lang}
        slug={slug}
      />
      <CustomerReview
        lang={lang}
        slug={slug}
      />
      <OurBlog
        slug={slug}
        lang={lang}
      />
    </div>
  )
}

export default index