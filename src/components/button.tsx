interface Props {
  children?: React.ReactNode;
}

function Button({ children }: Props) {
  return <button>{children}</button>;
}

export default Button;
