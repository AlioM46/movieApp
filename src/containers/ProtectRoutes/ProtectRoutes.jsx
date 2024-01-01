import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectRoutes = ({allowedRoles}) => {
  const {roles} = useAuth();
  const location = useLocation();

  let content;

  if (roles) {
    console.log(roles.some((item) => allowedRoles.includes(item)));
    content = roles.some((item) => allowedRoles.includes(item)) ? (
      <Outlet />
    ) : (
      <Navigate to={"/login"} replace state={{from: location}} />
    );
  }

  return content;
};

export default ProtectRoutes;
