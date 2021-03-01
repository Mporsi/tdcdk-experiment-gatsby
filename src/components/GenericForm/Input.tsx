import React, { useState } from 'react'
import { TextInput } from '@tdcerhverv/text-input'
import { TextArea } from '@tdcerhverv/textarea'
import InfoSVG from '@tdcerhverv/parrotfish/dist/icons/Icons/Info.svg'
import { Icon } from '@tdcerhverv/icon'
import * as s from './styles.module.scss'
import InputFieldTypesEnum from './inputFieldTypesEnum'
import { IGenericFormField } from './types'
import { Paragraph } from '@tdcerhverv/paragraph'

interface IInputFieldProps extends IGenericFormField {
  onChange: ({
    value,
    templateId,
    i,
    required,
  }: {
    value: unknown
    templateId: unknown
    i: unknown
    required: unknown
  }) => void
  onBlur: ({
    value,
    templateId,
    i,
    required,
  }: {
    value: unknown
    templateId: unknown
    i: unknown
    required: unknown
  }) => void
  i: number
  required: boolean
  input: string
  error: boolean
  trackingId?: string
}

export default function InputField(props: IInputFieldProps): JSX.Element {
  const [startedTypingAt, setStartedTypingAt] = useState<number>(0)
  const { onChange, onBlur, name, error, i, templateId, required } = props
  const { Field_PlaceholderText, Field_Title, Field_Error_Text, Field_ShowHint, Field_HintText } = props.fields
  const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    onChange({
      value: e.target.value,
      templateId: templateId,
      i,
      required,
    })
    if (!startedTypingAt) {
      setStartedTypingAt(Date.now())
    }
  }

  const inputBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    onBlur({
      value: e.target.value,
      templateId: templateId,
      i,
      required,
    })
  }
  const inputType = (): string => {
    const fieldType = Object.keys(InputFieldTypesEnum)[Object.values(InputFieldTypesEnum).indexOf(templateId)]
    return fieldType
  }

  const onFocusHandler = () => {}

  const findFieldType = (templateId: string) => {
    switch (templateId) {
      case InputFieldTypesEnum.MESSAGE:
        return TextArea
      default:
        return TextInput
    }
  }

  const Field = findFieldType(templateId)

  return (
    <div className={s.inputWrapper}>
      <div className={s.inputTextDiv}>
        <Field
          placeholder={Field_PlaceholderText?.value || ''}
          labelText={`${Field_Title.value} ${!required ? '(Valgfri)' : ''}`}
          onChange={inputChange}
          error={error && (Field_Error_Text.value || true)} // if error text isn't filled out then pass true
          onBlur={inputBlur}
          name={name}
          validateBeforeFocus={error}
          hideValidation={false}
          onFocus={onFocusHandler}
        />
      </div>

      {Field_ShowHint?.value && (
        <div className={s.svgDiv}>
          <Icon icon={InfoSVG} size={16} className={s.svg} id={s.svg} />
          <div id={s.infoHoverBox} className={s.infoHoverBox}>
            <Paragraph className={s.infoHoverBoxText}>{Field_HintText?.value}</Paragraph>
          </div>
        </div>
      )}
    </div>
  )
}
