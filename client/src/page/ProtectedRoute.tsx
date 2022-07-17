import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppContext } from "../context/appContext";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
