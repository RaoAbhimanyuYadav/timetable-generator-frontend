import { Box } from "@mui/material";
import React from "react";

import { CustomTypography } from "../utils/customComponents";

const Cell = ({ subject }) => {
  return (
    <>
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
