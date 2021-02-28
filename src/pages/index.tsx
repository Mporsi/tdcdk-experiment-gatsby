import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Typography } from '@material-ui/core'

function RootIndex(props: PageProps<SiteData>) {
  const siteTitle = props?.data?.site?.siteMetadata?.title ?? 'no site title'
  return (
      <Typography variant={'h1'}>Hello and welcome to my space</Typography>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
