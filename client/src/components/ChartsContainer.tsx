import { FC, useState } from "react";

import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer: FC = () => {
  const { monthlyApplications: data } = useAppContext();
  const [bar, setBar] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBar(!bar)}>
        {bar ? "AreaChart" : "BarChart"}
      </button>
      {bar ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
