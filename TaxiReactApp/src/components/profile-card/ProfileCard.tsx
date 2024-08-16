import { UserStore } from '../../stores/UserStore';
import "./ProfileCard.css"
import defaultProfilePic from "../../assets/catprofile.png"
import Button from '../../shared/Button';
import { useNavigate } from 'react-router-dom';
import { clearLocalStorage } from '../../util/LocalStorage';

export const ProfileCard = () => {

    const user = UserStore((state) => state.user);
    const navigate = useNavigate();
    const handleUpdate = () => {
        console.log("Updating profile");
    };

    const handleLogout = () => {
        clearLocalStorage();
        navigate('/')
    };

    return (
        <div className="profile__container">
            <div className="profile__image">
                <img src={defaultProfilePic} alt="Profile" />
                <h2>{user?.userName}</h2>
            </div>
            <div className="profile__details">
                <p><span>First Name:</span> {user?.firstName}</p>
                <p><span>Last Name:</span> {user?.lastName}</p>
                <p><span>Email:</span> {user?.email}</p>
                <p><span>Date of Birth:</span> {user?.dateOfBirth}</p>
                <p><span>Address:</span> {user?.address}</p>
            </div>
            <Button
             text="Update Profile"
             type="button" 
             disabled={false} 
             onClick={handleUpdate}
             className='update__button'
            />
            <Button
             text="Logout"
             type="button" 
             disabled={false} 
             onClick={handleLogout}
             className='logout__button'
            />
        </div>
    );
};
