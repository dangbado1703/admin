import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { FormTableProps } from "../../model/index.model";
import { useAppSelector } from "../../store/hook";
import TableCommon from "../../utils/TableCommon";

const TableCategory = ({
  page,
  setPage,
  size,
  setSize,
  searchValue,
}: Omit<FormTableProps<{ name: string }>, "setSearchValue">) => {
  const { dataSearch, isLoading, total } = useAppSelector(
    (state) => state.categoryReducer
  );
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      key: "stt",
      dataIndex: "stt",
      render(value, record, index) {
        return (page - 1) * size + index + 1;
      },
    },
    {
      title: "Tên category",
      key: "stt",
      dataIndex: "name",
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "action",
      render(value, record, index) {
        return (
          <div>
            <Tooltip title="Xem chi tiết">
              <EyeOutlined />
            </Tooltip>
            <Tooltip title="Chỉnh sửa">
              <EditOutlined
                style={{ margin: "0 6px" }}
                // onClick={() => handleOpenUpdateUser(record)}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteOutlined
              // onClick={() => handleDeleteUser(record?.user_id)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <TableCommon
        columns={columns}
        page={page}
        pageSize={size}
        setPage={setPage}
        setSize={setSize}
        dataSource={dataSearch}
        total={total as number}
        loading={isLoading}
      />
    </div>
  );
};

export default TableCategory;
