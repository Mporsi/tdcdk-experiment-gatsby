import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core'
// @ts-ignore
import { fullComponentTheme } from '@tdcerhverv/mui-theme'

export default function ProductPageLayout({
  children,
  siteTitle,
}: {
  children: NonNullable<React.ReactNode>
  location: unknown
  siteTitle?: string
}) {
  return (
    <ThemeProvider theme={fullComponentTheme}>
      <CssBaseline />
      <Helmet title={siteTitle} />
      <Container>{children}</Container>
    </ThemeProvider>
  )
}
