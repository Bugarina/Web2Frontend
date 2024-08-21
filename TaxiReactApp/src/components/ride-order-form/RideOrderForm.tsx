import React, { useEffect, useState } from 'react';
import InputField from '../../shared/InputField';
import RideOrderFormData from '../../models/RideOrderFormData';
import Button from '../../shared/Button';
import "./RideOrderForm.css";
import { UserStore } from '../../stores/UserStore';
import { orderRide } from '../../services/RideService';
import ConfirmRideModal from '../ride-progress/ConfirmRideModal';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

export const RideOrderForm = () => {
    const user = UserStore((state) => state.user);
    const [error, setError] = useState('');
    const [rideConfirmed, setRideConfirmed] = useState(false);
    const [formData, setFormData] = useState<RideOrderFormData>({
        userId: 0,
        userUsername: '',
        startAddress: '',
        endAddress: '',
        estimatedCost: 0,
        estimatedTime: 0
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [rideId, setRideId] = useState<number>(0);
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
            console.log("Your ride accepted")
            alert(message)
            setModalOpen(true)
        });

        connection.start()
            .then(() => console.log('SignalR Connected.'))
            .catch(err => console.error('SignalR Connection Error: ', err));

        setHubConnection(connection);

        return () => {
            connection.stop().then(() => console.log('SignalR Disconnected.'));
        };
    }, [formData.userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let errors = '';
        if (!formData.startAddress) {
            errors += 'Start Address is required. ';
        }
        if (!formData.endAddress) {
            errors += 'End Address is required. ';
        }
        setError(errors);
        return errors === '';
    };

    const handleOrder = () => {
        if (!validateForm()) {
            return;
        }
        setError('')
        const estimatedPrice = Math.floor(Math.random() * 50) + 10;
        const estimatedTime = Math.floor(Math.random() * 20) + 5;
        setRideConfirmed(false);
        setFormData({ ...formData, estimatedCost: estimatedPrice, estimatedTime: estimatedTime });
    };

    const handleConfirmRide = async () => {
        setRideConfirmed(true);
        console.log(formData);
        console.log("Ordering ride");
        const result = await orderRide(formData);
        console.log(result);
        setRideId(result.data.id);
    };

    const handleCancelRide = () => {
        setRideConfirmed(true);
    };

    useEffect(() => {
        if (user) {
            setFormData({ ...formData, userId: user.id, userUsername: user.userName });
        }
    }, [user]);

    return (
        <div className='ride-order-form__container'>
            <h3>Order your ride now!</h3>
            <div className='ride-order-form__inputs'>
            <InputField 
                    type="text" 
                    value={formData.startAddress} 
                    onChange={handleChange} 
                    placeholder="Start Address" 
                    label="From:"
                    isValid={!error.includes('Start Address')}
                    className=''
                    name='startAddress'
                />
                <InputField 
                    type="text" 
                    value={formData.endAddress} 
                    onChange={handleChange} 
                    placeholder="End Address" 
                    label="To:"
                    isValid={!error.includes('End Address')}
                    className=''
                    name='endAddress'
                />
            </div>    
            <Button 
                text="Order your ride"
                type="button" 
                disabled={false} 
                onClick={handleOrder}
                className='login__button'
            />
            {error && <p>{error}</p>}
            {formData.estimatedCost > 0 && !rideConfirmed && (
                <div className='confirm-ride__container'>
                    <p>Estimated Cost: <b>${formData.estimatedCost}</b></p>
                    <p>Estimated Time: <b>{formData.estimatedTime} minutes</b></p>
                    <div className='confirm-ride__controls'>
                        <Button 
                            text="Confirm Ride"
                            type="button" 
                            onClick={handleConfirmRide}
                            className='confirm__button'
                        />
                        <Button 
                            text="Cancel"
                            type="button" 
                            onClick={handleCancelRide}
                            className='cancel__button'
                        />
                    </div>
                </div>
            )}
            <ConfirmRideModal open={modalOpen} onClose={() => setModalOpen(false)} estimatedTime={formData.estimatedTime} rideId={rideId} />
        </div>
    );
}
