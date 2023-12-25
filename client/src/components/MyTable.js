import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { Pagination, PaginationItem } from "@mui/material";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const MyTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
    gotoPage, // Add gotoPage function
    prepareRow,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()} style={{ borderSpacing: "0", width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b-2 border-gray-200"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  className="text-left py-3.5 px-5 text-gray-800 text-[14px] xl:text-[15px] font-semibold cursor-pointer"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted && (
                    <span>
                      {column.isSortedDesc ? (
                        <span>&darr;</span>
                      ) : (
                        <span>&uarr;</span>
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                className="odd:border-b even:border-b border-gray-100"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td
                    key={cell.row.id + cell.column.id}
                    className="text-left py-3.5 px-5 text-[14px] xl:text-[15px] font-medium text-gray-700"
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

      {/* React-table Pagination */}
      <div className="flex justify-center  py-5">
        <Pagination
          count={pageOptions.length}
          page={pageIndex + 1}
          onChange={(event, page) => {
            gotoPage(page - 1); // Subtract 1 to convert to 0-based indexing
          }}
          renderItem={(item) => (
            <PaginationItem
              component="button"
              onClick={() => item.onClick()}
              {...item}
              icon={
                item.type === "previous" ? (
                  <IoIosArrowRoundBack />
                ) : (
                  <IoIosArrowRoundForward />
                )
              }
            />
          )}
        />
      </div>
    </div>
  );
};

export default MyTable;
