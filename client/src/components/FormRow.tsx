import { FC, ChangeEvent } from "react";

interface Props {
  type: string;
  name: string;
  value: string;
  handleChange(e: ChangeEvent): void;
  labelText?: string;
}

const FormRow: FC<Props> = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
