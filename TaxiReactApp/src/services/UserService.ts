import UpdateProfileFormData from "../models/UpdateProfileFormData"
import axiosApiInstance from "../util/AxiosInterceptor"

export const UpdateProfile = async (id: number, data: UpdateProfileFormData) => {
    return await axiosApiInstance.put(`/users/${id}`, data);
}

export const getUser = async (email: string) => {
    return await axiosApiInstance.get(`/users/${email}`);
}

export const updateProfileImage = async (id: number, profileImage: FormData) => {
    return await axiosApiInstance.put(`/users/${id}/update-profile-image`, profileImage, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};