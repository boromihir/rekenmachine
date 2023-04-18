import { cleanup, render, screen } from '@testing-library/react'
import { afterEach } from 'vitest'

import App from './App'

afterEach(() => {
  cleanup()
})

describe('renders', () => {
  it('title', () => {
    render(<App />)

    expect(screen.getByText(/Rekenmachine/i)).toBeInTheDocument()
  })
})
