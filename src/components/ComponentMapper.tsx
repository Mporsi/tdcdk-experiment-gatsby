import React, { ReactElement } from 'react'
import { Typography } from '@material-ui/core'

const Hero = (): ReactElement => <Typography variant={'h3'}>Hero component will be centrally defined</Typography>
const Form = (): ReactElement => <Typography variant={'h3'}>Form component will be centrally defined</Typography>
const Error = (): ReactElement => <Typography variant={'h3'}>Error component will be centrally defined</Typography>
const Accordion = (): ReactElement => (
  <Typography variant={'h3'}>Accordion component will be centrally defined</Typography>
)

export function ComponentMapper({ type }: { type: string }): JSX.Element {
  const componentMap: { [key: string]: () => ReactElement } = {
    ContentfulHero: Hero,
    ContentfulForm: Form,
    ContentfulAccordion: Accordion,
    Error: Error,
  }
  if (!componentMap[type]) return componentMap['Error']()

  return componentMap[type]()
}
