import { Table, TableBody, TableHead, TableRow } from "@mui/material";

import AddEditDialog from "./AddEditDialog";
import ConfirmDelete from "./ConfirmDelete";
import { CustomCell, CellInsideWrapper } from "../utils/customComponents";

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
                      <CellInsideWrapper sx={{ fontWeight: "700" }}>
                        {instance}
                      </CellInsideWrapper>
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
                    <CellInsideWrapper sx={{ fontWeight: "700" }}>
                      {instance}
                    </CellInsideWrapper>
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
                          {typeof obj[instance] !== "object" ? (
                            obj[instance]
                          ) : instance === "teacher" ? (
                            <>
                              {obj[instance].name}
                              <br />({obj[instance].nick_name})
                            </>
                          ) : (
                            ``
                          )}
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
