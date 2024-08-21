import { Rating, Typography } from '@mui/material';
import React from 'react';
import Button from '../../shared/Button';
import { finishRide, rateRide } from '../../services/RideService';
import RateRideFormData from '../../models/RateRideFormData';

interface RatingComponentProps {
  onRate: (rating: number) => void;
  rideId: number // Define the type of the callback function
}

const RatingComponent: React.FC<RatingComponentProps> = ({ onRate, rideId }) => {
  const [rating, setRating] = React.useState<number | null>(1); // Define the type of the state

  const handleRate = async (newRating: number) => {
    setRating(newRating);
    const rateRideData: RateRideFormData = {
        rideId: rideId,
        rating: rating ? rating : 1
      };
    console.log(rateRideData)
    const finishResponse = await finishRide(rideId)
    console.log(finishResponse)  
    const rateResponse = await rateRide(rateRideData)
    console.log(rateResponse)
    onRate(newRating); // Pass the rating back to the parent component
  };

  return (
    <div>
      <Typography component="legend">Rating</Typography>
        <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
            setRating(newValue);
        }}
        />
        <Button 
            text="Rate Ride"
            type="button" 
            disabled={false} 
            onClick={() => handleRate(rating? rating : 1)}
            className='login__button'
        />
       
    </div>
  );
};

export default RatingComponent;
