// Essentials
import React, { ReactElement } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// Components
import { Paragraph } from '@tdcerhverv/paragraph'
import { H5 } from '@tdcerhverv/heading'

// Styles
import * as s from './styles.module.scss'

// Enums
import { TemplateIdEnum, TopmenuTrackingEnum } from './topmenuEnums'
import { ITopMenu_Child } from './types'
import { Link } from 'gatsby'

interface IExpandedMenu {
  menuItems: ITopMenu_Child[]
  canTabTo: boolean
}

interface IEXpandedMenuElement {
  section?: ITopMenu_Child
  link?: ITopMenu_Child
  canTabTo: boolean
}

export default function RenderExpandedMenu({ menuItems, canTabTo }: IExpandedMenu): ReactElement {
  const handleDropDownLinkClick = (DROPDOWN_LINK_TITLE: string) => {
    const { TOPMENU, PRODUCKTER } = TopmenuTrackingEnum
  }

  const RenderLink = ({ link, canTabTo }: IEXpandedMenuElement): ReactElement => {
    return (
      <Router>
        <a
          href={link?.fields?.TopMenu_DropDown_Link?.value?.url as string}
          title={link?.fields?.TopMenu_DropDown_Link?.value?.text}
          tabIndex={canTabTo ? 0 : -1}
          onClick={() => handleDropDownLinkClick(link?.fields?.TopMenu_DropDown_Link?.value?.text ?? '')}
        >
          <>
            <Paragraph className={s.linkTitle}>{link?.fields?.TopMenu_DropDown_Link?.value.text}</Paragraph>
            <Paragraph className={s.linkDescription} size="small" weight="regular">
              {link?.fields?.TopMenu_DropDown_Link_Description?.value}
            </Paragraph>
          </>
        </a>
      </Router>
    )
  }

  const RenderSection = ({ section, canTabTo }: IEXpandedMenuElement) => {
    return (
      <div className={s.dropdownSection}>
        {section?.fields?.item?.DropDownSectionTitle?.value && (
          <H5>{section?.fields?.item?.DropDownSectionTitle?.value}</H5>
        )}
        {section?.fields?.children?.map((childSection) => (
          <RenderDropDown key={childSection.id} section={childSection} canTabTo={canTabTo} />
        ))}
      </div>
    )
  }

  const RenderDropDown = ({ section, canTabTo }: IEXpandedMenuElement): ReactElement => {
    const templateId = section?.templateId

    if (templateId === TemplateIdEnum.DROPDOWN_ITEM) {
      return <RenderLink link={section} canTabTo={canTabTo} />
    }

    if (templateId === TemplateIdEnum.DROPDOWN_SECTION) {
      return <RenderSection section={section} canTabTo={canTabTo} />
    }
    return <></>
  }

  return (
    <div className={s.expandedMenuContainer}>
      {menuItems.map(
        (section: ITopMenu_Child): ReactElement => (
          <RenderDropDown key={section.id} canTabTo={canTabTo} section={section} />
        ),
      )}
    </div>
  )
}
