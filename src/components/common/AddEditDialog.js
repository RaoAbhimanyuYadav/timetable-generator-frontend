import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/material";

import AsyncSelect from "./AsyncSelect";
import {
  CustomButton,
  CustomDialogTitle,
  CustomInputLabel,
  CustomMenuItem,
  CustomTextField,
} from "../utils/customComponents";

export default function AddEditDialog({
  formInfo,
  formData,
  formSubmitHandler,
}) {
  const body = {};
  formInfo.forEach((obj) => {
    obj.key === "object"
      ? (body[obj.id] = formData ? formData[obj.objectKey]["id"] : obj.default)
      : (body[obj.key] = formData ? formData[obj.key] : obj.default);
  });

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(body);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClear = () => {
    setData(body);
  };

  const handleOnChange = (e, key, obj) => {
    setData((pre) => {
      let newData = { ...pre };
      if (key === "object") {
        newData[obj.id] = e.target.value;
      } else {
        newData[key] = e.target.value;
      }
      return newData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    formData
      ? formSubmitHandler(data, true, formData.id)
      : formSubmitHandler(data, false);
  };

  return (
    <div>
      <CustomButton onClick={handleClickOpen("paper")}>
        {formData ? "Edit" : "Add"}
      </CustomButton>
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <CustomDialogTitle id="scroll-dialog-title">
          {formData ? "Edit" : "Add"}
        </CustomDialogTitle>
        <DialogContent dividers={true}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {formInfo.map((obj, index) => {
              return (
                <Box key={index}>
                  <CustomInputLabel>{obj.label}</CustomInputLabel>
                  {obj.type === "AsyncChoices" ? (
                    <AsyncSelect
                      obj={obj}
                      handleOnChange={handleOnChange}
                      data={data}
                    />
                  ) : obj.type === "select" ? (
                    <CustomTextField
                      select
                      autoFocus={index === 0}
                      id={obj.key}
                      name={obj.key}
                      onChange={(e) => {
                        handleOnChange(e, obj.key, obj);
                      }}
                      value={data[obj.key]}
                    >
                      {obj.choices.map((option) => (
                        <CustomMenuItem key={option} value={option}>
                          {option}
                        </CustomMenuItem>
                      ))}
                    </CustomTextField>
                  ) : (
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth
                      type={obj.type}
                      id={obj.key}
                      name={obj.key}
                      autoFocus={index === 0}
                      onChange={(e) => {
                        handleOnChange(e, obj.key, obj);
                      }}
                      value={data[obj.key]}
                    />
                  )}
                </Box>
              );
            })}

            <DialogActions>
              <CustomButton
                onClick={() => {
                  handleClose();
                  handleClear();
                }}
              >
                Cancel
              </CustomButton>
              <CustomButton type="submit" onClick={handleClose}>
                Submit
              </CustomButton>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
