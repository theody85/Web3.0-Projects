import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const data = [
  {
    id: 122123,
    age: 316,
    transaction: 22,
    feeRecipient: "eth-builder",
    gasUsed: 1,
    gasLimit: 1,
    baseFee: 1,
    reward: 1,
    burtFees: 1,
  },
];

const columns = [
  {
    id: "block",
    header: "Block",
    accessorKey: "id",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => <div className="capitalize">{row.getValue("age")}</div>,
  },
  {
    accessorKey: "transaction",
    header: "Txn",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("transaction")}</div>
    ),
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("recipient")}</div>
    ),
  },
  {
    accessorKey: "gasUsed",
    header: "Gas Used",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("gasUsed")}</div>
    ),
  },
  {
    accessorKey: "gasLimit",
    header: "Gas Limit",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("gasLimit")}</div>
    ),
  },
  {
    accessorKey: "baseFee",
    header: "Base Fee",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("baseFee")}</div>
    ),
  },
  {
    accessorKey: "reward",
    header: "Reward",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("reward")}</div>
    ),
  },
  {
    accessorKey: "burntFees",
    header: "Burnt Fees",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("burntFees")}</div>
    ),
  },
];

const BlocksTable = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    // state: {
    //   sorting,
    //   columnFilters,
    //   rowSelection,
    // },
  });
  return (
    <>
      <div className="rounded-md border">
        <table>
          <th>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </th>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <button
            // variant="outline"
            // size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            // variant="outline"
            // size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default BlocksTable;
