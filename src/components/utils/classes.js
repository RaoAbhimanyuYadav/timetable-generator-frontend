import Axios from "../Api";

export class Year {
  constructor({ year, isLunch }) {
    this.semester = year.semester;
    this.subjectCode = isLunch ? "LUNCH" : null;
    this.professorNickName = isLunch ? "" : null;
    this.roomNumber = year.room;
    this.totalGroups = year.total_groups ? year.total_groups : 0;
    this.groupNumber = 0;
  }
}

export class TimeSlot {
  constructor({ isLunch, time, timeTo, years }) {
    this.isLunch = isLunch;
    this.time = time;
    this.timeTo = timeTo;
    this.years = years.map((year) => {
      return new Year({
        year: year,
        isLunch: this.isLunch,
      });
    });
  }
}
export class Day {
  constructor({ day, years, optimalSlots }) {
    this.day = day.day;
    this.startTime = this.intoMinutes(day.start_time);
    this.endTime = this.intoMinutes(day.end_time);
    this.lunchTimeStart = this.intoMinutes(day.skip_start_time);
    this.lunchTimeEnd = this.intoMinutes(day.skip_end_time);
    this.oneSlotTime = this.intoMinutes(day.one_slot_interval);
    this.totalSlots = this.calculateSlots();
    this.labInfo = this.createObject(years);
    this.optimalSlots = { ...optimalSlots };
    this.subjectAdded = [];
    this.timeSlots = Array(this.totalSlots)
      .fill(0)
      .map((time, index) => {
        return new TimeSlot({
          isLunch: this.isLunch(index),
          time: this.calculateSlotTime(index),
          timeTo: this.calculateSlotTime(index + 1),
          years: years,
        });
      });
  }

  createObject(years) {
    let obj = {};
    years.forEach((year) => {
      obj[year.semester] = false;
    });
    return obj;
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
        (year) => year.professorNickName === subject.professorNickName
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

  addSubject(subject, count) {
    let timeSlotIndex = 0;
    if (count < 5) {
      timeSlotIndex = subject.timeSlotAllotedIndex || 0;
    }

    for (let j = timeSlotIndex; j < this.timeSlots.length; j++) {
      if (count < 2 && this.optimalSlots[subject.semester] <= 0) {
        break;
      }

      if (
        count < 4 &&
        j !== timeSlotIndex &&
        subject.timeSlotAllotedIndex !== null
      ) {
        break;
      }

      if (
        count < 6 &&
        this.subjectAdded.find((x) => x === subject.subjectCode)
      ) {
        break;
      }

      const timeSlot = this.timeSlots[j];
      if (timeSlot.isLunch) continue;

      let yearIndex = timeSlot.years.findIndex(
        (year) => year.semester === subject.semester
      );
      if (timeSlot.years[yearIndex].subjectCode !== null) continue;

      let teacherIndex = timeSlot.years.findIndex(
        (year) => year.professorNickName === subject.professorNickName
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
            slot.years[yearInd].professorNickName = subject.professorNickName;

            slot.years[yearInd].groupNumber =
              subject.fullClassLecture <= 0
                ? ((subject.fullClassLecture * -1) %
                    slot.years[yearInd].totalGroups) +
                  1
                : 0;

            this.optimalSlots[subject.semester]--;
          }
          this.labInfo[subject.semester] = true;
        } else {
          continue;
        }
      } else {
        timeSlot.years[yearIndex].subjectCode = subject.subjectCode;
        timeSlot.years[yearIndex].professorNickName = subject.professorNickName;
        timeSlot.years[yearIndex].groupNumber =
          subject.fullClassLecture <= 0
            ? ((subject.fullClassLecture * -1) %
                timeSlot.years[yearIndex].totalGroups) +
              1
            : 0;
        this.optimalSlots[subject.semester]--;
      }
      // console.log(subject.subjectCode);
      this.subjectAdded.push(subject.subjectCode);
      subject.timeSlotAllotedIndex = j;
      subject.totalLectures--;
      subject.fullClassLecture--;
      return true;
    }
    return false;
  }
}

export function calculateTotalLectures(subject) {
  let num =
    subject.whole_lecture_in_a_week +
    subject.group_lecture_in_a_week * subject.year.total_groups;
  return num;
}

export class Subject {
  constructor(subject) {
    this.subjectCode = subject.code;
    this.professorNickName = subject.teacher.nick_name;
    this.semester = subject.year.semester;
    this.totalLectures = calculateTotalLectures(subject);
    this.slotRequired = subject.slot_required;
    this.subjectName = subject.name;
    this.ProfessorName = subject.teacher.name;
    this.roomNumber = subject.year.room;
    this.timeSlotAllotedIndex = null;
    this.fullClassLecture = subject.whole_lecture_in_a_week;
  }
}

export const dataCreator = async (setTimeTable, setYear) => {
  let subjectResponse = await Axios.get("subject/").then((resp) => {
    return resp.data;
  });
  let timingResponse = await Axios.get("timing/").then((resp) => {
    return resp.data;
  });
  let yearResponse = await Axios.get("year/").then((resp) => {
    return resp.data;
  });

  let yearArray = yearResponse.map((year) => {
    return new Year({ year, isLunch: false });
  });
  setYear(yearArray);

  let totalDays = timingResponse.length;
  let optimalSlotsRequired = {};
  yearResponse.forEach((year) => {
    let sem = year.semester;
    let cnt = 0;
    subjectResponse.forEach((sub) => {
      if (sub.year.semester === sem) {
        cnt += calculateTotalLectures(sub) * +sub.slot_required;
      }
    });
    cnt = Math.floor(cnt / totalDays) + 2;
    optimalSlotsRequired[sem] = cnt - 1;
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
    return new Day({
      day: day,
      years: yearResponse,
      optimalSlots: optimalSlotsRequired,
    });
  });

  for (let k = 0; k < subjectsArray.length; k++) {
    const subject = subjectsArray[k];
    let count = 0;
    while (subject.totalLectures > 0) {
      if (count >= 10) {
        console.log("Conflict", subject.subjectCode);
        break;
      }
      for (let i = 0; i < timeTableArray.length; i++) {
        const day = timeTableArray[i];
        if (subject.totalLectures <= 0) break;
        if (day.labInfo[subject.semester] && subject.slotRequired > 1) continue;
        day.addSubject(subject, count);
      }
      count++;
    }
  }

  setTimeTable(timeTableArray);
};
