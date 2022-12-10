import { Box } from "@mui/material";
import React from "react";

import { CustomTypography } from "../utils/customComponents";

const Cell = ({ subject }) => {
  return (
    <>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
        <CustomTypography sx={{ fontSize: "10px" }}>
          {subject.room !== 0 ? `G${subject.room}` : ""}
        </CustomTypography>
      </Box>
      <CustomTypography>{subject.subjectCode}</CustomTypography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CustomTypography sx={{ fontSize: "10px" }}>
          {subject.groupNumber !== 0 ? `G${subject.groupNumber}` : ""}
        </CustomTypography>
        <CustomTypography sx={{ fontSize: "10px" }}>
          {subject.professorNickName}
        </CustomTypography>
      </Box>
    </>
  );
};

export default Cell;
