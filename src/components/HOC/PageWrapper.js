import { Box, Typography } from "@mui/material";
import React from "react";
import AddEditDialog from "../common/AddEditDialog";
import TableLayout from "../common/TableLayout";

const PageWrapper = ({
  title,
  formInfo,
  formSubmitHandler,
  data,
  headData,
  bodyDataKey,
  deleteHandler,
}) => {
  return (
    <Box sx={{ padding: "clamp(12px, 4vw, 48px)", overflowX: "scroll" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 10px",
        }}
      >
        <Typography
          sx={{
            fontSize: "clamp(10px,2vw,24px)",
            fontWeight: "800",
            fontFamily: "monospace",
            letterSpacing: "0.1rem",
            color: "#000",
          }}
        >
          {title}
        </Typography>
        <AddEditDialog
          formInfo={formInfo}
          formSubmitHandler={formSubmitHandler}
        />
      </Box>
      <TableLayout
        data={data}
        headData={headData}
        bodyDataKey={bodyDataKey}
        deleteHandler={deleteHandler}
        formInfo={formInfo}
        formSubmitHandler={formSubmitHandler}
      />
    </Box>
  );
};

export default PageWrapper;
