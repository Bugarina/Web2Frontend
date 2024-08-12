import { useState } from "react";
import "./InputField.css";

interface InputFieldProps {
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string; 
    isValid?: boolean;
    className?: string;
    name: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, value, onChange, placeholder, label, isValid, className, name }) => {
    const [isDirty, setIsDirty] = useState(false);

    const handleInputClick = () => {
      if (!isDirty) {
        setIsDirty(true);
      }
    };
    return (
        <div className="input__div">
            {label && <label className="label">{label}</label>}
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                onClick={handleInputClick}
                placeholder={placeholder} 
                className={`input ${(isValid && isDirty) ? 'input__error' : ''} ${className}`}
                name = {name}
            />
        </div>
    );
};

export default InputField;
