/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
export const PrivateRoutes = ({ checked }) => {
	return checked ? <Outlet /> : <Navigate to="/securitylogin" />;
};
