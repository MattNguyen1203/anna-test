export const GET_TOUR_DETAIL = `query GetTourDetail($slug: ID!, $language: LanguageCodeEnum!) {
  tours(id: $slug, idType: URI) {
    translation(language: $language) {
      id
      slug
      tourStyle {
        nodes {
          name
        }
      }
      countries {
        nodes {
          name
        }
      }
      tourDetail {
        priceTour
        banner {
          rate
          title
          video {
            uploadVideo {
              mediaItemUrl
            }
            overlayImage {
              altText
              sourceUrl
            }
          }
          location
          gallery {
            altText
            sourceUrl
            title
          }
          icons
        }
        content {
          overview {
            text
          }
          brief {
            row {
              day
              itinerary
              accompaniement
              mealsIncluded
            }
          }
          tourDetailed {
            content {
              heading
              desc
              place {
                placeName
                image {
                  altText
                  sourceUrl
                }
              }
              icons {
                img {
                  sourceUrl(size: THUMBNAIL)
                }
                text
              }
            }
          }
          inclusionAndExclusion {
            inclusion {
              content {
                text
              }
            }
            exclusion {
              content {
                text
              }
            }
          }
          accommodation {
            row{
              cityOrProvince
              superiorr
              deluxee{
                link
              }
              noOfNights
            }
          }
        }
        map {
          image {
            altText
            sourceUrl(size: MEDIUM_LARGE)
          }
          button
        }
      }
      countries {
        nodes {
          slug
        }
      }
    }
  }
}`

export const GET_PROMOTION_TOUR_DETAIL = `query GetTourDetail($slug: ID!, $language: LanguageCodeEnum!) {
  promotionTour(id: $slug, idType: URI) {
    translation(language: $language) {
      id
      slug
      tourStyle {
        nodes {
          name
        }
      }
      countries {
        nodes {
          name
        }
      }
      tourDetail {
        priceTour
        banner {
          rate
          title
          video {
            uploadVideo {
              mediaItemUrl
            }
            overlayImage {
              altText
              sourceUrl
            }
          }
          location
          gallery {
            altText
            sourceUrl
            title
          }
          icons
        }
        content {
          overview {
            text
          }
          brief {
            row {
              day
              itinerary
              accompaniement
              mealsIncluded
            }
          }
          tourDetailed {
            content {
              heading
              desc
              place {
                placeName
                image {
                  altText
                  sourceUrl(size: THUMBNAIL)
                }
              }
              icons {
                img {
                  sourceUrl(size: THUMBNAIL)
                }
                text
              }
            }
          }
          inclusionAndExclusion {
            inclusion {
              content {
                text
              }
            }
            exclusion {
              content {
                text
              }
            }
          }
          accommodation {
            row{
              cityOrProvince
              superiorr
              deluxee{
                link
              }
              noOfNights
            }
          }
        }
        map {
          image {
            altText
            sourceUrl(size: MEDIUM_LARGE)
          }
          button
        }
      }
      countries {
        nodes {
          slug
        }
      }
    }
  }
}`

export const GET_TOUR_DETAIL_HEADER = `query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDo4NjE") {
    translation(language: $language) {
      tourDetailHeading {
        bannerHeaders {
          buttonContent
          priceHeader
        }
        content {
          accommodationTableHeader {
            cityProvince
            superior
            deluxe
            noOfNights
          }
          icons {
            img{
              sourceUrl
            }
            text
          }
          briefTableHeader {
            day
            itinerary
            accompaniement
            mealsIncluded
          }
          header
          sectionHeader {
            accommodation
            briefHeader
            inclusionExclusionHeader {
              exclusionHeader
              inclusionHeader
            }
            overviewHeader
            tourDetailedHeader
          }
        }
        relatedTour {
          buttonContent
          heading
        }
        subBanner {
          button
          header
          paragraph
        }
      }
    }
  }
}`

export const GET_RELATED_TOUR = `query($language: LanguageCodeEnum!, $taxonomyValue: String, $taxonomyName: TaxonomyEnum) {
  allTours(
    first: 100,
    where: {
      taxQuery: {
        taxArray: { terms: [$taxonomyValue], taxonomy: $taxonomyName, field: SLUG, operator: IN }
      }
    }
  ) {
    nodes {
      translation(language: $language) {
        id
        slug
        bestSeller {
          nodes {
            name
            id
          }
        }
        tourDetail {
          priceTour
          banner {
            location
            rate
            title
            gallery {
              altText
              title
              sourceUrl(size: MEDIUM_LARGE)
            }
            icons
          }
        }
      }
    }
  }
}`

export const GET_RELATED_PROMOTION_TOUR = `query($language: LanguageCodeEnum!, $taxonomyValue: String, $taxonomyName: TaxonomyEnum) {
  promotionTours(
    first: 100,
    where: {
      taxQuery: {
        taxArray: { terms: [$taxonomyValue], taxonomy: $taxonomyName, field: SLUG, operator: IN }
      }
    }
  ) {
    nodes {
      translation(language: $language) {
        id
        slug
        tourDetail {
          priceTour
          banner {
            location
            rate
            title
            gallery {
              altText
              title
              sourceUrl(size: MEDIUM_LARGE)
            }
            icons
          }
        }
      }
    }
  }
}`

export const GET_RANDOM_TOUR = `query ($language: LanguageCodeEnum!) {
  allTours(first: 6) {
    nodes {
      translation(language: $language) {
        slug
        tourDetail {
          priceTour
          banner {
            gallery {
              altText
              sourceUrl(size: MEDIUM_LARGE)
              title
            }
            icons
            location
            rate
            title
          }
        }
      }
    }
  }
}`

export const GET_RANDOM_PROMOTION_TOUR = `query ($language: LanguageCodeEnum!) {
  promotionTours(first: 6) {
    nodes {
      translation(language: $language) {
        slug
        id
        tourDetail {
          priceTour
          banner {
            gallery {
              altText
              sourceUrl(size: MEDIUM_LARGE)
              title
            }
            icons
            location
            rate
            title
          }
        }
      }
    }
  }
}`


export const PROMOTION_TOUR_SLUGS = `query ($language: LanguageCodeEnum!) {
  promotionTours {
    nodes {
      translation(language: $language) {
        slug
        date
        language {
          id
        }
      }
    }
  }
}`