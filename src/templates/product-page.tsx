import React from 'react'
import { graphql, PageProps, useStaticQuery } from 'gatsby'
import ProductPageLayout from '../components/ProductPageLayout'
import { Typography } from '@material-ui/core'

type ProductPageData = {
  contentfulProductPage: {
    title: string
    slug: string
    description: string
    modules: unknown
  }
}

export default function ProductPageTemplate(props: PageProps<SiteData & ProductPageData>) {
  console.log(props)
  return (
    <ProductPageLayout location={props.location}>
      <Typography>Hiii! {props.data.contentfulProductPage.title} </Typography>
    </ProductPageLayout>
  )
}

export const query = graphql`
  query ProductPageQuery($pageId: String) {
    contentfulProductPage(contentful_id: { eq: $pageId }) {
      title
      modules {
        ...HeroFragment
      }
    }
  }
`
