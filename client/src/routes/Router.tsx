import Home from "@pages/private/Home";
import { Route, Routes } from "react-router-dom";
import Booking from "@pages/private/Booking";
import { useAuth } from "@contexts/AuthContext";
import Providers from "@pages/private/Providers";
import TripPlanner from "@pages/private/TripPlanner";
import TripConfig from "@pages/private/TripConfig";
import VehicleConfig from "@pages/private/VehicleConfig";
import Vechicles from "@pages/private/Vehicles";
import RequireAuth from "@routes/RequireAuthentication";
import { USERS_ROLES_MAPPING } from "@constants/userRoles";
import GetStarted from "@pages/public/GetStarted";
import PageNotFound from "@pages/common/PageNotFound";
import Profile from "@pages/private/Profile";
import UserBookings from "@pages/private/UserBookings";

export default function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route
          element={
            <RequireAuth isRoleRequired roleName={USERS_ROLES_MAPPING.ADMIN} />
          }
        >
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/trip-config" element={<TripConfig />} />
          <Route path="/vehicles" element={<Vechicles />} />
          <Route path="/vehicle-config" element={<VehicleConfig />} />
          <Route path="/providers" element={<Providers />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/your-booking" element={<UserBookings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        {!isAuthenticated && (
          <Route>
            <Route path="/get-started" element={<GetStarted />} />
          </Route>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
