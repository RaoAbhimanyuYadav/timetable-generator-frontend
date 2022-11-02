export const bodyDataKey = ["day", "time_from", "time_to"];
export const URL = "timing/";
export const headData = ["Day", "From", "To"];
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
    label: "From",
    type: "time",
    key: "time_from",
    default: "00:00",
  },
  {
    label: "To",
    type: "time",
    key: "time_to",
    default: "00:00",
  },
];
