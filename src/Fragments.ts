import { graphql } from 'gatsby'

export const ProductPageFragment = graphql`
  fragment ProductPageFragment on ContentfulProductPage {
    title
    slug
    description
    modules {
      ...HeroFragment
    }
  }
`
export const HeroFragment = graphql`
  fragment HeroFragment on ContentfulHero {
    __typename
    trackingName
    imageUrl {
      fluid(maxWidth: 48, maxHeight: 48, resizingBehavior: SCALE) {
        ...GatsbyContentfulFluid
      }
    }
    buttonAction {
      label
      url
    }
    leftSectionSize
    headline
    productText
    mainText
  }
`
