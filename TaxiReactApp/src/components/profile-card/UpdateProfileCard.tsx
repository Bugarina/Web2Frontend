import React, { useEffect, useState } from 'react'
import InputField from '../../shared/InputField';
import Button from '../../shared/Button';
import { useNavigate } from 'react-router-dom';
import UpdateProfileFormData from '../../models/UpdateProfileFormData';
import { UpdateProfile } from '../../services/UserService';
import "../login-form/LoginForm.css"
import { UserStore } from '../../stores/UserStore';
import dayjs from 'dayjs';

export const UpdateProfileCard = () => {
    const navigate = useNavigate();
    const user = UserStore((state) => state.user);
    const [formData, setFormData] = useState<UpdateProfileFormData>({
        userName: '',
        firstName: '',
        lastName: '',
        address: '',
        dateOfBirth: '',
        profilePicture: 'temp',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({}); 
        console.log(formData)
        try{
            if(user){
                const response = await UpdateProfile(user.id, formData)
                console.log(response)
                UserStore.getState().setUser(response.data)
                navigate("/home")
            }
        }catch (err){
            console.log(err)
        }
    };

    const validateForm = () => {
        const validationErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) validationErrors.name = 'First name is required';
        if (!formData.lastName.trim()) validationErrors.surname = 'Last name is required';
        if (!formData.address.trim()) validationErrors.address = 'Address is required';
        if (!formData.userName.trim()) validationErrors.username = 'Username is required';
        if (!formData.dateOfBirth.trim()) validationErrors.birthdate = 'Birthdate is required';

        return validationErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if(user)
        setFormData({...formData, userName: user.userName, lastName: user.lastName, firstName: user.firstName, address: user.address, dateOfBirth: dayjs(user.dateOfBirth).format('YYYY-MM-DD') })
    },[])


    return (
        <div className="loginform__container">
            <h2 className="loginform__title">Update Profile</h2>
            <form onSubmit={handleUpdate} className="form">

                <InputField
                    type="text"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Username"
                    label="Username"
                    isValid={Boolean(errors.username)}
                    className=''
                    name='userName'
                />
                {errors.username && <p className="error">{errors.username}</p>}

                <InputField
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    label="First Name"
                    isValid={Boolean(errors.name)}
                    className=''
                    name='firstName'
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <InputField
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    label="Last Name"
                    isValid={Boolean(errors.surname)}
                    className=''
                    name='lastName'
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
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Birth Date"
                    label="Birth Date"
                    isValid={Boolean(errors.birthdate)}
                    className=''
                    name='dateOfBirth'
                />
                {errors.birthdate && <p className="error">{errors.birthdate}</p>}
                <Button
                    text="Update"
                    type="submit"
                    disabled={false}
                    onClick={handleUpdate}
                    className='login__button'
                />
            </form>
        </div>
    );
};
