import React from 'react'
import Footer from '../components/Footer'
import TopMenu from '../components/Topmenu'
import Container from '@material-ui/core/container'

export default function BaseLayout({ children, pageContext  }: any) {
    
    if (pageContext.layout === "empty") {
        return (
            <>{children}</>
        )
    }
 
  return (
    <>
      <TopMenu />
        <Container>{children}</Container>
      <Footer />
    </> 
  )
}
