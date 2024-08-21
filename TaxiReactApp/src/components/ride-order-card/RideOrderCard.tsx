import Ride from '../../models/Ride';
import Button from '../../shared/Button';
import "./RideOrderCard.css";
import { acceptRide } from '../../services/RideService';
import { UserStore } from '../../stores/UserStore';
import AcceptRideFormData from '../../models/AcceptRideFormData';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { VerificationStatus } from '../../util/constants';
import { useState } from 'react';
import ConfirmRideModal from '../ride-progress/ConfirmRideModal';

interface RideOrderCardProps {
    ride: Ride;
}

export const RideOrderCard = ({ ride }: RideOrderCardProps) => {
    const user = UserStore((state) => state.user);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const handleAcceptRide = async () => {
        if (user) {
            const acceptRideData: AcceptRideFormData = {
                rideId: ride.id,
                driverEmail: user.email,
                driverName: user.userName,
            };

            try {
                const response = await acceptRide(acceptRideData);
                console.log("Ride Accepted", response.data);
                setModalOpen(true)
                console.log(modalOpen)
                // Additional logic after successful ride acceptance can be added here
            } catch (error) {
                console.error("Error accepting ride:", error);
            }
        } else {
            console.error("User is not logged in");
        }
    };

    return (
        <div className="ride-order-card__container">
            <div className="ride-order-card__details">
                <div className='ride-order-card__to-from'>
                    <h2 className="ride-order-card__route">{ride.startAddress}</h2>
                    <TrendingFlatIcon fontSize="large" sx={{ color: "#007BFF" }}/>
                    <h2 className="ride-order-card__route"> {ride.endAddress}</h2>
                 </div>
                <p className="ride-order-card__info"><strong>Price:</strong> ${ride.estimatedCost}</p>
                <p className="ride-order-card__info"><strong>Estimated Time:</strong> {ride.estimatedTime} mins</p>
                <p className="ride-order-card__info"><strong>Ordered by:</strong> {ride.userUsername}</p>
            </div>
            <Button
                text="Accept Ride"
                type="button"
                disabled={user?.verificationStatus != VerificationStatus.Approved || user?.isBlocked}
                onClick={handleAcceptRide}
                className='ride-order-card__button'
            />
            <ConfirmRideModal open={modalOpen} onClose={() => setModalOpen(false)} estimatedTime={ride.estimatedTime} rideId={ride.id} />
        </div>
    );
};
