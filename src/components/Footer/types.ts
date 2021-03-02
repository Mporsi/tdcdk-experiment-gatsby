export interface IFooterProps extends IBaseSitecoreRendering {
  fields: {
    item: {
      FooterSettings_Notice_text: IFieldValueString
      FooterSettings_CookieLink: IFIeldValueLink
      FooterSettings_LogoLink: IFIeldValueLink
      FooterSettings_Copyright_text: IFieldValueString
    }
    children: Array<IFooterCategory>
  }
}
export interface IFooterCategory extends IStandardScItem {
  fields: {
    item: {
      FooterSection_Title: IFieldValueString
    }
    children: Array<IFooterItem>
  }
}

export interface IFooterItem extends IStandardScItem {
  fields: {
    FooterSection_Link_Icon: IFieldValueString
    FooterSection_Link: IFIeldValueLink
  }
}
