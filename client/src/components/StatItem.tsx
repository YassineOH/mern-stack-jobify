import { FC } from "react";
import Wrapper from "../assets/wrappers/StatItem";

interface Props {
  count: number;
  title: string;
  icon: JSX.Element;
  color: string;
  bcg: string;
}

const StatItem: FC<Props> = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper {...{ color, bcg }}>
      <header>
        <span className="count">{count}</span>
        <div className="icon">{icon}</div>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};
export default StatItem;
