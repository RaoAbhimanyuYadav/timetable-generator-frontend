import { Box, Table, TableCell, TableRow } from "@mui/material";
import React from "react";

import { CustomTypography } from "../utils/customComponents";

const Cell = ({ subject }) => {
  if (subject.groupNumber !== 0)
    return (
      <>
        <Box
          sx={{ display: "grid", gridTemplateRows: "1fr 1fr", width: "100%" }}
        >
          <Box
            sx={{
              width: "100%",
              padding: "2px 10px",
              borderBottom: "2px solid #000",
            }}
          >
            <CustomTypography>
              {subject.groupNumber === 1 ? subject.subjectCode : ""}
            </CustomTypography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CustomTypography sx={{ fontSize: "10px" }}>
                {subject.groupNumber === 1 ? `G${subject.groupNumber}` : ""}
              </CustomTypography>
              <CustomTypography sx={{ fontSize: "10px" }}>
                {subject.groupNumber === 1 ? `${subject.room}` : ""}
              </CustomTypography>
              <CustomTypography sx={{ fontSize: "10px" }}>
                {subject.groupNumber === 1 ? subject.professorNickName : ""}
              </CustomTypography>
            </Box>
          </Box>

          <Box sx={{ width: "100%", padding: "2px 10px" }}>
            <CustomTypography>
              {subject.groupNumber === 2 ? subject.subjectCode : ""}
            </CustomTypography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CustomTypography sx={{ fontSize: "10px" }}>
                {subject.groupNumber === 2 ? `G${subject.groupNumber}` : ""}
              </CustomTypography>
              <CustomTypography sx={{ fontSize: "10px" }}>
                {subject.groupNumber === 2 ? `${subject.room}` : ""}
              </CustomTypography>
              <CustomTypography sx={{ fontSize: "10px" }}>
                {subject.groupNumber === 2 ? subject.professorNickName : ""}
              </CustomTypography>
            </Box>
          </Box>
        </Box>
      </>
    );
  else
    return (
      <>
        <Box
          sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <CustomTypography sx={{ fontSize: "10px" }}>
            {subject.room !== 0 ? `${subject.room}` : ""}
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
