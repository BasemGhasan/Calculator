interface Props {
    children?: React.ReactNode;
}

function Button({ children }: Props) {
    return <button className="button">{children}</button>;
}

export default Button;
