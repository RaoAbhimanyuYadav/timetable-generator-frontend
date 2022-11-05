import { Grid } from "@mui/material";
import React from "react";

const Cell = ({ subject }) => {
  return (
    <Grid item xs={6}>
      {/* <p>{subject.semester}</p> */}
      <p>{subject.subjectCode}</p>
      <p>{subject.teacherNickName}</p>
    </Grid>
  );
};

export default Cell;
