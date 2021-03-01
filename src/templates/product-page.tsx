import React, { ReactElement } from 'react'
import { graphql, PageProps } from 'gatsby'
import ProductPageLayout from '../components/ProductPageLayout'
import { Typography } from '@material-ui/core'
import { ComponentMapper } from '../components/ComponentMapper'

type ProductPageData = {
  contentfulProductPage: {
    title: string
    slug: string
    description: string
    modules: Array<{ __typename: string; id: string }>
  }
}

export default function ProductPageTemplate(props: PageProps<SiteData & ProductPageData>): ReactElement {
  return (
    <ProductPageLayout location={props.location}>
      <Typography variant={'h1'}>{props.data.contentfulProductPage.title}</Typography>
      {props.data.contentfulProductPage.modules.map((module) => (
        <ComponentMapper key={module.id} type={module.__typename} />
      ))}
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
