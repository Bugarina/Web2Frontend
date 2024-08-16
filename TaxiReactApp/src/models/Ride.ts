interface Ride {
    id: number;
    userUsername: string;
    startAddress: string;
    endAddress: string;
    estimatedCost: number;
    estimatedTime: number;
    driverEmail?: string;
    driverName?: string;
    rating?: number;
    rideStatus: number;
}

export default Ride