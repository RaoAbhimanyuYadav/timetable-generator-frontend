import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import TableLayout from "../common/TableLayout";
import Axios from "../Api";
import AddEditDialog from "../common/AddEditDialog";
import {
  bodyDataKey,
  URL,
  formInfo,
  headData,
} from "../constants/professorConstant";

const getData = (setData) => {
  Axios.get(URL)
    .then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    })
    .catch((err) => console.log(err));
};

const Professor = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(setData);
  }, []);

  const deleteHandler = (id) => {
    const body = { id: id };
    Axios.delete(URL, { data: body })
      .then((res) => {
        if (res.status === 200) {
          getData(setData);
        }
      })
      .catch((err) => console.log(err));
  };

  const formSubmitHandler = (data, isEdited, id) => {
    isEdited
      ? Axios.put(URL, { ...data, id: id })
          .then((response) => {
            if (response.status === 200) {
              getData(setData);
            }
          })
          .catch((err) => console.log(err.response.data.detail))
      : Axios.post(URL, data)
          .then((response) => {
            if (response.status === 200) {
              getData(setData);
            }
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
          Professor
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

export default Professor;
