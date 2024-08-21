import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import CircularWithValueLabel from './CircularWithValueLabel';
import RatingComponent from './RatingComponent'; // Import Rating Component
import { Box } from '@mui/material';

interface ConfirmRideModalProps {
  open: boolean;
  onClose: () => void;
  estimatedTime: number;
  rideId: number // Assuming estimatedTime is in seconds
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ConfirmRideModal: React.FC<ConfirmRideModalProps> = ({ open, onClose, estimatedTime, rideId }) => {
  const [remainingTime, setRemainingTime] = useState<number>(estimatedTime);
  const [modalPhase, setModalPhase] = useState<'waiting' | 'in-progress'>('waiting'); // Phase of the modal

  useEffect(() => {
    if (open) {
      setModalPhase('waiting');
      setRemainingTime(estimatedTime);
    }
  }, [open, estimatedTime]);

  // Countdown timer for waiting phase
  useEffect(() => {
    let timer: number | undefined;
    
    if (modalPhase === 'waiting') {
      timer = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            window.clearInterval(timer); // Stop the timer
            setModalPhase('in-progress'); // Switch to the in-progress phase
            setRemainingTime(estimatedTime); // Reset time for the in-progress phase
            return estimatedTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) window.clearInterval(timer); // Cleanup timer
    };
  }, [modalPhase, estimatedTime]);

  // Countdown timer for in-progress phase
  useEffect(() => {
    let timer: number | undefined;

    if (modalPhase === 'in-progress') {
      timer = window.setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            window.clearInterval(timer); // Stop the timer
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) window.clearInterval(timer); // Cleanup timer
    };
  }, [modalPhase]);

  return (
    <Modal
    open={open}
    onClose={onClose}
    >
      <Box sx={style}>
        {modalPhase === 'waiting' && (
          <>
            <h2>Waiting for driver</h2>
            <CircularWithValueLabel estimatedTime={estimatedTime} />
          </>
        )}
        {modalPhase === 'in-progress' && (
          <>
            <h2>Ride is in progress</h2>
            <CircularWithValueLabel estimatedTime={estimatedTime} />
            {/* Add rating component */}
            <RatingComponent onRate={() => onClose()} rideId={rideId}/>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ConfirmRideModal;
