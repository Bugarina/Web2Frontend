import { OrderedRidesList } from '../ordered-rides-list/OrderedRidesList'
import { FinishedRidesList } from '../finished-rides-list/FinishedRidesList'

export const DriverDashboard = () => {
  return (
    <>        
        <h1>Available Orders</h1>
        <OrderedRidesList/>
        <h1>Your rides</h1>
        <FinishedRidesList/>
    </>
  )
}
