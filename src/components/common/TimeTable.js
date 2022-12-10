import React, { useRef } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import ReactToPrint from "react-to-print";

import Cell from "./Cell";
import {
  CustomCell,
  CellInsideWrapper,
  CustomTypography,
  CustomButton,
} from "../utils/customComponents";
import { TEACHER_COLOR } from "../constants/TeacherColor";

const TimeTable = ({ year, index, timeTable }) => {
  const componentRef = useRef();

  return (
    <Box sx={{ padding: "40px 40px", overflowX: "scroll" }}>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "flex-end",
          marginTop: "48px",
        }}
      >
        <ReactToPrint
          trigger={() => (
            <CustomButton>Print Sem {year.semester}!</CustomButton>
          )}
          content={() => componentRef.current}
        />
      </Box>
      <Box ref={componentRef}>
        <CustomTypography
          sx={{
            fontSize: "clamp(16px,2vw,24px)",
            marginBottom: "24px",
            fontWeight: "700",
          }}
        >
          Semester: {year.semester} & Room : {year.roomNumber}
        </CustomTypography>

        <Table>
          <TableHead>
            <TableRow>
              <CustomCell>
                <CellInsideWrapper sx={{ fontWeight: "700" }}>
                  From <br /> To
                </CellInsideWrapper>
              </CustomCell>
              {timeTable.length > 0 &&
                timeTable.map((day, i) => {
                  if (i === 0)
                    return day.timeSlots.map((slot, i) => {
                      return (
                        <CustomCell key={i}>
                          <CellInsideWrapper sx={{ fontWeight: "700" }}>
                            {slot.time} <br /> {slot.timeTo}
                          </CellInsideWrapper>
                        </CustomCell>
                      );
                    });
                  return "";
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeTable.map((day) => {
              return (
                <TableRow key={day.day}>
                  <CustomCell>
                    <CellInsideWrapper sx={{ fontWeight: "700" }}>
                      {day.day}
                    </CellInsideWrapper>
                  </CustomCell>
                  {day.timeSlots.map((timeSlot, i) => {
                    return (
                      <CustomCell key={i}>
                        <CellInsideWrapper
                          sx={{
                            margin: "-10px",
                          }}
                        >
                          {timeSlot.years.map((year, i) => {
                            if (year.isGrouping) {
                              year.isGroupWiseLecture++;
                            }
                            if (i === index)
                              return <Cell key={i} subject={year} />;
                            else return "";
                          })}
                        </CellInsideWrapper>
                      </CustomCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default TimeTable;
