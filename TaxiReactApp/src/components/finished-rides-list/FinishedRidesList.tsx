import { useEffect, useState } from 'react'
import { getAllDriverRides, getAllRides, getAllUserRides } from '../../services/RideService';
import Ride from '../../models/Ride';
import "../ordered-rides-list/OrderedRidesList.css"
import { UserStore } from '../../stores/UserStore';
import { FinishedRideCard } from '../finished-ride-card/FinishedRideCard';

export const FinishedRidesList = () => {
    const [rides, setRides] = useState<Ride[]>([]);
    const user = UserStore((state) => state.user);

    const fetchRides = async () => {
        try {
            if(user){
                if(user.userType == 1){
                    const response = await getAllUserRides(user.id); 
                    const validRides = response.data.filter((ride: Ride) => 
                        ride.startAddress && ride.endAddress && ride.userUsername
                    );
                    setRides(validRides);
                }else if (user.userType == 2){
                    const response = await getAllDriverRides(user.email);
                    const validRides = response.data.filter((ride: Ride) => 
                        ride.startAddress && ride.endAddress && ride.userUsername
                    );
                    setRides(validRides);
                }else if (user.userType == 0){
                    const response = await getAllRides();
                    const validRides = response.data.filter((ride: Ride) => 
                        ride.startAddress && ride.endAddress && ride.userUsername
                    );
                    setRides(validRides);                
            }}              
        } catch (error) {
            console.error("Error fetching rides:", error);
        }
    };

    useEffect(() => {
        fetchRides();
    }, []);

    return (
        <div className='ordered-rides-list__container'>
            {rides.map((ride) => (
                <FinishedRideCard key={ride.id} ride={ride} />
            ))}
        </div>
    );
}
