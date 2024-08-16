import DriverBlockFormData from "../models/DriverBlockFormData";
import DriverVerifyFormData from "../models/DriverVerifyFormData";
import axiosApiInstance from "../util/AxiosInterceptor"

export const getAllDrivers = async () => {
    return await axiosApiInstance.get(`/users/drivers`);
}

export const verifyDriver = async (data : DriverVerifyFormData) => {
    return await axiosApiInstance.post(`/drivers/verify`, data);
}

export const blockDriver = async (data : DriverBlockFormData) => {
    return await axiosApiInstance.post(`/drivers/block`, data);
}