import { Col, DatePicker, Form, Input, Modal, Row } from "antd";
import React, { useEffect } from "react";
import { FormDataUser, FormSearchUser } from "../../model/home.model";
import ButtonCommon from "../../utils/ButtonCommon";
import {
  DATE_FORMAT_YYYYMMDD,
  DATE_FORMAT_YYYY_MM_DD,
  STATUS_ACTIVE,
} from "../../utils/contants";
import SelectCommon from "../../utils/SelectCommon";
import "../../pages/Home/home.scss";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { searchUser, updateUser } from "../../pages/Home/home.reducer";
import dayjs from "dayjs";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: FormDataUser | null;
  page: number;
  size: number;
  searchValue: Partial<FormSearchUser>;
}
const ModalUpdate = ({
  isOpen,
  setIsOpen,
  data,
  page,
  size,
  searchValue,
}: ModalProps) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isLoadingUpdate } = useAppSelector((state) => state.homeReducer);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        birthday: data?.birthday ? dayjs(data?.birthday) : undefined,
      });
    }
  }, [data]);
  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };
  const handleSubmit = (value: Partial<FormDataUser>) => {
    dispatch(
      updateUser({
        ...value,
        user_id: data?.user_id,
        birthday: value.birthday
          ? dayjs(value.birthday).format(DATE_FORMAT_YYYY_MM_DD)
          : undefined,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsOpen(false);
        form.resetFields();
        dispatch(searchUser({ ...searchValue, page, size }));
      }
    });
  };
  const footer = (
    <div className="footer-modal">
      <ButtonCommon
        isDelete={true}
        style={{ marginRight: "8px" }}
        onClick={handleCancel}
      >
        <span>Cancel</span>
      </ButtonCommon>
      <ButtonCommon
        loading={isLoadingUpdate}
        isSearch={true}
        onClick={() => form.submit()}
      >
        <span>Đồng ý</span>
      </ButtonCommon>
    </div>
  );
  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={handleCancel}
        onOk={() => form.submit()}
        title="Cập nhật người dùng"
        footer={footer}
      >
        <Form form={form} onFinish={handleSubmit} requiredMark={false}>
          <Row>
            <Col span={24}>
              <Form.Item name="username">
                <Input allowClear placeholder="username" disabled={true} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              >
                <Input allowClear placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="phone_number"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              >
                <Input allowClear placeholder="Số điện thoại" />
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
              <Form.Item
                name="is_active"
                rules={[{ required: true, message: "Trường này là bắt buộc" }]}
              >
                <SelectCommon
                  placeholder="Trạng thái hoạt động"
                  options={STATUS_ACTIVE}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalUpdate;
