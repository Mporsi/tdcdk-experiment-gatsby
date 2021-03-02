const defaultTopMenu = 'TopMenu'

export const getTopMenuContent = (): Promise<any> => {
  const path = window.location.pathname.split('/')
  let targetTopMenu = defaultTopMenu

  if (path[1] === 'lg') {
    targetTopMenu = 'DemandGen_TopMenu'
  }
  const endpoint = `https://jss.tdc.dk/sitecore/api/layout/render/jss?item=%2F${targetTopMenu}&sc_lang=da&sc_apikey=%7BA6DB7F66-EFA5-4081-8B43-34F46C7BB28E%7D`

  return fetch(endpoint)
    .then((res: Response): any => {
      return res.json()
    })
    .then((content: any) => {
      return content.sitecore.route.placeholders['erhverv-main-header'][0]
    })
}
