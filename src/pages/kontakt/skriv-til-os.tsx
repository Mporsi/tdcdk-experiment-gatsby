import React from 'react'
import ContactFlow from '../../components/ContactFlow'

import Data from '../../../skriv-til-os-mock.json'
import { IContactFlowRendering } from '../../components/ContactFlow/types'
import TopMenu from '../../components/Topmenu'
import Footer from '../../components/Footer'

function ContactFlowData(): IContactFlowRendering {
  return (Data.sitecore.route.placeholders['erhverv-main-content'][0] as unknown) as IContactFlowRendering
}

console.log(ContactFlowData())
export default function SkrivTilOs() {
  return (
    <>
      <TopMenu />
      <ContactFlow {...ContactFlowData()} />
      <Footer />
    </>
  )
}
