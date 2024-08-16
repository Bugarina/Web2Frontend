import { FinishedRidesList } from "../finished-rides-list/FinishedRidesList"
import { RideOrderForm } from "../ride-order-form/RideOrderForm"

export const UserDashboard = () => {
  return (
    <>
        <RideOrderForm />
        <h1>Your rides</h1>
        <FinishedRidesList/>
    </>
  )
}
