import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import Button from "../../shared/Button";
import InputField from "../../shared/InputField";
import LoginFormData from "../../models/LoginFormData";
import "./LoginForm.css";

export const LoginForm = () => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!validateForm()) return;     
    };

    const validateForm = () => {
        const errors = [];              
        if (formData.email.trim() === '') {
            errors.push('Email');
        }
        if (formData.password.trim() === '') {
            errors.push('Password');
        }
        if (errors.length) {
            setError(`${errors.join(' and ')} field${errors.length > 1 ? 's' : ''} can't be empty!`);
            return false;
        } else {
            return true;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className='loginform__container'>
            <h2 className='loginform__title'>Log in</h2>
            <form onSubmit={handleLogin} className="form">
                <InputField 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    label="Email"
                    isValid={error.includes('Email') || error.includes('Email and Password')}
                    className=''
                    name='email'
                />
                <InputField 
                    type="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Password" 
                    label="Password"
                    isValid={error.includes('Password') || error.includes('Email and Password')}
                    className=''
                    name='password'
                />
                <div className="loginform__link-container">
                    <p>Don't have an account? <Link to="/register" className="loginform__link">Sign up</Link></p>
                </div>
                <Button 
                    text="Log in"
                    type="submit" 
                    disabled={false} 
                    onClick={handleLogin}
                    className='login__button'
                />
                {error && <p className='error'>{error}</p>}            
            </form>
        </div>
    );
};

export default LoginForm;
