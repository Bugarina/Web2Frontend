import React, { useEffect } from 'react';
import {useDriverStore} from '../../stores/UserStore';
import { getAllDrivers } from '../../services/AdminService';
import DriverCard from './DriverCard';
import "./DriverList.css"

const DriverList: React.FC = () => {
    const { drivers, setDrivers } = useDriverStore();

    useEffect(() => {
        const fetchDrivers = async () => {
            const response = await getAllDrivers();
            setDrivers(response.data);
        };

        fetchDrivers();
    }, [setDrivers]);

    return (
        <div>
            <h2>Available Drivers:</h2>
            <div className='driver-list__container'>
                {drivers.map(driver => (
                    <DriverCard key={driver.id} {...driver} />
                ))}
            </div>
        </div>
    );
};

export default DriverList;
