export const bodyDataKey = [
  "name",
  "code",
  "whole_lecture_in_a_week",
  "slot_required",
  "teacher",
  "year",
  "group_lecture_in_a_week",
];

export const URL = "subject/";
export const headData = [
  "Name",
  "Subject Code",
  "Total Lectures in a week",
  "Slot Required",
  "Teacher",
  "Semester, Room",
  "Groups Lectures in a week",
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
    label: "Total Lectures in a week",
    type: "number",
    key: "whole_lecture_in_a_week",
    default: 1,
  },
  {
    label: "Slot Required",
    type: "number",
    key: "slot_required",
    default: 1,
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
  {
    label: "Group Lectures in a week",
    type: "number",
    key: "group_lecture_in_a_week",
    default: 0,
  },
];
