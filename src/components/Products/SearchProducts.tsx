import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FormTableProps } from "../../model/index.model";
import { IFormSearchProducts } from "../../model/products.model";
import path from "../../router/path";
import { useAppDispatch } from "../../store/hook";
import ButtonCommon from "../../utils/ButtonCommon";
import SelectCommon from "../../utils/SelectCommon";

const SearchProducts = ({
  setSearchValue,
}: Pick<FormTableProps<IFormSearchProducts>, "setSearchValue">) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const handleSubmit = (data: Partial<IFormSearchProducts>) => {
    setSearchValue(data);
  };
  const handleAddNew = () => {
    navigate(path.addNewProduct);
  };
  return (
    <div>
      <Form form={form} onFinish={handleSubmit}>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item name="product_name">
              <Input placeholder="Tên sản phẩm" allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="product_code">
              <Input placeholder="Mã sản phẩm" allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="price_from">
              <Input placeholder="Giá sản phẩm từ" allowClear type="number" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="price_to">
              <Input placeholder="Giá sản phẩm đến" allowClear type="number" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Input
                placeholder="Số lượng còn lại từ"
                allowClear
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Input
                placeholder="Số lượng còn lại đến"
                allowClear
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <SelectCommon placeholder="Nhà sản xuất" options={[]} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <SelectCommon options={[]} placeholder="Loại sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <SelectCommon placeholder="Trạng thái sản phẩm" options={[]} />
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "end" }}>
            <Form.Item>
              <div className="group-search">
                <ButtonCommon
                  isSearch={true}
                  style={{ marginRight: "12px" }}
                  onClick={handleAddNew}
                >
                  <div>
                    <PlusOutlined style={{ marginRight: "4px" }} />
                    <span>Thêm mới</span>
                  </div>
                </ButtonCommon>
                <ButtonCommon isSearch={true} htmlType="submit">
                  <div>
                    <SearchOutlined />
                    <span>Tìm kiếm</span>
                  </div>
                </ButtonCommon>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchProducts;
