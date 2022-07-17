import { FC, useState, FormEvent, ChangeEvent, useEffect } from "react";

import { Logo, FormRow, Alert, Loading } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { Link, useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
  isMember: Boolean;
}

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register: FC = () => {
  const [values, setValues] = useState<User>(initialState);
  const {
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    user,
    loginUser,
    clearAlert,
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    clearAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  const toggleMember = (): void => {
    clearAlert();
    setValues({ ...initialState, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {isLoading && !showAlert && <Loading center />}

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="name"
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="email"
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="password"
        />
        <button className="btn btn-block" type="submit">
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet" : "Already a member"}

          <button
            type="button"
            onClick={toggleMember}
            className="member-btn"
            disabled={isLoading}
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
        {values.isMember && (
          <p>
            Forget your password?{" "}
            <Link type="button" to="/forget-password" className="member-btn">
              Reset Password
            </Link>
          </p>
        )}
      </form>
    </Wrapper>
  );
};
export default Register;
