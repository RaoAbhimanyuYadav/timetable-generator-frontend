import React, { useRef } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import Axios from "../Api";
import Cell from "../common/Cell";
import ReactToPrint from "react-to-print";

class Year {
  constructor({ semester }) {
    this.semester = semester;
    this.subjectCode = null;
    this.teacherNickName = null;
  }
}

class TimeSlot {
  constructor({ time, years }) {
    this.time = time;
    this.years = years.map((year) => {
      return new Year({
        semester: year.semester,
      });
    });
  }
}
class Day {
  constructor({ day, time, years }) {
    this.day = day;
    this.timeSlots = time.map((timeSlot) => {
      return new TimeSlot({ time: timeSlot, years });
    });
  }
  addSubject(subject) {
    for (let j = 0; j < this.timeSlots.length; j++) {
      const timeSlot = this.timeSlots[j];

      let yearIndex = timeSlot.years.findIndex(
        (year) => year.semester === subject.semester
      );
      if (timeSlot.years[yearIndex].subjectCode !== null) continue;

      let teacherIndex = timeSlot.years.findIndex(
        (year) => year.teacherNickName === subject.teacherNickName
      );
      if (teacherIndex !== -1) continue;

      timeSlot.years[yearIndex].subjectCode = subject.subjectCode;
      timeSlot.years[yearIndex].teacherNickName = subject.teacherNickName;
      subject.totalLectures--;
      return true;
    }
    return false;
  }
}

class Subject {
  constructor(subject) {
    this.subjectCode = subject.code;
    this.teacherNickName = subject.teacher.nick_name;
    this.semester = subject.year.semester;
    this.totalLectures = subject.lecture_in_a_week;
  }
}

const GenerateTimeTable = () => {
  const [timeTable, setTimeTable] = React.useState([]);

  const dataCreator = async () => {
    let subjectData = await Axios.get("subject/").then((resp) => {
      return resp.data;
    });
    let timingData = await Axios.get("timing/").then((resp) => {
      return resp.data;
    });
    let yearData = await Axios.get("year/").then((resp) => {
      return resp.data;
    });

    let subjectsArray = subjectData.map((obj) => {
      return new Subject(obj);
    });

    let daysAvailable = timingData
      .map((x) => x.day)
      .filter((x, i, arr) => arr.findIndex((item) => item === x) === i);

    let timingAvailable = timingData
      .map((x) => x.time_from)
      .filter((x, i, arr) => arr.findIndex((item) => item === x) === i);

    // console.log(daysAvailable, timingAvailable);

    let timeTableArray = daysAvailable.map((day) => {
      return new Day({
        day: day,
        time: timingAvailable,
        years: yearData,
      });
    });

    for (let k = 0; k < subjectsArray.length; k++) {
      const subject = subjectsArray[k];
      // console.log(subject);

      while (subject.totalLectures > 0) {
        // console.log(subject.totalLectures);
        for (let i = 0; i < timeTableArray.length; i++) {
          const day = timeTableArray[i];
          // console.log(day);
          if (subject.totalLectures <= 0) break;

          day.addSubject(subject);
        }
      }
    }
    console.log(timeTableArray);
    setTimeTable(timeTableArray);
  };

  React.useEffect(() => {
    dataCreator();
  }, []);
  const componentRef = useRef();
  return (
    <>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>
        <h1 style={{ textAlign: "center" }}>table</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {timeTable.length > 0 &&
                timeTable.map((day, i) => {
                  if (i === 0)
                    return day.timeSlots.map((slot, i) => {
                      return <TableCell key={i}>{slot.time}</TableCell>;
                    });
                  return "";
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeTable.map((day) => {
              return (
                <TableRow key={day.day}>
                  <TableCell>{day.day}</TableCell>
                  {day.timeSlots.map((timeSlot, i) => {
                    return (
                      <TableCell key={i}>
                        <Grid container>
                          {timeSlot.years.map((year, i) => {
                            return <Cell key={i} subject={year} />;
                          })}
                        </Grid>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default GenerateTimeTable;
