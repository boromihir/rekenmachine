import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('renders', () => {
  it('title', () => {
    render(<App />)
    expect(screen.getByText(/rekenmachine/i)).toBeInTheDocument()
  })
})

function calculate(buttons: string[], expectedValue: string) {
  it(`${buttons.join(' ')} ${expectedValue}`, async () => {
    render(<App />)

    for (const button of buttons) {
      await userEvent.click(screen.getByTestId(`button-${button}`))
    }

    expect(screen.getByTestId('display')).toHaveTextContent(expectedValue)
  })
}

describe('returns correct result for', () => {
  calculate(['2', '+', '1', '='], '3')

  calculate(['3', '-', '1', '='], '2')

  calculate(['5', 'x', '2', '='], '10')

  calculate(['6', '÷', '2', '='], '3')

  calculate(['2', '+', '1', 'AC'], '0')
})
