export const bodyDataKey = [
  "day",
  "start_time",
  "end_time",
  "skip_start_time",
  "skip_end_time",
  "one_slot_interval",
];
export const URL = "timing/";
export const headData = [
  "Day",
  "From",
  "To",
  "Lunch Start Time",
  "Lunch End Time",
  "One Time slot",
];
export const formInfo = [
  {
    label: "Day",
    type: "select",
    choices: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
    ],
    key: "day",
    default: "Monday",
  },
  {
    label: "Start Time",
    type: "time",
    key: "start_time",
    default: "08:00:00",
  },
  {
    label: "End Time",
    type: "time",
    key: "end_time",
    default: "18:00:00",
  },
  {
    label: "Lunch Start Time",
    type: "time",
    key: "skip_start_time",
    default: "12:00:00",
  },
  {
    label: "Lunch End Time",
    type: "time",
    key: "skip_end_time",
    default: "14:00:00",
  },
  {
    label: "One Time slot",
    type: "time",
    key: "one_slot_interval",
    default: "01:00:00",
  },
];
