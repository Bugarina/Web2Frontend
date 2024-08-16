import { AdminDashboard } from "../components/dashboards/AdminDashboard";
import { DriverDashboard } from "../components/dashboards/DriverDashboard";
import { UserDashboard } from "../components/dashboards/UserDashboard";
import { ProfileCard } from "../components/profile-card/ProfileCard";
import { UserStore } from "../stores/UserStore";
import "./LandingPage.css";

export const LandingPage = () => {
  
  const user = UserStore((state) => state.user);

  return (
    <div className="landingpage__container">
      <div className="landingpage__left">
        <ProfileCard />
      </div>
      <div className="landingpage__right">
        <h1>Welcome to RideX</h1>
        <p>Your seamless travel companion. Whether you're booking a ride or checking out available trips, we’ve got you covered.</p>
        {user?.userType == 0 && <AdminDashboard/>}
        {user?.userType == 1 && <UserDashboard/>}
        {user?.userType == 2 && <DriverDashboard/>}
      </div>
    </div>
  )
}
