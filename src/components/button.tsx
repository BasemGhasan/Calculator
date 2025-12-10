interface Props {
    children?: React.ReactNode;
    btnClass: string
}

function Button({ children, btnClass }: Props) {
    return <button className = {btnClass}>{children}</button>;
}

export default Button;
