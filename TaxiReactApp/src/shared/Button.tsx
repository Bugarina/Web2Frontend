import "./Button.css"

interface ButtonProps {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', disabled = false, className }) => {
    return (
        <button 
            onClick={onClick} 
            type={type}
            disabled={disabled}
            className={`button ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
