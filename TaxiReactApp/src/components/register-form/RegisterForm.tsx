import { useState } from "react";
import Button from "../../shared/Button";
import InputField from "../../shared/InputField";
import RegisterFormData from "../../models/RegisterFormData";
import "../login-form/LoginForm.css"
import { Link } from "react-router-dom";

export const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        address: '',
        birthdate: '',
        profilePicture: 'temp',
    });
    const [checkPassword, setCheckPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({}); 
        console.log("REGISTERING")
    };

    const validateForm = () => {
        const validationErrors: Record<string, string> = {};

        if (!formData.email.trim()) validationErrors.email = 'Email is required';
        if (!formData.password.trim()) validationErrors.password = 'Password is required';
        if (!formData.name.trim()) validationErrors.name = 'First name is required';
        if (!formData.surname.trim()) validationErrors.surname = 'Last name is required';
        if (!formData.address.trim()) validationErrors.address = 'Address is required';
        if (!formData.username.trim()) validationErrors.username = 'Username is required';
        if (!formData.birthdate.trim()) validationErrors.birthdate = 'Birthdate is required';
        if (formData.password !== checkPassword) validationErrors.checkPassword = 'Passwords must match';

        return validationErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'checkPassword') {
            setCheckPassword(value);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className="loginform__container">
            <h2 className="loginform__title">Register</h2>
            <form onSubmit={handleRegister} className="form">
                <InputField
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    label="Email"
                    isValid={Boolean(errors.email)}
                    className=''
                    name='email'
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <InputField
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    label="Password"
                    isValid={Boolean(errors.password)}
                    className=''
                    name='password'
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <InputField
                    type="password"
                    value={checkPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    isValid={Boolean(errors.checkPassword)}
                    className=''
                    name='checkPassword'
                />
                {errors.checkPassword && <p className="error">{errors.checkPassword}</p>}

                <InputField
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    label="Username"
                    isValid={Boolean(errors.username)}
                    className=''
                    name='username'
                />
                {errors.username && <p className="error">{errors.username}</p>}

                <InputField
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First Name"
                    label="First Name"
                    isValid={Boolean(errors.name)}
                    className=''
                    name='name'
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <InputField
                    type="text"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Last Name"
                    label="Last Name"
                    isValid={Boolean(errors.surname)}
                    className=''
                    name='surname'
                />
                {errors.surname && <p className="error">{errors.surname}</p>}

                <InputField
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    label="Address"
                    isValid={Boolean(errors.address)}
                    className=''
                    name='address'
                />
                {errors.address && <p className="error">{errors.address}</p>}

                <InputField
                    type="date"
                    value={formData.birthdate}
                    onChange={handleChange}
                    placeholder="Birth Date"
                    label="Birth Date"
                    isValid={Boolean(errors.birthdate)}
                    className=''
                    name='birthdate'
                />
                {errors.birthdate && <p className="error">{errors.birthdate}</p>}
                <div className="loginform__link-container">
                    <p>Already have an account? <Link to="/" className="loginform__link">Sign in</Link></p>
                </div>
                <Button
                    text="Register"
                    type="submit"
                    disabled={false}
                    onClick={handleRegister}
                    className='login__button'
                />
            </form>
        </div>
    );
};
