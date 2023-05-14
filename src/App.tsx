import { motion } from 'framer-motion'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import Display from './components/Display'
import Keypad from './components/Keypad'
import ThemeToggle from './components/ThemeToggle'
import useRekenmachine from './useRekenmachine'

interface GlobalStyleProps {
  background: string
  color: string
}

const GlobalStyles = createGlobalStyle<{ theme: GlobalStyleProps }>`
  body {
    background: ${props => props.theme.background};
    color: ${props => props.theme.color};
  }
`

const lightTheme = {
  background: '#ffffff',
  color: '#000000'
}

const darkTheme = {
  background: '#323232',
  color: '#ffffff'
}

const StyledApp = styled.div`
  font-family: monospace;
  margin: 25px auto;
  max-width: 400px;
  text-align: center;
`

const Title = styled(motion.h1)`
  font-family: monospace;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 7px;
  margin: 50px 0;
`

const Rekenmachine = styled(motion.div)`
  background-blend-mode: normal, color-burn;
  background: linear-gradient(to bottom, #d5dee7 0%, #e8ebf2 50%, #e2e7ed 100%),
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.02) 50%,
      rgba(255, 255, 255, 0.02) 61%,
      rgba(0, 0, 0, 0.02) 73%
    ),
    linear-gradient(33deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  padding: 10px;
`

function App() {
  const [theme, setTheme, display, onClick] = useRekenmachine()

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <Title animate={{ y: 0 }} initial={{ y: 30 }}>
          REKENMACHINE
        </Title>
        <Rekenmachine animate={{ y: 0 }} initial={{ y: 30 }}>
          <Display display={display} />
          <Keypad onClick={onClick} />
        </Rekenmachine>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </StyledApp>
    </ThemeProvider>
  )
}

export default App
