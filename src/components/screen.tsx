import "../styles/components.css"

type Props = {
  value: string
  theme: string
}

function Screen({ value, theme }: Props) {
  return (
    <input type="text" className="input-screen" value={value} screen-theme={theme} readOnly/>
  )
}

export default Screen