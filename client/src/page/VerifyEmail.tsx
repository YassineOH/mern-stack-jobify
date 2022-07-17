import { FC, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Wrapper from "../assets/wrappers/VerifyPage";
import { Logo, Alert, Loading } from "../components";
import { useAppContext } from "../context/appContext";

const VerifyEmail: FC = () => {
  const { verifyUser, isLoading, showAlert, alertType, clearAlert } =
    useAppContext();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    verifyUser({
      email: searchParams.get("email"),
      verificationToken: searchParams.get("token"),
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Wrapper className="full-page">
      <div className="form myStyle">
        <Logo />

        {isLoading && <Loading />}

        {showAlert && <Alert />}

        <Link
          to="/register"
          className={`btn btn-${alertType}`}
          onClick={clearAlert}
        >
          {alertType === "success" ? "Log In" : "Register"}
        </Link>
      </div>
    </Wrapper>
  );
};
export default VerifyEmail;
