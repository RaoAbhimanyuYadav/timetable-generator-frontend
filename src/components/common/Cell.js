import { Box } from "@mui/material";
import React from "react";

import { CustomTypography } from "../utils/customComponents";
import { TEACHER_COLOR } from "../constants/TeacherColor";

const Cell = ({ subject }) => {
  const customCSS = TEACHER_COLOR.find(
    (obj) => obj.nickname === subject.professorNickName
  );
  return (
    <Box
      sx={{
        color: customCSS ? customCSS.color : "#000",
        backgroundColor: customCSS ? customCSS.backgroundColor : "#fff",
        width: "100%",
        padding: "10px",
      }}
    >
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
    </Box>
  );
};

export default Cell;
