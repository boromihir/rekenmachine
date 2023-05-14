import { MouseEvent } from 'react'
import styled from 'styled-components'

import Button from './Button'

const StyledKeypad = styled.div`
  align-items: end;
  column-gap 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  row-gap: 10px;
`

interface KeypadProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function Keypad(props: KeypadProps) {
  const { onClick } = props

  const keypadItems: Array<string> = [
    '7',
    '8',
    '9',
    '÷',
    '4',
    '5',
    '6',
    'x',
    '1',
    '2',
    '3',
    '-',
    'AC',
    '0',
    '=',
    '+'
  ]

  return (
    <StyledKeypad>
      {keypadItems.map(item => (
        <Button
          key={item}
          onClick={onClick}
          value={item}
          clearButton={item == 'AC'}
        >
          {item}
        </Button>
      ))}
    </StyledKeypad>
  )
}

export default Keypad
