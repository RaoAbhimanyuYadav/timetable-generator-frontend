import React, { useRef } from "react";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ReactToPrint from "react-to-print";

import Cell from "./Cell";

const CustomCell = styled(TableCell)(({ theme }) => ({
  padding: "5px 10px",
  border: "2px solid #000",
}));

const CellInsideWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
}));

const TimeTable = ({ year, index, timeTable }) => {
  const componentRef = useRef();

  return (
    <Box sx={{ padding: "40px 40px" }}>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "flex-end",
          marginTop: "40px",
        }}
      >
        <ReactToPrint
          trigger={() => (
            <Button sx={{ textTransform: "none", fontSize: "14px" }}>
              Print Sem {year.semester}!
            </Button>
          )}
          content={() => componentRef.current}
        />
      </Box>
      <Box ref={componentRef}>
        <h1 style={{ textAlign: "center" }}>
          Semester: {year.semester} & Room : {year.roomNumber}
        </h1>

        <Table>
          <TableHead>
            <TableRow>
              <CustomCell>
                <CellInsideWrapper>From</CellInsideWrapper>
              </CustomCell>
              {timeTable.length > 0 &&
                timeTable.map((day, i) => {
                  if (i === 0)
                    return day.timeSlots.map((slot, i) => {
                      return (
                        <CustomCell key={i}>
                          <CellInsideWrapper>{slot.time}</CellInsideWrapper>
                        </CustomCell>
                      );
                    });
                  return "";
                })}
            </TableRow>
            <TableRow>
              <CustomCell>
                <CellInsideWrapper>To</CellInsideWrapper>
              </CustomCell>
              {timeTable.length > 0 &&
                timeTable.map((day, i) => {
                  if (i === 0)
                    return day.timeSlots.map((slot, i) => {
                      return (
                        <CustomCell key={i}>
                          <CellInsideWrapper>{slot.timeTo}</CellInsideWrapper>
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
                    <CellInsideWrapper> {day.day}</CellInsideWrapper>
                  </CustomCell>
                  {day.timeSlots.map((timeSlot, i) => {
                    return (
                      <CustomCell key={i}>
                        <CellInsideWrapper>
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
