import React, { ReactElement, ReactNode } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

export interface ILink {
  url: string
  children: ReactNode | ReactNode[]
  className?: string
  title?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function Link(props: ILink): ReactElement {
  const { url, children, className } = props
  return (
    <ReactRouterLink className={className} to={url}>
      {children}
    </ReactRouterLink>
  )
}

export const linkHandler = (e: React.MouseEvent<HTMLAnchorElement>, category: string): void => {
  e.preventDefault()
  const targetElement = e.target as HTMLAnchorElement
  const parentElement = targetElement.parentElement

  const href = targetElement.href === undefined ? (parentElement as HTMLAnchorElement).href : targetElement.href
  const text = targetElement.text === undefined ? (parentElement as HTMLAnchorElement).text : targetElement.text
  const title = targetElement.title === undefined ? parentElement?.title : targetElement.title

  window.open(href, '_blank')
}
