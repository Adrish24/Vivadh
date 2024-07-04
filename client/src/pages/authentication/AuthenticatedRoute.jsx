/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AuthenticatedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.Auth);

  if (!currentUser){
    return <Navigate to="/auth"/>
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
