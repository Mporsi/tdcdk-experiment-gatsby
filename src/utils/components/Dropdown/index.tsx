import React, { useState, useEffect, ChangeEventHandler } from 'react'

interface IDropdown {
  input: string
  inputId?: string // id passed to the <input>, if you want to be able to select it from outside
  dropdownId?: string // clicks on elements with id=dropdownId will not trigger onBlur. Used to include other elements in the form, use any unique string
  placeholder: string
  suggestionClassName: string
  inputClassName: string
  menuClassName: string // dropdown menu className, set max-height to set number of results shown
  highlightedSuggestionClassName: string
  suggestions: unknown[]
  open: boolean
  disabled?: boolean
  onSelect: (item: unknown) => void
  onBlur?: () => void
  onFocus?: () => void
  onChange: ChangeEventHandler<HTMLInputElement>
  displayValueFromItem: (item: unknown) => string
  emptySuggestionsComponent?: () => JSX.Element
  disableAutocomplete?: boolean
}

export default function Dropdown({
  input,
  inputId,
  dropdownId,
  placeholder,
  suggestionClassName,
  inputClassName,
  menuClassName,
  highlightedSuggestionClassName,
  suggestions,
  open,
  disabled,
  onSelect,
  onBlur,
  onChange,
  onFocus,
  displayValueFromItem,
  disableAutocomplete,
}: IDropdown): JSX.Element {
  const [markedSuggestion, setMarkedSuggestion] = useState<number>(-1)
  const [focused, setFocused] = useState<boolean>(false)

  const canShowMenu = suggestions && suggestions.length
  const onInputFocus = (): void => {
    onFocus && onFocus()
    setFocused(true)
  }

  useEffect(() => {
    if (focused) {
      document.addEventListener('mousedown', onBlurHandler, true)
      return () => document.removeEventListener('mousedown', onBlurHandler, true)
    }
  }, [input, focused])

  const onBlurHandler = (e: MouseEvent): void => {
    const target = e.target as HTMLElement
    const id = target.id || (target?.parentElement?.nodeName === 'SVG' && target.parentElement.id)
    const identifier =
      target.attributes.getNamedItem('data-jsidentifier') &&
      target?.attributes?.getNamedItem('data-jsidentifier')?.value
    if (id === dropdownId || identifier === dropdownId) {
      return
    } else {
      typeof onBlur === 'function' && onBlur()
      setFocused(false)
    }
  }
  const onSelectHandler = (item: unknown): void => {
    onSelect(item)
  }

  const keyboardNavigation = (e: React.KeyboardEvent): void => {
    if (e.keyCode === 40) {
      //down
      if (markedSuggestion === suggestions.length - 1) {
        return
      }
      setMarkedSuggestion(markedSuggestion + 1)
    }
    if (e.keyCode === 38) {
      //up
      if (markedSuggestion === -1) {
        return
      }
      setMarkedSuggestion(markedSuggestion - 1)
    }
    if (e.keyCode === 13) {
      //enter
      if (markedSuggestion > -1) {
        onSelect(suggestions[markedSuggestion])
      }
    }
  }

  const Menu = (): JSX.Element => {
    return (
      <div data-jsidentifier={dropdownId} >
        {suggestions.map((item, i) => {
          return (
            <div
              data-jsidentifier={dropdownId}
              onMouseDown={() => onSelectHandler(item)}
              
              key={i}
            >
              {displayValueFromItem(item)}
            </div>
          )
        })}
      </div>
    )
  }
  const Dropdown = (): JSX.Element => {
    return canShowMenu ? <Menu /> : <></>
  }
  return (
    <div>
      <input
        id={inputId}
        data-jsidentifier={dropdownId}
        placeholder={placeholder}
        onKeyDown={(e) => keyboardNavigation(e)}
        disabled={disabled}
        
        onChange={onChange}
        onFocus={onInputFocus}
        value={input}
        autoComplete={disableAutocomplete ? 'off' : 'on'}
      />
      {open && <Dropdown />}
    </div>
  )
}
