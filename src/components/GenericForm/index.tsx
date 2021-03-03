import React, { ReactElement, useContext, useEffect, useState } from 'react'
import Input from './Input'
import { PositiveButton, DefaultButton } from '@tdcerhverv/button'
import Modal from '../../utils/components/Modal'
import * as s from './styles.module.scss'
import {
  isValidFullName,
  isValidEmail,
  isValidCvrNumber,
  isValidAddress,
  isValidPhoneNumber,
  isValidMessage,
} from './genericFormValidation'
import inputFieldTypesEnum from './inputFieldTypesEnum'
import { genericFormEnum } from './genericFormEnum'
import { H3 } from '@tdcerhverv/heading'
import { Paragraph } from '@tdcerhverv/paragraph'
import Spinner from '../../utils/components/Spinner'
import statusEnum from './statusEnum'
import { Action, IGenericForm, IGenericFormChildren, IGenericFormField, IGenericFormFields } from './types'

interface IstateObject {
  input: string
  name: string
  templateId: string
  salesforceId: string
  error: boolean
  required: boolean
}

interface IChangeEvent {
  i: number
  value: string
  templateId: string
  required: boolean
}

interface salesforceRequestObject {
  [key: string]: string
}

export default function GenericForm(props: IGenericForm): ReactElement {
  const { children } = props?.fields
  const formFields: IGenericFormFields = children?.find(
    (child: IGenericFormChildren) => child.templateId === genericFormEnum.FIELDS,
  ) as IGenericFormFields

  const formsDataArray: IGenericFormField[] = formFields?.fields?.children

  const genericFormHostname = ''

  const genericFormsEndpoint = `${genericFormHostname}/submit`

  const submitData: Action = children?.find(
    (child: IGenericFormChildren) => child?.templateId === genericFormEnum.ACTIONS,
  )?.fields.children[0] as Action

  const stateArray: IstateObject[] = []
  formsDataArray.forEach(
    (el, i) =>
      (stateArray[i] = {
        name: el.name,
        templateId: el.templateId,
        salesforceId: el.id,
        error: false,
        required: el.fields.Field_IsMandatory.value,
        input: '',
      }),
  )
  const [state, setState] = useState(stateArray)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [status, setStatus] = useState(statusEnum.INITIAL)
  const { Form_TrackingId, Form_Description } = props.fields.item

  const closeModal = () => {
    setShowModal(false)
    setState(stateArray) //reset form inputs to inital empty state
  }
  const openModal = () => {
    setShowModal(true)
  }
  const submit = () => {
    const newStateArray = JSON.parse(JSON.stringify(state))
    let errorCounter = 0
    newStateArray.forEach((el: IstateObject, i: number) => {
      const validation = findValidationFunction(el.templateId)
      if (el.required && validation && validation(el.input)) {
        newStateArray[i].error = true
        errorCounter++
      }
    })
    setState(newStateArray)
    if (!errorCounter) {
      const requestSentAt = Date.now()
      setStatus(statusEnum.PENDING)
      const fields: salesforceRequestObject = {}
      state.forEach((el) => (fields[el.salesforceId] = el.input))
      const request = {
        formId: props.id,
        fields,
      }
      fetch(genericFormsEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request),
      })
        .then((res) => {
          const responseTime = (Date.now() - requestSentAt) / 1000
          if (res.status === 200) {
            setStatus(statusEnum.SUCCESS)
            openModal()
            clearFormSessionStorage()
          } else {
            setStatus(statusEnum.FAIL)
            openModal()
          }
        })
        .catch(() => setStatus(statusEnum.FAIL))
    }
  }

  //the validation functions return true if validation fails, false if successful
  const findValidationFunction = (templateId: string) => {
    switch (templateId) {
      case inputFieldTypesEnum.EMAIL:
        return isValidEmail
      case inputFieldTypesEnum.NAME:
        return isValidFullName
      case inputFieldTypesEnum.PHONE:
        return isValidPhoneNumber
      case inputFieldTypesEnum.CVR:
        return isValidCvrNumber
      case inputFieldTypesEnum.ADDRESS:
        return isValidAddress
      case inputFieldTypesEnum.MESSAGE:
        return isValidMessage
      case inputFieldTypesEnum.RADIO:
      case inputFieldTypesEnum.CHECKBOX:
      case inputFieldTypesEnum.TEXT:
        return () => false
      default:
        console.error('unsupported type passed as props to a field in GenericForm')
    }
  }

  useEffect(() => {
    const newStateArray = JSON.parse(JSON.stringify(state))
    const rawData = sessionStorage?.getItem('formData')
    const formData = rawData && JSON.parse(rawData)
    if (formData) {
      newStateArray.forEach(
        (stateObject: { name: React.Key; input: any; templateId: string; error: boolean | undefined }) => {
          if (formData[stateObject.name]) {
            stateObject.input = formData[stateObject.name]
            const validation = findValidationFunction(stateObject.templateId)
            stateObject.error = validation && validation(formData[stateObject.name])
          }
        },
      )
    }
    setState(newStateArray)
  }, [])

  const onInputChange = (e: IChangeEvent) => {
    const { i, templateId, value, required } = e
    const newStateArray = JSON.parse(JSON.stringify(state))
    newStateArray[i].input = value

    if (state[i].error && required) {
      const valdiation = findValidationFunction(templateId)
      newStateArray[i].error = valdiation && valdiation(value)
    }
    setState(newStateArray)
  }
  const onBlur = (e: IChangeEvent) => {
    const { i, templateId, value, required } = e
    if (required) {
      const newStateArray = JSON.parse(JSON.stringify(state))
      const valdiation = findValidationFunction(templateId)
      newStateArray[i].error = valdiation && valdiation(value)
      setState(newStateArray)
    }
  }
  const {
    SubmitAction_SubmitButtonLabel,
    SubmitAction_SubmitSuccessHeader,
    SubmitAction_SubmitErrorHeader,
    SubmitAction_SubmitSuccessBody,
    SubmitAction_SubmitErrorBody,
    SubmitAction_SubmitSuccessButtonLabel,
    SubmitAction_SubmitErrorButtonLabel,
  } = submitData.fields

  const RenderModal = () => {
    const success = status === statusEnum.SUCCESS
    return (
      <Modal close={closeModal}>
        <div >
          <div >
            <H3 >
              {success ? SubmitAction_SubmitSuccessHeader?.value : SubmitAction_SubmitErrorHeader?.value}
            </H3>
            <Paragraph >
              {success ? SubmitAction_SubmitSuccessBody?.value : SubmitAction_SubmitErrorBody?.value}
            </Paragraph>
            <a href="https://tdc.dk">
              <DefaultButton onClick={closeModal} >
                {success ? SubmitAction_SubmitSuccessButtonLabel?.value : SubmitAction_SubmitErrorButtonLabel?.value}
              </DefaultButton>
            </a>
          </div>
          <div id="genericformsubmit" ub-in-page="5c73d5c101634d701d3482fd">
            &nbsp;
            {/* Usabilla injects the widget here via gtm, note the space so the div will be visible, thus triggering the visibility gtm trigger! */}
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <div >
      <Paragraph>{Form_Description.value}</Paragraph>

      {formsDataArray.map((el, i) => (
        <Input
          i={i}
          key={i}
          onChange={onInputChange}
          onBlur={onBlur}
          trackingId={Form_TrackingId.value}
          {...el}
          {...state[i]}
        />
      ))}
      <PositiveButton onClick={submit}>
        <div >
          <div >{SubmitAction_SubmitButtonLabel.value}</div>
          <div >
            <Spinner />
          </div>
        </div>
      </PositiveButton>
      {showModal && RenderModal()}
    </div>
  )
}
function clearFormSessionStorage() {
  sessionStorage.removeItem('formData')
  sessionStorage.removeItem('chosenTile')
  sessionStorage.removeItem('chosenForm')
  sessionStorage.removeItem('NoCVR')
}
