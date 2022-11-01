import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import AddEditDialog from "./AddEditDialog";

import ConfirmDelete from "./ConfirmDelete";

const TableLayout = ({
  data,
  bodyDataKey,
  headData,
  deleteHandler,
  formInfo,
  formSubmitHandler,
}) => {
  console.log(data);

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
                  return <TableCell key={index}>{instance}</TableCell>;
                })}
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              {headData.map((instance, index) => {
                return <TableCell key={index}>{instance}</TableCell>;
              })}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((obj) => {
              return (
                <TableRow key={obj.id}>
                  {bodyDataKey.map((instance, index) => {
                    return <TableCell key={index}>{obj[instance]}</TableCell>;
                  })}
                  <TableCell>
                    <AddEditDialog
                      formInfo={formInfo}
                      formSubmitHandler={formSubmitHandler}
                      formData={obj}
                    />
                  </TableCell>
                  <TableCell>
                    <ConfirmDelete
                      objName={objNameExtractor(obj)}
                      id={obj.id}
                      deleteHandler={deleteHandler}
                    />
                  </TableCell>
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
