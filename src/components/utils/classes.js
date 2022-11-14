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

  // create a object to store that is there any lab alloted on that day
  createObject(years) {
    let obj = {};
    years.forEach((year) => {
      obj[year.semester] = false;
    });
    return obj;
  }

  // function to check that contionus slot is available for lab
  isContinousAvailable(index, totalReq, subject) {
    let count = 0;
    // loop from that day to totalDays required
    for (let i = index; i < this.timeSlots.length; i++) {
      const timeSlot = this.timeSlots[i];

      // if there is a lunch
      if (timeSlot.isLunch) return false;

      // to find the index of that year in Years Array
      let yearIndex = timeSlot.years.findIndex(
        (year) => year.semester === subject.semester
      );
      // if already subject is alloted on that slot
      if (timeSlot.years[yearIndex].subjectCode !== null) return false;

      // fint teacher index on that time for every year
      let teacherIndex = timeSlot.years.findIndex(
        (year) => year.professorNickName === subject.professorNickName
      );
      // if index is not -1 implies that teacher is taking a class
      if (teacherIndex !== -1) return false;

      count++;
      // required slot are found
      if (count === totalReq) return true;
    }
    return false;
  }

  // function to convert timeslot into minutes
  intoMinutes(time) {
    return Number(time.substr(0, 2)) * 60 + Number(time.substr(3, 2));
  }

  // function to find that there is lunch
  isLunch(index) {
    let timeStart = this.startTime + index * this.oneSlotTime;
    if (this.lunchTimeStart <= timeStart && timeStart < this.lunchTimeEnd) {
      return true;
    }
    return false;
  }

  // function to convert a time into proper time format to render on timetable
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

  // function to calculate total number of slot for a day
  calculateSlots() {
    return Math.floor((this.endTime - this.startTime) / this.oneSlotTime);
  }

  // funtion to add subject on this day
  addSubject(subject, count) {
    let timeSlotIndex = 0;
    // if subject is already alloted for a time then start from that time
    if (count < 6) {
      timeSlotIndex = subject.timeSlotAllotedIndex || 0;
    }

    // from that timeSlot to last timeslot
    for (let j = timeSlotIndex; j < this.timeSlots.length; j++) {
      // if for that day lectures alloted already greater or equal to optimal count
      if (count < 3 && this.optimalSlots[subject.semester] <= 0) {
        break;
      }

      // if subject is already alloted a time and this time is not that time then go on next day
      if (
        count < 6 &&
        j !== timeSlotIndex &&
        subject.timeSlotAllotedIndex !== null
      ) {
        break;
      }

      // if subject is already alloted on this day then don't allot subject on this day
      if (
        count < 9 &&
        this.subjectAdded.find((x) => x === subject.subjectCode)
      ) {
        break;
      }

      // if there is a lunch
      const timeSlot = this.timeSlots[j];
      if (timeSlot.isLunch) continue;

      // to find the index of that year in Years Array
      let yearIndex = timeSlot.years.findIndex(
        (year) => year.semester === subject.semester
      );
      // if already subject is alloted on that slot
      if (timeSlot.years[yearIndex].subjectCode !== null) continue;

      // fint teacher index on that time for every year
      let teacherIndex = timeSlot.years.findIndex(
        (year) => year.professorNickName === subject.professorNickName
      );
      // if index is not -1 implies that teacher is taking a class
      if (teacherIndex !== -1) continue;

      // if that subject is a lab
      if (subject.slotRequired > 1) {
        // check whether that continous slots are available or not
        if (this.isContinousAvailable(j, subject.slotRequired, subject)) {
          // slots are available so alot from currSlot to currSlot+totalSlotRequired
          for (let k = j; k < subject.slotRequired + j; k++) {
            const slot = this.timeSlots[k];
            // find yearIndex in Year Array
            let yearInd = slot.years.findIndex(
              (year) => year.semester === subject.semester
            );
            // Alot subject code and professor on that time
            slot.years[yearInd].subjectCode = subject.subjectCode;
            slot.years[yearInd].professorNickName = subject.professorNickName;

            // if lecture is to be alloted for a group then decide group Number
            slot.years[yearInd].groupNumber =
              subject.fullClassLecture <= 0
                ? ((subject.fullClassLecture * -1) %
                    slot.years[yearInd].totalGroups) +
                  1
                : 0;

            // reduce optimalSlots for that day
            this.optimalSlots[subject.semester]--;
          }
          // lab is alloted for this day so no other lab will be alloted
          this.labInfo[subject.semester] = true;
        } else {
          continue;
        }
      } else {
        // Subject require only one time slot so alot subject & professor & if for group then group no.
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
      // added that subject to array to maintain that this subject is already alloted on this day
      this.subjectAdded.push(subject.subjectCode);
      // allot this time to that subject so that it can try to assign that subject on that time
      subject.timeSlotAllotedIndex = j;
      // reduce so to stop when total lectures for that is alloted completely
      subject.totalLectures--;
      // reduce so that we can find that this subject should be alloted for group
      subject.fullClassLecture--;
      return true;
    }
    return false;
  }
}

// Funtion to calculate total lectures (Whole Class + Group Based Classes)
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

// Function to Timetable Require two state for setting timtable & year
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

  // To set total Years for creation of different timetable
  let yearArray = yearResponse.map((year) => {
    return new Year({ year, isLunch: false });
  });
  setYear(yearArray);

  // calculation of optimal Slots for deciding how much class to be alloted for a day
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

  // Creation of subject Array
  let subjectsArray = subjectResponse.map((obj) => {
    return new Subject(obj);
  });

  // Optimising subject based of no. of slot required so that Lab can be alloted first
  subjectsArray.sort((a, b) => {
    if (a.slotRequired === b.slotRequired) {
      return a.totalLectures < b.totalLectures;
    }
    return a.slotRequired < b.slotRequired;
  });

  // Creation of Timetable array
  let timeTableArray = timingResponse.map((day) => {
    return new Day({
      day: day,
      years: yearResponse,
      optimalSlots: optimalSlotsRequired,
    });
  });

  // Allotment of subject
  // Looping for each subject
  for (let k = 0; k < subjectsArray.length; k++) {
    const subject = subjectsArray[k];

    // count to store how many time same subject is looping again as for a loop if subject is not passing checks then after some count its restriction get reduced
    let count = 0;
    while (subject.totalLectures > 0) {
      if (count >= 15) {
        console.log("Conflict", subject.subjectCode);
        break;
      }
      // Looping a subject throughout all day
      for (let i = 0; i < timeTableArray.length; i++) {
        const day = timeTableArray[i];
        // if subject has alloted its all period then break
        if (subject.totalLectures <= 0) break;
        // if on this day already lab is alloted then move to next day (avoiding multiple lab on same day)
        // subject.slotRequired ensure that no simple subject is skipped
        if (day.labInfo[subject.semester] && subject.slotRequired > 1) continue;
        // try to allot subject in that day
        day.addSubject(subject, count);
      }
      count++;
    }
  }

  setTimeTable(timeTableArray);
};
