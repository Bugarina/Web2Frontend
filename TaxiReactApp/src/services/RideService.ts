import AcceptRideFormData from "../models/AcceptRideFormData";
import RideOrderFormData from "../models/RideOrderFormData"
import axiosApiInstance from "../util/AxiosInterceptor"

export const orderRide = async (orderDetails: RideOrderFormData) => {
    return await axiosApiInstance.post('/rides/order', orderDetails);
}

export const getAllOrderedRides = async () => {
    const status = "Ordered"; 
    return await axiosApiInstance.get(`/rides/status/${status}`);
}

export const acceptRide = async (data: AcceptRideFormData) => {
    return await axiosApiInstance.post('/rides/accept', data);
}

export const getAllUserRides = async (userID: number) => {
    return await axiosApiInstance.get(`/rides/finished/user/${userID}`);
}

export const getAllDriverRides = async (driverEmail: string) => {
    return await axiosApiInstance.get(`/rides/finished/driver/${driverEmail}`);
}

export const getAllRides = async () => {
    return await axiosApiInstance.get(`/rides/all`);
}