import { useEffect, useState } from 'react'
import { getAllOrderedRides } from '../../services/RideService';
import Ride from '../../models/Ride';
import { RideOrderCard } from '../ride-order-card/RideOrderCard';
import "./OrderedRidesList.css"
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

export const OrderedRidesList = () => {
    const [rides, setRides] = useState<Ride[]>([]);
    const [hubConnection, setHubConnection] = useState<HubConnection | null>(null);

    useEffect(() => {
        // Initialize SignalR connection
        const connection = new HubConnectionBuilder()
            .withUrl('http://localhost:8352/rideNotificationHub', {
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build();

        connection.on("RideAccepted", (message: string) => {
            console.log("Ride accepted")
            fetchRides()
        });
        connection.on("RideOrdered", (message: string) => {
            console.log("New ride ordered")
            fetchRides()
        });

        connection.start()
            .then(() => console.log('SignalR Connected.'))
            .catch(err => console.error('SignalR Connection Error: ', err));

        setHubConnection(connection);

        return () => {
            connection.stop().then(() => console.log('SignalR Disconnected.'));
        };
    }, []);

    useEffect(() => {    
        fetchRides();
    }, []);

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

    return (
        <div className='ordered-rides-list__container'>
            {rides.map((ride) => (
                <RideOrderCard key={ride.id} ride={ride} />
            ))}
        </div>
    );
}
