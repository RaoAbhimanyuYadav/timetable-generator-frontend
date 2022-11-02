import { MenuItem, TextField } from "@mui/material";
import React from "react";

import Axios from "../Api";

const getData = (setData, obj, setLoading) => {
  Axios.get(obj.URL)
    .then((res) => {
      if (res.status === 200) {
        let arr = [{ key: "", value: "" }];
        res.data.forEach((element) => {
          arr.push({ key: element.id, value: element[obj.value] });
          setData(arr);
        });
        setLoading(false);
      }
    })
    .catch((err) => console.log(err));
};
const AsyncSelect = ({ obj, data, handleOnChange }) => {
  const [options, setOptions] = React.useState([{ key: "", value: "" }]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getData(setOptions, obj, setLoading);
  }, [obj]);

  return (
    <>
      {loading ? (
        "Loading...."
      ) : (
        <TextField
          select
          id={obj.id}
          name={obj.id}
          onChange={(e) => {
            handleOnChange(e, obj.key, obj);
          }}
          value={data[obj.id]}
        >
          {options.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      )}
    </>
  );
};

export default AsyncSelect;
