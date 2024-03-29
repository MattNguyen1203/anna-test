import { gql } from '@apollo/client'

const DATA_TAXONOMIES_COUNTRY = `
query countriesTaxonomies($language: LanguageCodeFilterEnum) {
  allCountries(where: {language: $language}) {
    nodes {
      name
      slug
      country {
        priority
      }
    }
  }
}`

const DATA_TAXONOMIES_TOUR_STYLE = `
query countriesTaxonomies($language: LanguageCodeFilterEnum) {
  allTourStyle(where: {language: $language}) {
    nodes {
      name
      slug
      banner {
        travelStyleInfo {
          priority
        }
      }
    }
  }
}`

const DATA_TAXONOMIES_BUDGET = `
query budgetTaxonomies {
  allBudget {
    nodes {
      name
    }
  }
}`

const DATA_TAXONOMIES_DURATION = `
query durationTaxonomies {
  allDuration {
    nodes {
      name
    }
  }
}`

export const DATA_TAXONOMIES_COUNTRY_GQL = gql`
query countriesTaxonomies($language: LanguageCodeFilterEnum) {
  allCountries(where: {language: $language}) {
    nodes {
      name
      slug
      country {
        priority
      }
    }
  }
}`

export const DATA_TAXONOMIES_TOUR_STYLE_GQL = gql`
query countriesTaxonomies($language: LanguageCodeFilterEnum) {
  allTourStyle(where: {language: $language}) {
    nodes {
      name
      slug
      banner {
        travelStyleInfo {
          priority
        }
      }
    }
  }
}`

export const DATA_TAXONOMIES_BUDGET_GQL = gql`
query budgetTaxonomies {
  allBudget {
    nodes {
      name
    }
  }
}`

export const DATA_TAXONOMIES_DURATION_GQL = gql`
query durationTaxonomies {
  allDuration {
    nodes {
      name
    }
  }
}`

export const DATA_TAXONOMIES_COUNTRY_GQL_SERVER = `
query countriesTaxonomies($language: LanguageCodeFilterEnum) {
  allCountries(where: {language: $language}) {
    nodes {
      name
      slug
      country {
        priority
      }
    }
  }
}`

export const DATA_TAXONOMIES_TOUR_STYLE_GQL_SERVER = `
query countriesTaxonomies($language: LanguageCodeFilterEnum) {
  allTourStyle(where: {language: $language}) {
    nodes {
      name
      slug
      banner {
        travelStyleInfo {
          priority
        }
      }
    }
  }
}`

export const DATA_TAXONOMIES_BUDGET_GQL_SERVER = `
query budgetTaxonomies {
  allBudget {
    nodes {
      name
    }
  }
}`

export const DATA_TAXONOMIES_DURATION_GQL_SERVER = `
query durationTaxonomies {
  allDuration {
    nodes {
      name
    }
  }
}`

