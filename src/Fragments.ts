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
        ...GatsbyContentfulFluid_tracedSVG
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

// eslint-disable-next-line @typescript-eslint/camelcase
export const GatsbyContentfulFluid_tracedSVG = graphql`
  fragment GatsbyContentfulFluid_tracedSVG on ContentfulFluid {
    tracedSVG
    aspectRatio
    src
    srcSet
    sizes
  }
`
