import { FC } from "react";
import Wrapper from "../assets/wrappers/JobInfo";

interface Props {
  text: string;
  icon: JSX.Element;
}

const JobInfo: FC<Props> = ({ text, icon }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};
export default JobInfo;
