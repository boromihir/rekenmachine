import styled from 'styled-components'

const StyledDisplay = styled.div`
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  border-radius: 16px;
  border: 1px solid #eef1f5;
  color: #000000;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 10px;
  padding: 10px;
  text-align: right;
`

interface DisplayProps {
  display: string
}

function Display(props: DisplayProps) {
  const { display } = props

  return <StyledDisplay data-testid="display">{display || 0}</StyledDisplay>
}

export default Display
