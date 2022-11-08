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
  constructor({ year, isLunch }) {
    this.semester = year.semester;
    this.subjectCode = isLunch ? "LUNCH" : null;
    this.teacherNickName = isLunch ? "" : null;
    this.roomNumber = year.room;
  }
}

class TimeSlot {
  constructor({ isLunch, time, years }) {
    this.isLunch = isLunch;
    this.time = time;
    this.years = years.map((year) => {
      return new Year({
        year: year,
        isLunch: this.isLunch,
      });
    });
  }
}
class Day {
  constructor({ day, years }) {
    this.day = day.day;
    this.startTime = this.intoMinutes(day.start_time);
    this.endTime = this.intoMinutes(day.end_time);
    this.lunchTimeStart = this.intoMinutes(day.skip_start_time);
    this.lunchTimeEnd = this.intoMinutes(day.skip_end_time);
    this.oneSlotTime = this.intoMinutes(day.one_slot_interval);
    this.totalSlots = this.calculateSlots();
    this.timeSlots = Array(this.totalSlots)
      .fill(0)
      .map((time, index) => {
        return new TimeSlot({
          isLunch: this.isLunch(index),
          time: this.calculateSlotTime(index),
          years: years,
        });
      });
  }

  isContinousAvailable(index, totalReq, subject) {
    let count = 0;
    for (let i = index; i < this.timeSlots.length; i++) {
      const timeSlot = this.timeSlots[i];

      if (timeSlot.isLunch) return false;

      let yearIndex = timeSlot.years.findIndex(
        (year) => year.semester === subject.semester
      );
      if (timeSlot.years[yearIndex].subjectCode !== null) return false;

      let teacherIndex = timeSlot.years.findIndex(
        (year) => year.teacherNickName === subject.teacherNickName
      );
      if (teacherIndex !== -1) return false;

      count++;
      if (count === totalReq) return true;
    }
    return false;
  }

  intoMinutes(time) {
    return Number(time.substr(0, 2)) * 60 + Number(time.substr(3, 2));
  }

  isLunch(index) {
    let timeStart = this.startTime + index * this.oneSlotTime;
    if (this.lunchTimeStart <= timeStart && timeStart < this.lunchTimeEnd) {
      return true;
    }
    return false;
  }

  calculateSlotTime(index) {
    let timeStart = this.startTime + index * this.oneSlotTime;
    let x = timeStart > 60 * 12 ? "PM" : "AM";
    timeStart = timeStart % (60 * 12);
    if (timeStart === 0) {
      timeStart = 60 * 12;
      x = "PM";
    }
    let pre = timeStart / 60 < 10 ? "0" : "";
    let post = timeStart % 60 < 10 ? "0" : "";
    return `${pre}${Math.floor(timeStart / 60)}:${timeStart % 60}${post} ${x}`;
  }

  calculateSlots() {
    return Math.floor((this.endTime - this.startTime) / this.oneSlotTime);
  }

  addSubject(subject) {
    for (let j = 0; j < this.timeSlots.length; j++) {
      const timeSlot = this.timeSlots[j];
      if (timeSlot.isLunch) continue;

      let yearIndex = timeSlot.years.findIndex(
        (year) => year.semester === subject.semester
      );
      if (timeSlot.years[yearIndex].subjectCode !== null) continue;

      let teacherIndex = timeSlot.years.findIndex(
        (year) => year.teacherNickName === subject.teacherNickName
      );
      if (teacherIndex !== -1) continue;

      if (subject.slotRequired > 1) {
        if (this.isContinousAvailable(j, subject.slotRequired, subject)) {
          for (let k = j; k < subject.slotRequired + j; k++) {
            const slot = this.timeSlots[k];
            let yearInd = slot.years.findIndex(
              (year) => year.semester === subject.semester
            );
            slot.years[yearInd].subjectCode = subject.subjectCode;
            slot.years[yearInd].teacherNickName = subject.teacherNickName;
          }
        } else {
          continue;
        }
      } else {
        timeSlot.years[yearIndex].subjectCode = subject.subjectCode;
        timeSlot.years[yearIndex].teacherNickName = subject.teacherNickName;
      }
      subject.totalLectures--;
      return true;
    }
    return false;
  }
}

class Subject {
  constructor(subject) {
    this.subjectCode = subject.code;
    this.professorNickName = subject.teacher.nick_name;
    this.semester = subject.year.semester;
    this.totalLectures = subject.lecture_in_a_week;
    this.slotRequired = subject.slot_required;
    this.subjectName = subject.name;
    this.ProfessorName = subject.teacher.name;
    this.roomNumber = subject.year.room;
  }
}

const GenerateTimeTable = () => {
  const [timeTable, setTimeTable] = React.useState([]);

  const dataCreator = async () => {
    let subjectResponse = await Axios.get("subject/").then((resp) => {
      return resp.data;
    });
    let timingResponse = await Axios.get("timing/").then((resp) => {
      return resp.data;
    });
    let yearResponse = await Axios.get("year/").then((resp) => {
      return resp.data;
    });

    let subjectsArray = subjectResponse.map((obj) => {
      return new Subject(obj);
    });

    subjectsArray.sort((a, b) => {
      if (a.slotRequired === b.slotRequired) {
        return a.totalLectures < b.totalLectures;
      }
      return a.slotRequired < b.slotRequired;
    });

    let timeTableArray = timingResponse.map((day) => {
      return new Day({ day: day, years: yearResponse });
    });

    for (let k = 0; k < subjectsArray.length; k++) {
      const subject = subjectsArray[k];
      let count = 0;
      while (subject.totalLectures > 0) {
        if (count >= 10) {
          console.log("Conflict");
          break;
        }
        for (let i = 0; i < timeTableArray.length; i++) {
          const day = timeTableArray[i];
          // console.log(day);
          if (subject.totalLectures <= 0) break;

          day.addSubject(subject);
        }
        count++;
      }
    }
    console.log(timeTableArray);
    setTimeTable(timeTableArray);
  };

  const componentRef = useRef();

  React.useEffect(() => {
    dataCreator();
  }, []);

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
