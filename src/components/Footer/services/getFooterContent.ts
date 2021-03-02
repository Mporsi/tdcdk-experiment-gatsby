const defaultFooter = 'Footer'

export const getFooterContent = (): Promise<any> => {
  const path = window.location.pathname.split('/')
  let targetFooter = defaultFooter

  if (path[1] === 'lg') {
    targetFooter = 'DemandGen_Footer'
  }

  const endpoint = `https://jss.tdc.dk/sitecore/api/layout/render/jss?item=%2F${targetFooter}&sc_lang=da&sc_apikey=%7BA6DB7F66-EFA5-4081-8B43-34F46C7BB28E%7D`
  return fetch(endpoint)
    .then((res: Response): any => {
      return res.json()
    })
    .then((content: any) => {
      return content.sitecore.route.placeholders['erhverv-main-footer'][0]
    })
}
