// Essentials
import React, { useCallback, useEffect, useState } from 'react'
// Components
import { TextButton } from '@tdcerhverv/button'
import RenderExpandedMenu from './RenderExpandedMenu'

// Styles
import '@tdcerhverv/sass-utils/_font.scss'
import '@tdcerhverv/sass-utils/_normalize.scss'
import * as s from './styles.module.scss'

// Enums
import { TemplateIdEnum, TopmenuTrackingEnum } from './topmenuEnums'
import { ITopMenu, ITopMenu_Child, ITopMenu_LinkValue } from './types'
import Dropdown from '../../utils/components/Dropdown'
import { Link } from 'gatsby'

interface INavElement {
  className: string
  link: ITopMenu_Child
  tabIndex?: number
}

export default function TopMenu(props: ITopMenu): JSX.Element {
  if (!props || !props.fields || !props.fields.children) {
    console.error('missing topmenu props')
    return <></>
  }
  const [burgerExpanded, setBurgerExpanded] = useState(false)
  const [isMobileLevelTwoExpanded, setIsMobileLevelTwoExpanded] = useState(false)
  const [productsExpanded, setProductsExpanded] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const primaryNavLinks =
    props.fields?.children!.filter((el) => el.templateId === TemplateIdEnum.PRIMARY_NAV)[0]?.fields?.children || []
  const secondaryNavLinks =
    props.fields?.children.filter((el) => el.templateId === TemplateIdEnum.SECONDARY_NAV)[0]?.fields?.children || []
  const menuItems = primaryNavLinks.filter((el) => el.fields?.children)[0]?.fields?.children || []
  const cludoSearchApiKey = 'SiteKey MjA2MDoxMDA1OTpTZWFyY2hLZXk='
  const cludoCustomerId = 2060
  const cludoEngineId = 10059
  const minSearchQueryLength = 2
  const searchInputId = 'search001842'

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      setSearchExpanded(false)
    }
  }, [])

  useEffect(() => {
    if (searchExpanded) {
      document.addEventListener('keydown', handleKeyDown, false)
      return () => document.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [handleKeyDown, searchExpanded])

  const toggleMenu = () => {
    setProductsExpanded(!productsExpanded)
    setSearchExpanded(false)
    if (burgerExpanded) {
      setIsMobileLevelTwoExpanded(true)
    }
  }

  const toggleBurgerMenu = () => {
    setProductsExpanded(false)
    setSearchExpanded(false)
    setIsMobileLevelTwoExpanded(false)
    setBurgerExpanded(!burgerExpanded)
  }

  const closeMenus = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement

    if (element.id === 'modal-background') {
      setProductsExpanded(false)
      setBurgerExpanded(false)
      setSearchExpanded(false)
    }
  }

  const toggleSearch = () => {
    if (!searchExpanded) {
      setTimeout(() => {
        document.getElementById(searchInputId)?.focus()
      }, 0)
    }
    setSearchExpanded(!searchExpanded)
    setProductsExpanded(false)
    setBurgerExpanded(false)

    if (!searchExpanded) {
      const EVENT_ACTION = 'Search'
    }
  }

  const goToSearchResults = (value: string) => {
    const EVENT_ACTION = 'Search-Complete'

    window.location.href = `https://tdc.dk/search#?cludoquery=${value}&cludopage=1&cludorefurl=https%3A%2F%2Ftdc.dk%2Fdit-abonnement&cludorefpt=Har%20du%20brug%20for%20hj%C3%A6lp%20til%20dit%20abonnement%20hos%20TDC%20Erhverv%3F%20-%20TDC%20Erhverv`
  }

  const handleMobileBack = () => {
    setIsMobileLevelTwoExpanded(false)
  }

  const handleDropDownClick = (EVENT_ACTION: string) => {
    toggleMenu()
    if (!productsExpanded) {
    }
  }

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setProductsExpanded(false)
    setBurgerExpanded(false)
  }

  const RenderTopLogo = (logo: string, logoLink?: ITopMenu_LinkValue): JSX.Element => {
    const { href, text } = logoLink?.value as ILink
    return (
      <a href={href} title={text} onClick={handleNavLinkClick}>
        home
      </a>
    )
  }

  const RenderPrimaryNavLink = ({ className, link, tabIndex }: INavElement): JSX.Element => {
    const { href, text } = link?.fields?.TopMenu_Primary_Nav_Link?.value ?? { href: '', text: '' }
    return (
      <a className={className} tabIndex={tabIndex} href={href ?? ''} onClick={handleNavLinkClick}>
        <span>{text}</span>
      </a>
    )
  }

  const RenderSecondaryNavLink = ({ className, link, tabIndex }: INavElement): JSX.Element => {
    const { TopMenu_Secondary_Title } = link?.fields ?? { TopMenu_Secondary_Title: { value: '' } }
    const { href } = link?.fields?.TopMenu_Secondary_Nav_Link?.value ?? { href: '' }
    return (
      <a className={className} tabIndex={tabIndex} href={href ?? ''} onClick={handleNavLinkClick}>
        <>{TopMenu_Secondary_Title?.value}</>
      </a>
    )
  }

  const RenderDropDownNavTitle = ({ className, link, tabIndex }: INavElement): JSX.Element => {
    const { value: title } = link?.fields?.item?.TopMenu_Primary_Title ?? { value: '' }
    let iconClassName = productsExpanded ? `${s.expanderIcon} ${s.expanderIconActive}` : s.expanderIcon

    if (burgerExpanded) {
      iconClassName = `${s.expanderIconMobile}`
    }

    return (
      <button name="menu_dropdown" tabIndex={tabIndex} onClick={() => handleDropDownClick(title)} className={className}>
        <span>{title}</span>
      </button>
    )
  }

  const menuOpenClassName = `${s.backgroundModal} ${
    productsExpanded || burgerExpanded ? s.backgroundModalOpen : s.backgroundModalClosed
  }`

  const dropDownMenuClass = `${s.dropdownContainer} ${
    isMobileLevelTwoExpanded ? s.dropdownContainerOpenMobile : s.dropdownContainerClosedMobile
  }`

  const MobileLevelOneNav = () => (
    <div className={s.burgerMenu}>
      {primaryNavLinks.map((link) =>
        link?.fields?.children ? (
          <RenderDropDownNavTitle
            className={s?.burgerMenuItem}
            tabIndex={isMobileLevelTwoExpanded ? -1 : 0}
            key={link?.id}
            link={link}
          />
        ) : (
          <RenderPrimaryNavLink
            className={s.burgerMenuItem}
            tabIndex={isMobileLevelTwoExpanded ? -1 : 0}
            key={link.id}
            link={link}
          />
        ),
      )}
      {secondaryNavLinks.map((link) => (
        <RenderSecondaryNavLink
          className={s.burgerMenuItem}
          tabIndex={isMobileLevelTwoExpanded ? -1 : 0}
          key={link.id}
          link={link}
        />
      ))}
    </div>
  )

  return (
    <>
      <header className={s.topmenu}>
        <div className={s.primaryNav}>
          {RenderTopLogo(s.logo, props?.fields?.item?.TopMenu_LogoLink)}
          {primaryNavLinks.map((link, i) =>
            link?.fields?.children ? (
              <RenderDropDownNavTitle className={s.topmenuLink} key={i} link={link} />
            ) : (
              <RenderPrimaryNavLink className={s.topmenuLink} key={link.id} link={link} />
            ),
          )}
        </div>
        <div className={s.secondaryNav}>
          <button name="search_button" onClick={toggleSearch} className={s.searchIconWrapper}>
            SearchButton
          </button>
          <button name="mobile_burger_menu" onClick={toggleBurgerMenu} className={s.burgerMenuIconWrapper}>
            mobile_burger_menu
          </button>
          {secondaryNavLinks!.map((link) => (
            <RenderSecondaryNavLink className={s.topmenuLink} key={link.id} link={link} />
          ))}
        </div>
      </header>
      <div onClick={closeMenus} className={menuOpenClassName} id="modal-background">
        {burgerExpanded ? (
          <>
            <MobileLevelOneNav />
            <div className={dropDownMenuClass}>
              {burgerExpanded && (
                <TextButton
                  tabIndex={isMobileLevelTwoExpanded ? 0 : -1}
                  onClick={handleMobileBack}
                  className={s.backHeadline}
                >
                  Tilbage
                </TextButton>
              )}
              <RenderExpandedMenu menuItems={menuItems} canTabTo={isMobileLevelTwoExpanded} />
            </div>
          </>
        ) : (
          !burgerExpanded && (
            <div className={s.dropdownContainer}>
              <RenderExpandedMenu menuItems={menuItems} canTabTo={productsExpanded} />
            </div>
          )
        )}
      </div>
    </>
  )
}
