import { VerificationStatus } from "../util/constants";

interface LoginResponseData {
    id: number;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    address: string;
    profilePictureUrl: string
    isBlocked: boolean
    userType: number,
    verificationStatus: VerificationStatus
}

export default LoginResponseData