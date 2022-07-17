import { FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { Logo, FormRow, Alert, Loading } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";

const ForgetPassword: FC = () => {
  const { isLoading, showAlert, forgetPassword, displayAlert } =
    useAppContext();
  const [email, setEmail] = useState("");

  const handleChange = (e: FormEvent) => {
    setEmail((e.target as HTMLInputElement).value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      displayAlert();
      return;
    }
    forgetPassword(email);
  };
  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
        <Logo />

        {showAlert && <Alert />}
        {isLoading && !showAlert && <Loading center />}

        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          labelText="email"
        />
        <button className="btn btn-block" type="submit">
          Reset my password
        </button>
        <p>
          Return back{" "}
          <Link type="button" to="/" className="member-btn">
            Register / Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default ForgetPassword;
