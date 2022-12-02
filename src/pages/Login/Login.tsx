import { Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import path from "../../router/path";
import ButtonCommon from "../../utils/ButtonCommon";
import { TOKEN_KEY, useAuth } from "../../utils/contants";
import "./login.scss";
import { loginService } from "./login.service";
const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const auth = useAuth();
  const { isLoading, mutate, data } = useMutation(["login"], (data: any) =>
    loginService(data)
  );
  const handleSubmit = (value: any) => {
    mutate(value);
  };
  useEffect(() => {
    if (data) {
      if (data.status === 200) {
        toast.success(data.data.message);
        localStorage.setItem(TOKEN_KEY, data.data.data.token);
        navigate(path.home);
      }
    }
  }, [data, navigate]);

  useEffect(() => {
    if (auth) {
      navigate(path.home);
    }
  }, [auth, navigate]);

  return (
    <div className="login">
      <div>
        <Form onFinish={handleSubmit} form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
              >
                <Input placeholder="Nhập tên tài khoản của bạn" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input placeholder="Mật khẩu" type="password" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <ButtonCommon
                  loading={isLoading}
                  isSearch={true}
                  htmlType="submit"
                >
                  <>Đăng nhập</>
                </ButtonCommon>
              </Form.Item>
            </Col>
            <Col span={24}>
              <span
                className="_register"
                onClick={() => navigate(path.register)}
              >
                Bạn chưa có tài khoản? Bấm vào đây để đăng ký
              </span>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Login;
