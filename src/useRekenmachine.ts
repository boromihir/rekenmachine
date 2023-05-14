import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'

type Operator = '+' | '-' | 'x' | '÷' | '=' | 'C'
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type Rekenmachine = [
  theme: string,
  setTheme: Dispatch<SetStateAction<string>>,
  display: string,
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
]

function useRekenmachine(): Rekenmachine {
  // slightly modified logic from https://github.com/tuanpham-dev/calculator-react-typescript

  const [theme, setTheme] = useState<string>('light')
  const [display, setDisplay] = useState<string>('0')
  const [result, setResult] = useState<number>(0)
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true)
  const [pendingOperator, setPendingOperator] = useState<Operator>()

  const calculate = (
    rightOperand: number,
    pendingOperator: Operator
  ): boolean => {
    let newResult = result

    switch (pendingOperator) {
      case '+':
        newResult += rightOperand
        break
      case '-':
        newResult -= rightOperand
        break
      case 'x':
        newResult *= rightOperand
        break
      case '÷':
        if (rightOperand === 0) {
          return false
        }

        newResult /= rightOperand
    }

    setResult(newResult)
    setDisplay(newResult.toString().slice(0, 12))

    return true
  }

  const equalButtonClick = () => {
    const operand = Number(display)

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return
      }

      setPendingOperator(undefined)
    } else {
      setDisplay(operand.toString())
    }

    setResult(operand)
    setWaitingForOperand(true)
  }

  const operatorButtonClick = (operator: Operator) => {
    const operand = Number(display)

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return
      }
    } else {
      setResult(operand)
    }

    setPendingOperator(operator)
    setWaitingForOperand(true)
  }

  const digitButtonClick = (digit: Digit) => {
    let newDisplay = display

    if ((display === '0' && digit === 0) || display.length > 12) {
      return
    }

    if (waitingForOperand) {
      newDisplay = ''
      setWaitingForOperand(false)
    }

    if (display !== '0') {
      newDisplay = newDisplay + digit.toString()
    } else {
      newDisplay = digit.toString()
    }

    setDisplay(newDisplay)
  }

  const onClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()

    const value = event.currentTarget.value

    switch (value) {
      case 'AC':
        setDisplay('0')
        setResult(0)
        setWaitingForOperand(true)
        setPendingOperator(undefined)
        break
      case '=':
        equalButtonClick()
        break
      case '+':
      case '-':
      case 'x':
      case '÷':
        operatorButtonClick(value)
        break
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        digitButtonClick(Number(value) as Digit)
        break
      default:
        break
    }
  }

  return [theme, setTheme, display, onClick]
}

export default useRekenmachine
