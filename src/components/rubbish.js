// console.log(arr1, arr2);

// let days = timings
//   .map((x) => x.day)
//   .filter((x, i, arr) => arr.findIndex((item) => item === x) === i);

// let time_froms = timings
//   .map((x) => x.time_from)
//   .filter((x, i, arr) => arr.findIndex((item) => item === x) === i);
// console.log(time_froms);
// console.log(days);
// let timeTableArray = time_froms.map((time) => {
//   timeObj["time"] = time;
//   timeObj["days"] = days.map((day) => {
//     let dayObj = {};
//     dayObj["day"] = day;
//     dayObj["years"] = years.map((year) => {
//       let yearObj = {};
//       yearObj["year"] = year.semester;
//       yearObj["id"] = year.id;
//       yearObj["subject"] = "";
//       yearObj["teacher"] = "";
//       yearObj["totalCount"] = 0;
//       return yearObj;
//     });
//     return dayObj;
//   });
//   return timeObj;
// });
// console.log(timeTableArray);
// subjects.forEach((subject) => {
//   timeTableArray.forEach((time) => {
//     time.days.forEach((day) => {
//       let obj = day.years.filter((year) => year.id === subject.year_id);
//     });
//   });
// });

//  let yearIndex = this.years.findIndex(
//    (year) => year.semester === subject.semester
//  );
//  if (this.years[yearIndex].subjectCode !== null) return false;

//  let teacherIndex = this.years.findIndex(
//    (year) => year.teacher === subject.teacherNickName
//  );
//  if (teacherIndex !== -1) return false;

//  this.years[yearIndex].subjectCode = subject.subjectCode;
//  this.years[yearIndex].teacherNickName = subject.teacherNickName;

//  subject.totalLectures--;

//  return true;
