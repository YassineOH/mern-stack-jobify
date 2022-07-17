import { FormEvent, FC, useState } from "react";

import { useAppContext } from "../../context/appContext";
import { Alert, FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile: FC = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!email || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName((e.target as HTMLInputElement).value)}
          />
          <FormRow
            labelText="last name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) =>
              setLastName((e.target as HTMLInputElement).value)
            }
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) =>
              setLocation((e.target as HTMLInputElement).value)
            }
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
