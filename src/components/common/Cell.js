import { Box, Typography } from "@mui/material";
import React from "react";

const Cell = ({ subject }) => {
  return (
    <>
      <Typography>{subject.subjectCode}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography sx={{ fontSize: "10px" }}>
          {subject.groupNumber !== 0 ? `G${subject.groupNumber}` : ""}
        </Typography>
        <Typography sx={{ fontSize: "10px" }}>
          {subject.professorNickName}
        </Typography>
      </Box>
    </>
  );
};

export default Cell;
