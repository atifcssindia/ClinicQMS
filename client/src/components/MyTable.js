import React from "react";
import { useTable } from "react-table";

const MyTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ borderSpacing: "0", width: "100%" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            className="border-b-2 border-gray-200"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <th
                className=" text-left py-3.5 px-5 text-gray-800 text-[14px] xl:text-[15px] font-semibold "
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              className=" odd:border-b even:border-b border-gray-100"
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => (
                <td
                  className=" text-left py-3.5 px-5 text-[14px] xl:text-[15px] font-medium text-gray-700 "
                  {...cell.getCellProps()}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MyTable;
