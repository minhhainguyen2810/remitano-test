import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
