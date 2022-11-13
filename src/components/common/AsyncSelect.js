import React from "react";

import Axios from "../Api";
import { CustomMenuItem, CustomTextField } from "../utils/customComponents";

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
        <CustomTextField
          select
          id={obj.id}
          name={obj.id}
          onChange={(e) => {
            handleOnChange(e, obj.key, obj);
          }}
          value={data[obj.id]}
        >
          {options.map((option) => (
            <CustomMenuItem key={option.key} value={option.key}>
              {option.value}
            </CustomMenuItem>
          ))}
        </CustomTextField>
      )}
    </>
  );
};

export default AsyncSelect;
