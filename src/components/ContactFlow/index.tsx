import React, { ReactElement, useState } from 'react'
import GenericForm from '../GenericForm'
import { ContactFlowEnum } from './ContactFlowEnum'
import { IContactFlowRendering, IContactFlowStep } from './types'
import { IGenericForm } from '../GenericForm/types'

import * as s from './styles.module.scss'
import { Select } from '@tdcerhverv/select'
import { H2, H3, H4 } from '@tdcerhverv/heading'
import { Paragraph } from '@tdcerhverv/paragraph'

import { useQueryParams, StringParam } from 'use-query-params'
import parse from 'html-react-parser'

export default function ContactFlow(props: IContactFlowRendering): ReactElement {
  if (!props || !props.fields) {
    return <h1>No Props Found</h1>
  }
  const tiles = props?.fields?.children
  const {
    ContactFlow_Title,
    ContactFlow_Description,
    ContactFlow_Steps_Title,
    ContactFow_Form_Title,
    ContactFlow_Form_Description,
    ContactFlow_Form_Chooser_Text,
  } = props?.fields?.item
  const [chosenTile, setChosenTile] = useState(0)
  const [chosenForm, setChosenForm] = useState(0)
  const [blueBox, setBlueBox] = useState({
    headline: '',
    body: '',
  })

  const chooseTile = (tile: number) => {
    setChosenTile(tile)
    sessionStorage.setItem('chosenTile', tile.toString())

    setChosenForm(-1)
    sessionStorage.setItem('chosenForm', '-1')
    setBlueBox({
      headline: tiles[tile]?.fields?.item?.ContactFlow_Step_Section_Info_Box_Title?.value,
      body: tiles[tile]?.fields?.item?.ContactFlow_Step_Section_Info_Box_Description?.value,
    })
    if (window.innerWidth < 980) {
      window.scroll(0, 600)
    }
  }

  const chooseForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const form = Number(e.target.value)
    if (form < 0) {
      return
    }
    const formChosen = tiles[chosenTile]?.fields?.children[form] as IContactFlowStep
    const {
      item: {
        ContactFlow_Step_Section_Info_Box_Description: body,
        ContactFlow_Step_Section_Info_Box_Title: title,
        ContactFlow_Step_Tracking_Id: trackingId,
      },
      children: { 0: firstChild },
    } = formChosen.fields
    setChosenForm(form)
    sessionStorage.setItem('chosenForm', form.toString())
    if (window.innerWidth < 980) {
      window.scroll(0, 750)
    }
    if (body || title) {
      setBlueBox({
        headline: title.value,
        body: body.value,
      })
    } else {
      setBlueBox({
        headline: '',
        body: '',
      })
    }
  }

  const RenderTile = (tile: IContactFlowStep, i: number) => {
    const chosen = chosenTile === i
    const { ContactFlow_Step_Title: title, ContactFlow_Step_Description: description } = tile?.fields?.item
    return (
      <div onClick={() => chooseTile(i)} className={`${s.tile} ${chosen && s.tileChosen}`} key={i}>
        <div className={s.tileText}>
          <H4 className={s.tileHeader}>{title?.value}</H4>
          <Paragraph className={s.tileDescription} weight="regular">
            {description.value}
          </Paragraph>
        </div>
      </div>
    )
  }

  const RenderDropDown = (tile: IContactFlowStep) => {
    const { ContactFlow_Dropdown_Default } = tile?.fields?.item
    return (
      <div className={s.dropdown}>
        <Select error={false} value={Number(chosenForm)} onChange={chooseForm} className={s.formSelect}>
          {Number(chosenForm) === -1 && <option value={-1}>{ContactFlow_Dropdown_Default.value}</option>}
          {tile?.fields?.children?.map((child: IContactFlowStep | IGenericForm, i) => {
            ;<option key={i} value={i}>
              {(child as IContactFlowStep)?.fields?.item?.ContactFlow_Step_Title?.value}
            </option>
          })}
        </Select>
      </div>
    )
  }

  const RenderBlueBox = () => {
    return (
      <div className={s.blueBoxWrapper}>
        {(blueBox.headline || blueBox.body) && (
          <div className={s.blueBoxContent}>
            <H3>{blueBox.headline}</H3>
            <div dangerouslySetInnerHTML={{ __html: blueBox.body }} />
          </div>
        )}
      </div>
    )
  }
  const RenderStepTwo = (step: IContactFlowStep) => {
    const stepTwoIsAList = step?.fields?.children?.length > 1
    const genericFormProps = step.fields.children[0].fields.children[0] as IGenericForm
    return (
      <div className={s.stepTwo}>
        <div className={s.dropdownSectionWrapper}>
          {stepTwoIsAList ? (
            <>
              <H4>
                2. <span>{ContactFlow_Form_Chooser_Text.value}</span>
              </H4>
              {RenderDropDown(step)}
              {chosenForm > -1 && (
                <RenderStepThree step={tiles[chosenTile]?.fields?.children[chosenForm] as IContactFlowStep} />
              )}
            </>
          ) : (
            <>
              <H4> {ContactFlow_Form_Description.value} </H4>
              <GenericForm key={chosenForm} {...genericFormProps} />
            </>
          )}
        </div>
        {RenderBlueBox()}
      </div>
    )
  }

  const RenderStepThree = ({ step }: { step: IContactFlowStep }) => {
    const stepThreeFormOrInfo = step?.fields?.children[0]
    const stepThreeIsAForm = stepThreeFormOrInfo.templateId === ContactFlowEnum.FORM
    if (stepThreeIsAForm) {
      return (
        <div className={s.stepThreeWrapper}>
          <H4>
            3. <span>{ContactFow_Form_Title.value}</span>
          </H4>
          <GenericForm key={chosenForm} {...(stepThreeFormOrInfo as IGenericForm)} />
        </div>
      )
    } else {
      const {
        fields: { ContactFlow_Step_Info_Title, ContactFlow_Step_Info_Body },
      } = stepThreeFormOrInfo as IContactFlowStep

      return (
        <div className={s.stepThreeWrapper}>
          <H4> {ContactFlow_Step_Info_Title?.value} </H4>
          <div>{ContactFlow_Step_Info_Body?.value && parse(ContactFlow_Step_Info_Body.value)}</div>
        </div>
      )
    }
  }

  return (
    <div className={s.componentWrapper}>
      <div className={s.innerComponentWrapper}>
        <div className={s.componentHeader}>
          <H2 className={s.header}>{ContactFlow_Title.value}</H2>
          <Paragraph className={s.contactFlowDescription} weight="regular">
            {ContactFlow_Description.value}
          </Paragraph>
        </div>
        <H4 className={s.tilesHeader}>1. {ContactFlow_Steps_Title.value}</H4>
        <div className={s.tiles}>{tiles.map((el: IContactFlowStep, i: number) => RenderTile(el, i))}</div>
        {chosenTile > -1 && RenderStepTwo(tiles[chosenTile])}
      </div>
    </div>
  )

  function getDefaultsSelected(itemKey: string, queryParam: string): number {
    if (queryParam) {
      sessionStorage.setItem(itemKey, queryParam.toString())
      return Number(queryParam)
    } else if (sessionStorage.getItem(itemKey)) {
      return Number(sessionStorage.getItem(itemKey))
    }
    return -1
  }
}
