// Essentials
import React from 'react'
import parse from 'html-react-parser'
// Components
import FooterSection from './FooterSection'
// Styles
import * as s from './styles.module.scss'

// Types
import * as t from './types'
// Enums
import { FooterTrackingEnum } from './enums'
import { IFooterCategory, IFooterProps } from './types'

export default function Footer(Footer: IFooterProps) {
  const footerItem = Footer.fields?.item
  const footerSections = Footer.fields?.children ?? []

  return (
    <footer className={s.footer} data-cy="footer">
      {footerItem?.FooterSettings_Notice_text && (
        <div className={s.noticeText}>{parse(footerItem.FooterSettings_Notice_text.value)}</div>
      )}
      <div className={s.footerPrimaryContainer}>
        {footerSections.map((footerSection: IFooterCategory, i: number) => (
          <FooterSection {...footerSection} key={i} />
        ))}
      </div>
      <div className={s.footerSecondaryContainer}>
        <div className={s.cookieContainer}>
          <p className={s.copyrightText}>{footerItem?.FooterSettings_Copyright_text?.value}</p>
          <a className={s.cookieLink} href={footerItem?.FooterSettings_CookieLink?.value?.href}>
            {footerItem?.FooterSettings_CookieLink?.value?.text ?? 'no FooterSettings_CookieLink'}
          </a>
        </div>
        <a className={s.logo} href={footerItem?.FooterSettings_LogoLink?.value?.href ?? ''}></a>
      </div>
    </footer>
  )
}
