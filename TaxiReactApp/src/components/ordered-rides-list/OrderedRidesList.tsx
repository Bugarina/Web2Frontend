import { useEffect, useState } from 'react'
import { getAllOrderedRides } from '../../services/RideService';
import Ride from '../../models/Ride';
import { RideOrderCard } from '../ride-order-card/RideOrderCard';
import "./OrderedRidesList.css"

export const OrderedRidesList = () => {
    const [rides, setRides] = useState<Ride[]>([]);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await getAllOrderedRides();
                const validRides = response.data.filter((ride: Ride) => 
                    ride.startAddress && ride.endAddress && ride.userUsername
                );
                setRides(validRides);
                console.log(validRides);
            } catch (error) {
                console.error("Error fetching rides:", error);
            }
        };

        fetchRides();
    }, []);

    return (
        <div className='ordered-rides-list__container'>
            {rides.map((ride) => (
                <RideOrderCard key={ride.id} ride={ride} />
            ))}
        </div>
    );
}
