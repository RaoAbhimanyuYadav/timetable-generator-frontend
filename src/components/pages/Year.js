import React, { useEffect, useState } from "react";

import Axios from "../Api";

import {
  bodyDataKey,
  URL,
  formInfo,
  headData,
} from "../constants/yearContants";
import PageWrapper from "../HOC/PageWrapper";

const getData = (setData) => {
  Axios.get(URL)
    .then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    })
    .catch((err) => console.log(err));
};

const Year = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(setData);
  }, []);

  const deleteHandler = (id) => {
    const body = { id: id };
    Axios.delete(URL, { data: body })
      .then((res) => {
        if (res.status === 200) {
          getData(setData);
        }
      })
      .catch((err) => console.log(err));
  };

  const formSubmitHandler = (data, isEdited, id) => {
    isEdited
      ? Axios.put(URL, { ...data, id: id })
          .then((response) => {
            if (response.status === 200) {
              getData(setData);
            }
          })
          .catch((err) => console.log(err.response.data.detail))
      : Axios.post(URL, data)
          .then((response) => {
            if (response.status === 200) {
              getData(setData);
            }
          })
          .catch((err) => console.log(err.response.data.detail));
  };

  return (
    <PageWrapper
      title={"Year"}
      formInfo={formInfo}
      formSubmitHandler={formSubmitHandler}
      data={data}
      headData={headData}
      bodyDataKey={bodyDataKey}
      deleteHandler={deleteHandler}
    />
  );
};

export default Year;