export const getDataBestSeller = (bestSellerSlug) => {
  const isBestSeller = bestSellerSlug && bestSellerSlug.length !== 0
  return gql`
  query GetFilterTour(
    $language: LanguageCodeEnum!
    $countrySlug: [String!]
    $styleTourSlug: [String!]
    $budget: [String!]
    $duration: [String!]
    ${isBestSeller ? '$bestSellerSlug: [String!]' : ''}
    $offset: Int!
    $size: Int!
  ) {
    allTours(
      where: {
        offsetPagination: { offset: $offset, size: $size }
        taxQuery: {
          taxArray: [
            { taxonomy: COUNTRIES, operator: IN, terms: $countrySlug, field: SLUG }
            { taxonomy: TOURSTYLE, operator: IN, terms: $styleTourSlug, field: SLUG }
            { taxonomy: BUDGET, operator: IN, terms: $budget, field: NAME }
            { taxonomy: DURATION, operator: IN, terms: $duration, field: NAME }
            ${isBestSeller ? '{ taxonomy: BESTSELLER, operator: IN, terms: $bestSellerSlug, field: SLUG }' : ''}
          ]
        }
        orderby: { field: MODIFIED, order: DESC }
      }
    ) {
      pageInfo {
        offsetPagination {
          total
        }
      }
      nodes {
        translation(language: $language) {
          id
          title
          slug
          bestSeller {
            nodes {
              name
            }
          }
          tourStyle {
            nodes {
              slug
            }
          }
          tourDetail {
            priceTour
            numberDay
            banner {
              title
              gallery {
                sourceUrl
                altText
                title
              }
              location
              rate
              icons
            }
          }
        }
      }
    }
  }
  `
}
const DATA_BEST_TOUR = gql`
query GetFilterTour(
  $language: LanguageCodeEnum!
  $countrySlug: [String!]
  $styleTourSlug: [String!]
  $budget: [String!]
  $duration: [String!]
  $offset: Int!
  $size: Int!
) {
  allTours(
    where: {
      offsetPagination: { offset: $offset, size: $size }
      taxQuery: {
        taxArray: [
          { taxonomy: COUNTRIES, operator: IN, terms: $countrySlug, field: NAME }
          { taxonomy: TOURSTYLE, operator: IN, terms: $styleTourSlug, field: SLUG }
          { taxonomy: BUDGET, operator: IN, terms: $budget, field: NAME }
          { taxonomy: DURATION, operator: IN, terms: $duration, field: NAME }
        ]
      }
      orderby: { field: DATE, order: DESC }
    }
  ) {
    pageInfo {
      offsetPagination {
        total
      }
    }
    nodes {
      translation(language: $language) {
        id
        title
        slug
        bestSeller {
          nodes {
            name
          }
        }
        tourStyle {
          nodes {
            slug
          }
        }
        tourDetail {
          priceTour
          numberDay
          banner {
            title
            gallery {
              sourceUrl
              altText
              title
            }
            location
            rate
            icons
          }
        }
      }
    }
  }
}
`

const DATA_PROMOTION_TOUR = gql`
query GetPromotionTour($language: LanguageCodeFilterEnum!, $offset: Int!, $size: Int!) {
  promotionTours(
    where: {
      offsetPagination: {offset: $offset, size: $size}, 
      orderby: {field: MODIFIED, order: DESC}, 
      language: $language
    }
  ) {
    pageInfo {
      offsetPagination {
        total
      }
    }
    nodes {
      id
      title
      slug
    
      countries {
        edges {
          node {
            id
            name
          }
        }
      }
      tourDetail {
        priceTour
        numberDay
        banner {
          title
          gallery {
            sourceUrl
            altText
            title
          }
          location
          rate
          icons
        }
      }
    }
  }
}
`

export const DATA_BEST_TOUR_HOME_PAGE_TEST = `
query GetFilterTour(
  $language: LanguageCodeFilterEnum!
  $bestSellerSlug: [String!]
) {
  allTours(
    first: 7,
    where: {
      taxQuery: {
        taxArray: [
          { taxonomy: BESTSELLER, operator: IN, terms: $bestSellerSlug, field: SLUG }
        ]
      }
      orderby: { field: DATE, order: DESC }
      language: $language
    }
  ) {
    pageInfo {
      offsetPagination {
        total
      }
    }
    nodes {
      id
        title
        slug
        bestSeller {
          nodes {
            name
          }
        }
        tourStyle {
          nodes {
            slug
          }
        }
        tourDetail {
          priceTour
          numberDay
          banner {
            title
            gallery {
              sourceUrl(size: MEDIUM_LARGE)
              altText
              title
            }
            location
            rate
            icons
          }
        }
    }
  }
}
`

const DATA_BEST_TOUR_HOME_PAGE = gql`
query GetFilterTour(
  $language: LanguageCodeEnum!
  $countrySlug: [String!]
  $styleTourSlug: [String!]
  $bestSellerSlug: [String!]
  $budget: [String!]
  $duration: [String!]
) {
  allTours(
    first: 7,
    where: {
      taxQuery: {
        taxArray: [
          { taxonomy: COUNTRIES, operator: IN, terms: $countrySlug, field: NAME }
          { taxonomy: TOURSTYLE, operator: IN, terms: $styleTourSlug, field: SLUG }
          { taxonomy: BESTSELLER, operator: IN, terms: $bestSellerSlug, field: SLUG }
          { taxonomy: BUDGET, operator: IN, terms: $budget, field: NAME }
          { taxonomy: DURATION, operator: IN, terms: $duration, field: NAME }
        ]
      }
      orderby: { field: DATE, order: DESC }
    }
  ) {
    pageInfo {
      offsetPagination {
        total
      }
    }
    nodes {
      translation(language: $language) {
        id
        title
        slug
        bestSeller {
          nodes {
            name
          }
        }
        tourStyle {
          nodes {
            slug
          }
        }
        tourDetail {
          priceTour
          numberDay
          banner {
            title
            gallery {
              sourceUrl(size: MEDIUM_LARGE)
              altText
              title
            }
            location
            rate
            icons
          }
        }
      }
    }
  }
}
`

