import Ride from '../../models/Ride';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import "./FinishedRideCard.css"

interface RideCardProps {
    ride: Ride;
}

const formatRideStatus = (status: number): string => {
    switch (status) {
        case 0:
            return "Ordered";
        case 1:
            return "Accepted";
        case 2:
            return "Finished";
        default:
            return "Unknown Status";
    }
};

export const FinishedRideCard = ({ ride }: RideCardProps) => {
    return (
        <div className="ride-card__container">
            <div className='ride_card__header'>
                <div className='ride_card__to-from-route'>
                    <h2 className="ride-card__route">{ride.startAddress}</h2>
                    <TrendingFlatIcon fontSize="large" sx={{ color: "#007BFF" }} />
                    <h2 className="ride-card__route">{ride.endAddress}</h2>
                </div>
                <p className={`ride-card__status ride-card__status--${formatRideStatus(ride.rideStatus).toLowerCase()}`}>
                    <strong>Status:</strong> {formatRideStatus(ride.rideStatus)}
                </p>
            </div>
            
            <div className="ride-card__info">
                <div className="ride-card__info-item">
                    <p className="ride-card__info-title">Price: <span className="ride-card__info-value">${ride.estimatedCost}</span></p>
                    <p className="ride-card__info-title">Time: <span className="ride-card__info-value">{ride.estimatedTime} mins</span></p>
                </div>
                <div className="ride-card__info-item">
                    <p className="ride-card__info-title">Ordered by: <span className="ride-card__info-value">{ride.userUsername}</span></p>
                    {ride.driverEmail && (
                        <p className="ride-card__info-title">Driver: <span className="ride-card__info-value">{ride.driverName}</span></p>
                    )}
                </div>
                    <p className="ride-card__info-title">Rating: {ride.rating ? (<span className="ride-card__info-value">{ride.rating} ⭐</span>) : <span>Unrated</span>}</p>
            </div>
        </div>
    );
};
