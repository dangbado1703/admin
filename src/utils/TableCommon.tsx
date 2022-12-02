import React from "react";
import { TableProps, Table, PaginationProps } from "antd";

interface TableCommonProps extends TableProps<any> {
  total: number;
  page: number;
  pageSize: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
}
const TableCommon = ({
  total,
  page,
  pageSize,
  setPage,
  setSize,
  columns,
  ...rest
}: TableCommonProps) => {
  const options: PaginationProps = {
    total,
    showTotal: (total, range) =>
      `Hiển thị ${range[0]} - ${range[1]} của ${total} bản ghi`,
    onChange: (page) => setPage(page),
    pageSize,
    current: page,
  };
  return (
    <div>
      <Table
        {...rest}
        pagination={options}
        columns={columns}
        size="small"
        bordered
        key="id"
      />
    </div>
  );
};

export default TableCommon;
