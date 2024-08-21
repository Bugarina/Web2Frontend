import AcceptRideFormData from "../models/AcceptRideFormData";
import RateRideFormData from "../models/RateRideFormData";
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

export const finishRide = async (rideId: number) => {
    return await axiosApiInstance.post(`/rides/finish/${rideId}`);
}

export const rateRide = async (data: RateRideFormData) => {
    return await axiosApiInstance.post('/rides/rate', data);
}
