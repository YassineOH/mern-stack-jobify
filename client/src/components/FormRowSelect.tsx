import { ChangeEvent, FC } from "react";

interface Props {
  list: string[];
  name: string;
  value: string;
  handleChange(e: ChangeEvent): void;
  labelText?: string;
}

const FormRowSelect: FC<Props> = ({
  list,
  name,
  value,
  handleChange,
  labelText,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((item: string, ind: number) => {
          return (
            <option value={item} key={ind}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
