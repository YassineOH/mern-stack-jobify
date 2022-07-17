import { FC } from "react";

const Loading: FC<Props> = ({ center }) => {
  return <div className={center ? "loading loading-center" : "loading"}></div>;
};
export default Loading;

interface Props {
  center?: boolean;
}
