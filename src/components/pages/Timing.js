import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import TableLayout from "../common/TableLayout";
import Axios from "../Api";
import AddEditDialog from "../common/AddEditDialog";

const Timing = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("timing/")
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const bodyDataKey = ["day", "time_from", "time_to"];
  const headData = ["Day", "From", "To"];
  const formInfo = [
    {
      label: "Day",
      type: "select",
      choices: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thrusday",
        "Friday",
        "Saturday",
      ],
      key: "day",
      default: "Monday",
    },
    {
      label: "From",
      type: "time",
      key: "time_from",
      default: "00:00",
    },
    {
      label: "To",
      type: "time",
      key: "time_to",
      default: "00:00",
    },
  ];

  const deleteHandler = (id) => {
    const body = { id: id };
    console.log(body);
    Axios.delete("timing/", { data: body })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const formSubmitHandler = (data) => {
    Axios.post("timing/", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err.response.data.detail));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px 10px",
        }}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: "800" }}>
          Timing
        </Typography>
        <AddEditDialog
          formInfo={formInfo}
          formSubmitHandler={formSubmitHandler}
        />
      </Box>
      <TableLayout
        data={data}
        headData={headData}
        bodyDataKey={bodyDataKey}
        deleteHandler={deleteHandler}
        formInfo={formInfo}
        formSubmitHandler={formSubmitHandler}
      />
    </>
  );
};

export default Timing;
