import { VerificationStatus } from "./constants";

export const getVerificationStatusString = (status: number): string => {
    switch (status) {
        case VerificationStatus.Pending:
            return "Pending";
        case VerificationStatus.Approved:
            return "Approved";
        case VerificationStatus.Rejected:
            return "Rejected";
        default:
            return "Unknown";
    }
}