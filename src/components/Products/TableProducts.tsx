import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FormTableProps } from "../../model/index.model";
import path from "../../router/path";
import { useAppSelector } from "../../store/hook";
import TableCommon from "../../utils/TableCommon";

const TableProducts = ({
  page,
  searchValue,
  setPage,
  setSize,
  size,
}: Omit<FormTableProps<any>, "setSearchValue">) => {
  const { dataSearch, isLoading, total } = useAppSelector(
    (state) => state.productsReducer
  );
  const navigate = useNavigate();
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render(value, record, index) {
        if (page && size) return (page - 1) * size + 1 + index;
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      render(value, record, index) {
        if (record.image) {
          return (
            <Tooltip
              title={
                <div style={{ width: "200px" }}>
                  <img src={record.image} style={{ width: "100%" }} />
                </div>
              }
              placement="right"
            >
              <span style={{ cursor: "pointer" }}>{value}</span>
            </Tooltip>
          );
        }
        return <span style={{ cursor: "pointer" }}>{value}</span>;
      },
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "product_code",
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "product_price",
      render: (value) => <span>${value}</span>,
    },
    {
      title: "Nhà sản xuất",
      dataIndex: "facturers",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category_name",
      render: (value) => {
        return value?.map((item: any) => <Tag color="#2db7f5">{item}</Tag>);
      },
    },
    {
      title: "Trạng thái sản phẩm",
      dataIndex: "status",
      render: (value, record) => {
        if (value === "1") {
          return (
            <Tooltip title={<span>Còn lại {record.stock} sản phẩm</span>}>
              <Tag color="success">Còn hàng</Tag>
            </Tooltip>
          );
        } else {
          return <Tag color="error">Hết hàng</Tag>;
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
              <EyeOutlined
                onClick={() => navigate(`/product/detail/${record.product_id}`)}
              />
            </Tooltip>
            <Tooltip title="Chỉnh sửa">
              <EditOutlined
                style={{ margin: "0 6px" }}
                onClick={() => navigate(`/product/update/${record.product_id}`)}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteOutlined />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <TableCommon
        page={page}
        pageSize={size}
        total={total as number}
        dataSource={dataSearch}
        columns={columns}
        setPage={setPage}
        setSize={setSize}
        loading={isLoading}
      />
    </div>
  );
};

export default TableProducts;
