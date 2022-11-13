import { Grid, Typography } from "@mui/material";
import React from "react";

const Cell = ({ subject }) => {
  return (
    <Grid item xs={6}>
      {subject.groupNumber !== 0 && (
        <Typography>{`G${subject.groupNumber}`}</Typography>
      )}
      <Typography>{subject.subjectCode}</Typography>
      <Typography>{subject.professorNickName}</Typography>
    </Grid>
  );
};

export default Cell;
