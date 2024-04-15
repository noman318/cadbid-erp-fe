"use client";

import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAlluserQuery } from "@/slices/userApiSlice";

interface User {
  id: string;
  sName: string;
  sEmail: string;
  sLevel: string;
  sMobile: string;
  sUserName: string;
  sUserType: string;
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sName",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sName")}</div>
    ),
  },
  {
    accessorKey: "sEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("sEmail")}</div>
    ),
  },
  {
    accessorKey: "sLevel",
    header: "Level",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sLevel")}</div>
    ),
  },
  {
    accessorKey: "sMobile",
    header: "Mobile",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sMobile")}</div>
    ),
  },
  {
    accessorKey: "sUserName",
    header: "User Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sUserName")}</div>
    ),
  },
  {
    accessorKey: "sUserType",
    header: "User Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sUserType")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function CustomTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const {
    data: newData,
    isLoading,
    refetch,
  } = useGetAlluserQuery({
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
  });
  const tableData = newData?.users;
  // console.log("newData", newData?.users);
  // console.log("tableData", tableData);

  // console.log("userNew", userNew);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <></>
      ) : (
        tableData && (
          <React.Fragment>
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter emails..."
                value={
                  (table.getColumn("sEmail")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("sEmail")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    ?.getAllColumns()
                    ?.filter((column) => column.getCanHide())
                    ?.map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table &&
                    table?.getHeaderGroups()?.map((headerGroup) => (
                      <TableRow key={headerGroup?.id}>
                        {headerGroup?.headers?.map((header) => {
                          return (
                            <TableHead key={header?.id}>
                              {header?.isPlaceholder
                                ? null
                                : flexRender(
                                    header?.column?.columnDef?.header,
                                    header?.getContext()
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                  {table && table?.getRowModel()?.rows?.length ? (
                    table?.getRowModel()?.rows.map((row) => (
                      <TableRow
                        key={row?.id}
                        data-state={row?.getIsSelected() && "selected"}
                      >
                        {row?.getVisibleCells()?.map((cell) => (
                          <TableCell key={cell?.id}>
                            {flexRender(
                              cell?.column?.columnDef?.cell,
                              cell?.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table?.getFilteredSelectedRowModel()?.rows?.length} of{" "}
                {table?.getFilteredRowModel()?.rows?.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table?.previousPage()}
                  disabled={!table?.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table?.nextPage()}
                  disabled={!table?.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </React.Fragment>
        )
      )}
    </div>
  );
}
