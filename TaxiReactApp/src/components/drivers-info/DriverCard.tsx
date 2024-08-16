import React from 'react';
import DriverVerifyFormData from '../../models/DriverVerifyFormData';
import DriverBlockFormData from '../../models/DriverBlockFormData';
import { verifyDriver, blockDriver } from '../../services/AdminService';
import './DriverCard.css';
import Button from '../../shared/Button';
import { VerificationStatus } from '../../util/constants';
import { getVerificationStatusString } from '../../util/StringBuilder';

interface DriverCardProps {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    verificationStatus: VerificationStatus;
    isBlocked: boolean;
}

const DriverCard: React.FC<DriverCardProps> = ({ id, userName, firstName, lastName, email, verificationStatus, isBlocked }) => {
    const handleVerify = async (status: VerificationStatus) => {
        const data: DriverVerifyFormData = { DriverId: id, Status: status };
        try{
            await verifyDriver(data);
        }catch(err){
            console.log("oops, something went wrong")
        }

    };

    const handleBlock = async (blockStatus: boolean) => {
        const data: DriverBlockFormData = { DriverId: id, BlockStatus: blockStatus };
        try{
            await blockDriver(data);
        }catch(err){
            console.log("oops, something went wrong")
        }
    };

    return (
        <div className="driver-card__container">
        <div className="driver-card__info">
            <h3>{firstName} {lastName}</h3>
            <p>{userName}</p>
            <p>{email}</p>
            <p>Status: {getVerificationStatusString(verificationStatus)}</p>
        </div>
        <div className="driver-card__actions">
            {verificationStatus == VerificationStatus.Pending && (
                <>
                    <Button 
                        onClick={() => handleVerify(VerificationStatus.Approved)} 
                        text="Verify" 
                        className="confirm__button mini-actions__button" 
                    />
                    <Button 
                        onClick={() => handleVerify(VerificationStatus.Rejected)} 
                        text="Reject" 
                        className="cancel__button mini-actions__button"
                    />
                </>
            )}
            <Button 
                onClick={() => handleBlock(!isBlocked)} 
                text={isBlocked ? 'Unblock' : 'Block'} 
                className="block__button mini-actions__button" 
            />
        </div>
    </div>
    );
};

export default DriverCard;
