type Props = {
    btnClass?: string;
    onAction?: (label: string) => void;
    label: string;
};

function Button({ btnClass, onAction, label }: Props) {
    return (
        <button className={btnClass} onClick={() => onAction?.(label)}>
            {label}
        </button>
    );
}

export default Button;
