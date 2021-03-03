import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Typography } from '@material-ui/core'
import { Link } from 'gatsby'
import TopMenu from '../components/Topmenu'

function RootIndex(props: PageProps<SiteData>) {
  const siteTitle = props?.data?.site?.siteMetadata?.title ?? 'no site title'
  return (
    <>
      <TopMenu />
      <Typography variant={'h1'}>Hello and welcome to my space</Typography>
      <Link to="app/dashboard/">Dashboard</Link>
    </>
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
