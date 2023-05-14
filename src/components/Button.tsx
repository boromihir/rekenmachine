import { ButtonHTMLAttributes, MouseEvent } from 'react'
import styled from 'styled-components'

interface StyledButtonProps {
  clearButton: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${props => (props.clearButton ? '#811331' : '#f0f0f0')};
  border-radius: 16px;
  border: ${props =>
    props.clearButton ? '1px solid #811331' : '1px solid #f0f0f0'};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  color: ${props => (props.clearButton ? '#ffffff' : '#000000')};
  font-family: monospace;
  font-size: 2rem;
  font-weight: 500;
  padding: 10px;
  width: 100%;

  &:active {
    transform: scale(0.95);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  }
`

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  value: string
  clearButton: boolean
}

function Button(props: ButtonProps) {
  const { onClick, value, clearButton } = props

  return (
    <StyledButton
      onClick={onClick}
      value={value}
      clearButton={clearButton}
      data-testid={`button-${value}`}
    >
      {value}
    </StyledButton>
  )
}

export default Button
