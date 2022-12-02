import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";
import React from "react";
import { FormTableProps } from "../../model/index.model";
import ButtonCommon from "../../utils/ButtonCommon";

const SearchCategory = ({
  setSearchValue,
}: Pick<FormTableProps<any>, "setSearchValue">) => {
  const [form] = Form.useForm();
  const handleSubmit = (data: { name: string }) => {
    setSearchValue(data);
  };
  return (
    <div>
      <Form form={form} onFinish={handleSubmit}>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="name">
              <Input allowClear placeholder="Tên danh mục" />
            </Form.Item>
          </Col>
          <Col span={12} className="group-search">
            <Form.Item>
              <div className="group-search">
                <ButtonCommon isSearch={true} style={{ marginRight: "12px" }}>
                  <div>
                    <PlusOutlined />
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

export default SearchCategory;
