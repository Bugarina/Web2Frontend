import DriverList from "../drivers-info/DriverList"
import { FinishedRidesList } from "../finished-rides-list/FinishedRidesList"

export const AdminDashboard = () => {
  return (
    <>
        <DriverList/>
        <FinishedRidesList/>
    </>
  )
}
