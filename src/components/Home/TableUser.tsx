import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { useState } from "react";
import { FormDataUser, FormSearchUser } from "../../model/home.model";
import { deleteUser, searchUser } from "../../pages/Home/home.reducer";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { DATE_FORMAT_YYYYMMDD } from "../../utils/contants";
import TableCommon from "../../utils/TableCommon";
import ModalUpdate from "./ModalUpdate";

interface TableUserProps {
  page: number;
  size: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  searchValue: Partial<FormSearchUser>;
}
const TableUser = ({
  page,
  size,
  setPage,
  setSize,
  searchValue,
}: TableUserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<FormDataUser | null>(null);
  const dispatch = useAppDispatch();
  const { dataSearch, total, isLoading } = useAppSelector(
    (state) => state.homeReducer
  );
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      align: "center",
      dataIndex: "stt",
      key: "stt",
      render(value, record, index) {
        return (page - 1) * size + index + 1;
      },
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Sinh nhật",
      dataIndex: "birthday",
      key: "birthday",
      render: (value) =>
        value ? moment(value).format(DATE_FORMAT_YYYYMMDD) : null,
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "is_active",
      key: "is_active",
      render(value, record, index) {
        if (value === 1) {
          return <Tag color="green">Hoạt động</Tag>;
        }
        if (value === 0) {
          return <Tag color="error">Không hoạt động</Tag>;
        }
      },
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
                onClick={() => handleOpenUpdateUser(record)}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteOutlined
                onClick={() => handleDeleteUser(record?.user_id)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const handleDeleteUser = (user_id: string) => {
    dispatch(deleteUser(user_id)).then((res) => {
      console.log("res", res);
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(searchUser({ ...searchValue, page, size }));
      }
    });
  };
  const handleOpenUpdateUser = (data: FormDataUser) => {
    setData(data);
    setIsOpen(true);
  };
  return (
    <div>
      <TableCommon
        columns={columns}
        page={page}
        pageSize={size}
        setPage={setPage}
        setSize={setSize}
        total={total}
        dataSource={dataSearch}
        loading={isLoading}
      />
      <ModalUpdate
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
        page={page}
        size={size}
        searchValue={searchValue}
      />
    </div>
  );
};

export default TableUser;