const DATA_BEST_TOUR_HOME_PAGE_MOBILE = gql`
query GetFilterTour(
  $language: LanguageCodeEnum!
  $countrySlug: [String!]
  $styleTourSlug: [String!]
  $bestSellerSlug: [String!]
  $budget: [String!]
  $duration: [String!]
) {
  allTours(
    first: 7,
    where: {
      taxQuery: {
        taxArray: [
          { taxonomy: COUNTRIES, operator: IN, terms: $countrySlug, field: NAME }
          { taxonomy: TOURSTYLE, operator: IN, terms: $styleTourSlug, field: SLUG }
          { taxonomy: BESTSELLER, operator: IN, terms: $bestSellerSlug, field: SLUG }
          { taxonomy: BUDGET, operator: IN, terms: $budget, field: NAME }
          { taxonomy: DURATION, operator: IN, terms: $duration, field: NAME }
        ]
      }
      orderby: { field: DATE, order: DESC }
    }
  ) {
    pageInfo {
      offsetPagination {
        total
      }
    }
    nodes {
      translation(language: $language) {
        id
        title
        slug
        bestSeller {
          nodes {
            name
          }
        }
        tourStyle {
          nodes {
            slug
          }
        }
        tourDetail {
          priceTour
          numberDay
          banner {
            title
            gallery {
              sourceUrl(size: MEDIUM)
              altText
              title
            }
            location
            rate
            icons
          }
        }
      }
    }
  }
}
`

export const DATA_BEST_TOUR_HOME_PAGE_WITHOUT_GQL = `
  query GetFilterTour(
    $language: LanguageCodeEnum!
    $countrySlug: [String!]
    $styleTourSlug: [String!]
    $bestSellerSlug: [String!]
  ) {
    allTours(
      first: 100,
      where: {
        taxQuery: {
          taxArray: [
            { taxonomy: COUNTRIES, operator: IN, terms: $countrySlug, field: NAME }
            { taxonomy: TOURSTYLE, operator: IN, terms: $styleTourSlug, field: SLUG }
            { taxonomy: BESTSELLER, operator: IN, terms: $bestSellerSlug, field: SLUG }
          ]
        }
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        translation(language: $language) {
          id
          title
          slug
          bestSeller {
            nodes {
              name
            }
          }
          tourStyle {
            nodes {
              slug
            }
          }
          tourDetail {
            priceTour
            numberDay
            banner {
              title
              gallery {
                sourceUrl
                altText
                title
              }
              location
              rate
              icons
            }
          }
        }
      }
    }
  }
`

const DATA_SEARCH_TEXT_TOUR = gql`
  query SearchTour($title: String, $language: LanguageCodeEnum!) {
    allTours(first: 100, where: { search: $title }) {
      nodes {
        translation(language: $language) {
          title
          slug
          bestSeller {
            nodes {
              name
            }
          }
          tourStyle {
            nodes {
              slug
            }
          }
          tourDetail {
            priceTour
            numberDay
            banner {
              title
              gallery {
                sourceUrl
                altText
                title
              }
              location
              rate
              icons
            }
          }
        }
      }
    }
  }
`

export {
  DATA_SEARCH_TEXT_TOUR,
  DATA_TAXONOMIES_COUNTRY,
  DATA_BEST_TOUR_HOME_PAGE,
  DATA_TAXONOMIES_TOUR_STYLE,
  DATA_BEST_TOUR,
  DATA_TAXONOMIES_BUDGET,
  DATA_TAXONOMIES_DURATION,
  DATA_PROMOTION_TOUR,
  DATA_BEST_TOUR_HOME_PAGE_MOBILE
}
