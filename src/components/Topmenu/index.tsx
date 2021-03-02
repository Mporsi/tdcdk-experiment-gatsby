import React, { useState, useEffect } from 'react'
import TopMenu from './TopMenu'
import { getTopMenuContent } from './services/getTopMenuContent'
import { ITopMenu } from './types'

export default function Root() {
  const [content, setContent]: [ITopMenu, (value: ((prevState: {}) => ITopMenu) | {}) => void] = useState({})
  useEffect(() => {
    getTopMenuContent().then((data: any): void => {
      setContent(data)
    })
  }, [])
  return content ? <TopMenu {...content} /> : <></>
}
