import "../styles/components.css"

type Props = {
  value: string
}

function Screen({ value }: Props) {
  return (
    <input type="text" className="input-screen" value={value}/>
  )
}

export default Screen