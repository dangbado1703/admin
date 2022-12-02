import { SearchOutlined } from "@ant-design/icons";
import { Col, DatePicker, Form, Input, Row } from "antd";
import React from "react";
import { FormSearchUser } from "../../model/home.model";
import ButtonCommon from "../../utils/ButtonCommon";
import {
  DATE_FORMAT_YYYYMMDD,
  DATE_FORMAT_YYYY_MM_DD,
  STATUS_ACTIVE,
} from "../../utils/contants";
import SelectCommon from "../../utils/SelectCommon";
import moment from "moment";

interface SearchUserProps {
  setSearchValue: React.Dispatch<React.SetStateAction<Partial<FormSearchUser>>>;
}
const SearchUser = ({ setSearchValue }: SearchUserProps) => {
  const [form] = Form.useForm();
  const handleSubmit = (data: FormSearchUser) => {
    const value: FormSearchUser = {
      ...data,
      birthday_from: data.birthday_from
        ? moment(data.birthday_from).format(DATE_FORMAT_YYYY_MM_DD)
        : null,
      birthday_to: data.birthday_to
        ? moment(data.birthday_to).format(DATE_FORMAT_YYYY_MM_DD)
        : null,
    };
    setSearchValue({ ...value, page: 1, size: 10 });
  };
  return (
    <div>
      <div>
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item name="username">
                <Input allowClear placeholder="Tên tài khoản" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="email">
                <Input allowClear placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="phone_number">
                <Input allowClear placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="is_active">
                <SelectCommon
                  placeholder="Trạng thái hoạt động"
                  options={STATUS_ACTIVE}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="birthday_from">
                <DatePicker
                  placeholder="Ngày sinh nhật từ"
                  format={DATE_FORMAT_YYYYMMDD}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="birthday_to">
                <DatePicker
                  placeholder="Ngày sinh nhật đến"
                  format={DATE_FORMAT_YYYYMMDD}
                />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: "end" }}>
              <Form.Item>
                <ButtonCommon isSearch={true} htmlType="submit">
                  <div>
                    <SearchOutlined />
                    <span>Tìm kiếm</span>
                  </div>
                </ButtonCommon>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SearchUser;
