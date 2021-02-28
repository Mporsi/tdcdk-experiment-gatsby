import { graphql, PageProps } from 'gatsby'
import React from 'react'

function SuperPage(props: PageProps<SiteData>) {
  console.log(props.data.site.siteMetadata.title)
  return (
    <div>
      <h1>{props.data.site.siteMetadata.title} Hello SuperPage!</h1>
    </div>
  )
}

export default SuperPage

export const pageQuery = graphql`
  query SuperPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
