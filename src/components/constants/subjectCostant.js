export const bodyDataKey = [
  "name",
  "code",
  "lecture_in_a_week",
  "teacher",
  "year",
];

export const URL = "subject/";
export const headData = [
  "Name",
  "Subject Code",
  "Lectures in a week",
  "Teacher",
  "Semester, Room Number",
];
export const formInfo = [
  {
    label: "Name",
    type: "text",
    key: "name",
    default: "",
  },
  {
    label: "Subject Code",
    type: "text",
    key: "code",
    default: "",
  },
  {
    label: "Lectures in a week",
    type: "number",
    key: "lecture_in_a_week",
    default: "0",
  },
  {
    label: "Professor",
    type: "AsyncChoices",
    key: "object",
    objectKey: "teacher",
    id: "teacher_id",
    value: "name",
    URL: "professor/",
    default: "",
  },
  {
    label: "Semester",
    type: "AsyncChoices",
    key: "object",
    objectKey: "year",
    id: "year_id",
    value: "semester",
    URL: "year/",
    default: "",
  },
];
