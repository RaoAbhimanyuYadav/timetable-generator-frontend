import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, InputLabel, MenuItem, TextField } from "@mui/material";

export default function AddEditDialog({
  formInfo,
  formData,
  formSubmitHandler,
}) {
  const body = {};
  formInfo.forEach((obj) => {
    body[obj.key] = formData ? formData[obj.key] : obj.default;
  });
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(body);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e, key) => {
    setData((pre) => {
      let newData = { ...pre };
      newData[key] = e.target.value;
      return newData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formSubmitHandler(data);
  };

  return (
    <div>
      <Button onClick={handleClickOpen("paper")}>Edit</Button>
      <Dialog
        maxWidth="xs"
        fullWidth="xs"
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
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
                  {obj.type === "select" ? (
                    <>
                      <InputLabel>{obj.label}</InputLabel>
                      <TextField
                        select
                        autoFocus={index === 0}
                        id={obj.key}
                        name={obj.key}
                        onChange={(e) => {
                          handleOnChange(e, obj.key);
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
                          handleOnChange(e, obj.key);
                        }}
                        value={data[obj.key]}
                      />
                    </>
                  )}
                </Box>
              );
            })}

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
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
