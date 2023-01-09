import React from "react";
import TimeTable from "../common/TimeTable";

import { dataCreator } from "../utils/classes";

const GenerateTimeTable = () => {
  const [timeTable, setTimeTable] = React.useState([]);
  const [year, setYear] = React.useState([]);

  React.useEffect(() => {
    dataCreator(setTimeTable, setYear);
  }, []);

  return (
    <>
      {year.map((year, index) => {
        return (
          <TimeTable
            key={index}
            year={year}
            index={index}
            timeTable={timeTable}
          />
        );
      })}
    </>
  );
};

export default GenerateTimeTable;
