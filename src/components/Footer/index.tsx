import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './Footer'
import { getFooterContent } from './services/getFooterContent'

//Moved here from assets/css/main/document.scss
//Allows both styles and unit tests to work
import '@tdcerhverv/sass-utils/_font.scss'
import '@tdcerhverv/sass-utils/_normalize.scss'
import { IFooterProps } from './types'

export default function Root() {
  const [footerContent, setFooterContent]: [
    IFooterProps,
    (value: ((prevState: IFooterProps) => IFooterProps) | IFooterProps) => void,
  ] = useState({ fields: {}, uid: {}, componentName: {}, dataSource: {} })
  useEffect(() => {
    getFooterContent().then((props: any): void => {
      setFooterContent(props)
    })
  }, [])

  return <Router>{footerContent && <Footer {...footerContent} />}</Router>
}
