import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import AddEditDialog from "./AddEditDialog";
import ConfirmDelete from "./ConfirmDelete";

const CustomCell = styled(TableCell)(({ theme }) => ({
  padding: "5px 10px",
  border: "1px solid #000",
}));

const CellInsideWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
}));

const TableLayout = ({
  data,
  bodyDataKey,
  headData,
  deleteHandler,
  formInfo,
  formSubmitHandler,
}) => {
  const objNameExtractor = (obj) => {
    let name = "";
    bodyDataKey.forEach((instance) => {
      name += obj[instance] + " ";
    });
    return name;
  };

  return (
    <>
      {data.length === 0 ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                {headData.map((instance, index) => {
                  return (
                    <CustomCell key={index}>
                      <CellInsideWrapper>{instance}</CellInsideWrapper>
                    </CustomCell>
                  );
                })}
                <CustomCell></CustomCell>
                <CustomCell></CustomCell>
              </TableRow>
            </TableHead>
          </Table>
        </>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              {headData.map((instance, index) => {
                return (
                  <CustomCell key={index}>
                    <CellInsideWrapper>{instance}</CellInsideWrapper>
                  </CustomCell>
                );
              })}
              <CustomCell></CustomCell>
              <CustomCell></CustomCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((obj) => {
              return (
                <TableRow key={obj.id}>
                  {bodyDataKey.map((instance, index) => {
                    return (
                      <CustomCell key={index}>
                        <CellInsideWrapper>
                          {typeof obj[instance] !== "object"
                            ? obj[instance]
                            : instance === "teacher"
                            ? `${obj[instance].name}(${obj[instance].nick_name})`
                            : `${obj[instance].semester}, ${obj[instance].room}`}
                        </CellInsideWrapper>
                      </CustomCell>
                    );
                  })}
                  <CustomCell>
                    <CellInsideWrapper>
                      <AddEditDialog
                        formInfo={formInfo}
                        formSubmitHandler={formSubmitHandler}
                        formData={obj}
                      />
                    </CellInsideWrapper>
                  </CustomCell>
                  <CustomCell>
                    <CellInsideWrapper>
                      <ConfirmDelete
                        objName={objNameExtractor(obj)}
                        id={obj.id}
                        deleteHandler={deleteHandler}
                      />
                    </CellInsideWrapper>
                  </CustomCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default TableLayout;
