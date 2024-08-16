interface User {
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    birthdate: string;
    address: string;
    profilePicture: string
    isBlocked: boolean
    userType: 'Admin' | 'User' | 'Driver',
    verificationStatus: 'Pending' | 'Verified' | 'Rejected'
}

export default User