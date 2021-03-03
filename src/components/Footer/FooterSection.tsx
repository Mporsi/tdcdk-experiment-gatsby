// Essentials
import React, { ReactElement } from 'react'

import { H4 } from '@tdcerhverv/heading'

// Styles
import * as s from './styles.module.scss'

// Enums
import { TemplateIdEnum } from './enums'

import { IFooterCategory } from './types'

export default function FooterSection(footerSection: IFooterCategory): ReactElement {
  const RenderFooter = (footerSection: IFooterCategory): ReactElement => {
    const footerSectionTitle = footerSection?.fields?.item && footerSection.fields.item.FooterSection_Title?.value

    if (footerSection.templateId === TemplateIdEnum.FOOTER_SECTION) {
      return (
        <div >
          {footerSectionTitle && (
            <H4 >{footerSection?.fields?.item?.FooterSection_Title?.value}</H4>
          )}
          <ul >
            {footerSection?.fields?.children?.map((footerSection) => (
              <div key={footerSection.id}>Link to {footerSection?.fields?.FooterSection_Link?.value?.text}</div>
            ))}
          </ul>
        </div>
      )
    }
    return <></>
  }

  return <RenderFooter {...footerSection} />
}
