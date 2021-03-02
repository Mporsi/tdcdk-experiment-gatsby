export interface ITopMenu {
  uid?: string
  componentName?: string
  dataSource?: string
  fields?: ITopMenu_Fields
}

export interface ITopMenu_Fields {
  item?: ITopMenu_Item
  children?: ITopMenu_Child[]
  TopMenu_Primary_Nav_Link?: ITopMenu_LinkValue
  TopMenu_Primary_Nav_Link_Icon?: ITopMenu_Value
  TopMenu_Primary_Title?: ITopMenu_Value
  TopMenu_Secondary_Title?: ITopMenu_Value
  TopMenu_Secondary_Nav_Link?: ITopMenu_LinkValue
  TopMenu_Secondary_Nav_Link_Icon?: ITopMenu_Value
  TopMenu_DropDown_Link?: ITopMenu_LinkValue
  TopMenu_DropDown_Link_Description?: ITopMenu_Value
}

export interface ITopMenu_Item {
  TopMenu_LogoLink?: ITopMenu_LinkValue
  TopMenu_Primary_Nav_Link?: ITopMenu_LinkValue
  TopMenu_Primary_Nav_Link_Icon?: ITopMenu_Value
  TopMenu_Primary_Title?: ITopMenu_Value
  DropDownSectionTitle?: ITopMenu_Value
}

export interface ITopMenu_Child {
  id?: string
  name?: string
  displayName?: string
  templateId?: string
  fields?: ITopMenu_Fields
  className?: string
  menuItems?: Array<ITopMenu_Child>
}

export interface ITopMenu_Value {
  value: string
}

export interface ITopMenu_LinkValue {
  value: ILink
  href?: string
}

export interface ILink {
  href?: string
  text?: string
  linktype?: string
  url?: string
  anchor?: string
  target?: string
}
