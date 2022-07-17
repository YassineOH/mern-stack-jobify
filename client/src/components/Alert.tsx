import { FC } from "react";
import { useAppContext } from "../context/appContext";

const Alert: FC = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
export default Alert;
