/* eslint-disable @typescript-eslint/no-explicit-any */

import TopHeaderWrapper from "@components/headers/TopHeaderWrapper";
import AccessDenied from "@pages/common/AccessDenied";
import { useLocation, Navigate, Outlet } from "react-router-dom";

function RequireAuth({ isRoleRequired }: any) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userCtx = localStorage.getItem("userCtx") as string;
  console.log({ token });
  if (token) {
    const _userCtx = JSON.parse(userCtx) as any;

    if (isRoleRequired && !_userCtx?.roles?.includes("ADMIN")) {
      return <AccessDenied />;
    }
    return (
      <TopHeaderWrapper>
        <Outlet />
      </TopHeaderWrapper>
    );
  }

  return <Navigate to="/get-started" state={{ from: location }} replace />;
}

export default RequireAuth;
