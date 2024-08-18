import UpdateProfileFormData from "../models/UpdateProfileFormData"
import axiosApiInstance from "../util/AxiosInterceptor"

export const UpdateProfile = async (id: number, data: UpdateProfileFormData) => {
    return await axiosApiInstance.put(`/users/${id}`, data);
}