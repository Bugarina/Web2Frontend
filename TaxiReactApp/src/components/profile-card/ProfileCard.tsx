import { UserStore } from '../../stores/UserStore';
import "./ProfileCard.css"
import defaultProfilePic from "../../assets/catprofile.png"
import { useNavigate } from 'react-router-dom';
import { clearLocalStorage } from '../../util/LocalStorage';
import dayjs from 'dayjs';
import { getVerificationStatusString } from '../../util/StringBuilder';
import { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { getUser, updateProfileImage } from '../../services/UserService';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const ProfileCard = () => {

    const user = UserStore((state) => state.user);
    const [hubConnection, setHubConnection] = useState<HubConnection | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [profileImage, setProfileImage] = useState<string | undefined>(user?.profilePictureUrl);
    const navigate = useNavigate();
    const handleUpdate = () => {
        navigate('/update')
    };

    const handleLogout = () => {
        clearLocalStorage();
        navigate('/')
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file)
        setSelectedFile(file);
    };

    const handleUpdateImage = () => {
        if (selectedFile && user) {
            const formData = new FormData();
            formData.append("profileImage", selectedFile);

            updateProfileImage(user.id, formData)
                .then(response => {
                    UserStore.getState().setUser(response.data);
                    window.location.reload();
                })
                .catch(error => console.error("Error updating profile image:", error));
        }
    };

    useEffect(() => {
        // Initialize SignalR connection
        const connection = new HubConnectionBuilder()
            .withUrl('http://localhost:8352/rideNotificationHub', {
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build();
    
        connection.on("UserBlocked", (message: string) => {
            console.log("You have been blocked");
    
            if (user) {
                getUser(user.email)
                    .then((response) => {
                        if (response && response.data) {
                            console.log(response.data);
    
                            // Update the UserStore with the received user data
                            UserStore.getState().setUser(response.data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching user data:", error);
                    });
            }
        });
    
        connection.start()
            .then(() => console.log('SignalR Connected.'))
            .catch(err => console.error('SignalR Connection Error: ', err));
    
        setHubConnection(connection);
    
        return () => {
            connection.stop().then(() => console.log('SignalR Disconnected.'));
        };
    }, []);

    
    return (
        <div className="profile__container">
            <div className="profile__image">
    <img 
        src={profileImage !== 'temp' ? `http://localhost:8352/${profileImage}` : defaultProfilePic} 
        alt="Profile" 
    />
    <h2>{user?.userName}</h2>
    <Input 
        type="file" 
        onChange={handleFileChange}
        style={{ display: 'none' }} 
        id="upload-button"

    />
    <label htmlFor="upload-button">
        <Button 
            variant="contained" 
            component="span" 
            style={{ backgroundColor: '#FF570A', color: '#fff', margin: 5 }}
            startIcon={<CloudUploadIcon />}
        >
            Add Profile Image
        </Button>
    </label>
    {selectedFile && (
        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleUpdateImage}
            className="update__button"
            style={{ backgroundColor: '#FF570A', color: '#fff' }}
            startIcon={<CloudUploadIcon />}
        >
            Upload Image
        </Button>
        
    )}
</div>

            <div className="profile__details">
                <p><span>First Name:</span> {user?.firstName}</p>
                <p><span>Last Name:</span> {user?.lastName}</p>
                <p><span>Email:</span> {user?.email}</p>
                <p><span>Date of Birth:</span> {dayjs(user?.dateOfBirth).format('YYYY-MM-DD')}</p>
                <p><span>Address:</span> {user?.address}</p>
                {user && <p><span>Status:</span> {getVerificationStatusString(user.verificationStatus)}</p>}
            </div>
            <Button
                variant="contained" 
                color="primary" 
                onClick={handleUpdate}
                className='update__button'
                style={{ backgroundColor: '#FF570A', color: '#fff', margin: 10}}
            >
                Update Profile
            </Button>
            <Button
                variant="contained" 
                onClick={handleLogout}
                className='logout__button'
                style={{ backgroundColor: '#FF570A', color: '#fff', margin: 10 }}
            >
                Logout
            </Button>
        </div>
    );
};
