import { Col, DatePicker, Form, Input, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormRegister } from "../../model/register.model";
import path from "../../router/path";
import ButtonCommon from "../../utils/ButtonCommon";
import {
  DATE_FORMAT_YYYYMMDD,
  DATE_FORMAT_YYYY_MM_DD,
  useAuth,
} from "../../utils/contants";
import "./register.scss";
import { registerService } from "./register.service";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const auth = useAuth();
  const { isLoading, mutate } = useMutation(
    ["register"],
    (data: FormRegister) => registerService(data)
  );
  useEffect(() => {
    if (auth) {
      navigate(path.home);
    }
  }, [auth, navigate]);
  const handleSubmit = (data: FormRegister) => {
    const value = {
      ...data,
      birthday: moment(data.birthday).format(DATE_FORMAT_YYYY_MM_DD),
    };
    mutate(value, {
      onSuccess(data) {
        if (data.data.status === 200) {
          toast.success(data.data.message);
          navigate(path.login);
        }
      },
    });
  };

  return (
    <div className="register">
      <div>
        <Form onFinish={handleSubmit} form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              >
                <Input placeholder="Tên đăng nhập" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              >
                <Input placeholder="Mật khẩu" type="password" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Trường này là bắt buộc" },
                  {
                    type: "email",
                    message: "Vui lòng nhập đúng định dạng email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="phone_number"
                rules={[
                  { required: true, message: "Trường này là bắt buộc" },
                  { max: 12, message: "Tối đa 12 ký tự" },
                  { min: 4, message: "Tối thiểu 4 ký tự" },
                ]}
              >
                <Input placeholder="Số điện thoại" type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="birthday"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              >
                <DatePicker
                  placeholder="Sinh nhật"
                  format={DATE_FORMAT_YYYYMMDD}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <ButtonCommon
                  loading={isLoading}
                  isSearch={true}
                  htmlType="submit"
                >
                  <>Đăng ký</>
                </ButtonCommon>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Register;
