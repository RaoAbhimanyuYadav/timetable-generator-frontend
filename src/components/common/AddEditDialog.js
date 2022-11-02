import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, InputLabel, MenuItem, TextField } from "@mui/material";
import AsyncSelect from "./AsyncSelect";

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
      <Button onClick={handleClickOpen("paper")}>
        {formData ? "Edit" : "Add"}
      </Button>
      <Dialog
        maxWidth="xs"
        fullWidth="xs"
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {formData ? "Edit" : "Add"}
        </DialogTitle>
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
                  {obj.type === "AsyncChoices" ? (
                    <>
                      <InputLabel>{obj.label}</InputLabel>
                      <AsyncSelect
                        obj={obj}
                        handleOnChange={handleOnChange}
                        data={data}
                      />
                    </>
                  ) : obj.type === "select" ? (
                    <>
                      <InputLabel>{obj.label}</InputLabel>
                      <TextField
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
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </>
                  ) : (
                    <>
                      <InputLabel>{obj.label}</InputLabel>
                      <TextField
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
                    </>
                  )}
                </Box>
              );
            })}

            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
                  handleClear();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleClose}>
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
