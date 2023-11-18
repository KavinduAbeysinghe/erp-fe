import { Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useState } from "react";
import ActionButton from "../buttons/ActionButton";

interface DenseTableProps {
  tableData: Array<any>;
  tableHeaders: Array<string>;
  paginate?: boolean;
  actionButtons?: Array<any>;
  id?: any;
}

export default function DenseTable({
  tableData,
  tableHeaders,
  paginate,
  actionButtons,
  id,
}: DenseTableProps) {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const paginatedData = tableData.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableHeaders?.map((header: string, index) => (
              <TableCell key={index} align={"left"}>
                {header}
              </TableCell>
            ))}
            {actionButtons?.length && <TableCell align={"right"}></TableCell>}
          </TableRow>
        </TableHead>
        {tableData?.length ? (
          <TableBody>
            {tableData?.map((row: any, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.entries(row)?.map(([key, value], index2) => (
                  <React.Fragment key={index2}>
                    {key !== id && (
                      <TableCell align="left">{<>{value}</>}</TableCell>
                    )}
                  </React.Fragment>
                ))}
                {actionButtons?.length ? (
                  <TableCell align="right">
                    {actionButtons?.map((b, index) => (
                      <ActionButton
                        key={index}
                        tooltip={b.tooltip}
                        icon={b.icon}
                        handleClick={() => {
                          return b.handleClick(row[id ? id : ""]);
                        }}
                      />
                    ))}
                  </TableCell>
                ) : (
                  <></>
                )}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={tableHeaders.length + 1}>
                No Data Found
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      {paginate && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          {tableData?.length ? (
            <Pagination
              count={Math.ceil(tableData.length / rowsPerPage)}
              color="primary"
              onChange={handleChangePage}
              page={page}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </TableContainer>
  );
}
