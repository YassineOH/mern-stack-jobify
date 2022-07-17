import { FC, useState, FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Logo, FormRow, Alert, Loading } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const ResetPassword: FC = () => {
  const { isLoading, showAlert, resetPassword, displayAlert, alertType } =
    useAppContext();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");

  const handleChange = (e: FormEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      displayAlert();
      return;
    }
    resetPassword({
      password,
      email: searchParams.get("email"),
      token: searchParams.get("token"),
    });
  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
        <Logo />

        {showAlert && <Alert />}
        {isLoading && !showAlert && <Loading center />}

        <FormRow
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          labelText="password"
        />
        <button className="btn btn-block" type="submit">
          Set new password
        </button>
        {showAlert && alertType === "success" && (
          <p>
            Return back{" "}
            <Link type="button" to="/" className="member-btn">
              Register / Login
            </Link>
          </p>
        )}
      </form>
    </Wrapper>
  );
};
export default ResetPassword;
