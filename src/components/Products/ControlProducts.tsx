import { PlusOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Select, Upload, UploadProps } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { searchCategory } from "../../pages/Category/category.reducer";
import {
  createProduct,
  getDetailProduct,
  setAction,
  updateProduct,
} from "../../pages/Products/products.reducer";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import ButtonCommon from "../../utils/ButtonCommon";
import { BEFORE_UPLOAD, GET_BASE64, PRODUCER } from "../../utils/contants";
import SelectCommon from "../../utils/SelectCommon";

const ControlProducts = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<RcFile>();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { action, isLoadingCreate } = useAppSelector(
    (state) => state.productsReducer
  );
  const { dataSelect } = useAppSelector((state) => state.categoryReducer);
  useEffect(() => {
    if (location.pathname === path.addNewProduct) {
      dispatch(setAction("create"));
    }
    if (location.pathname.includes("update")) {
      dispatch(setAction("update"));
      dispatch(getDetailProduct(params.id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const newPayload: any = res.payload;
          form.setFieldsValue({ ...newPayload.data.data });
          setImageUrl(newPayload.data.data.image);
        }
      });
    }
    if (location.pathname.includes("detail")) {
      dispatch(setAction("view"));
      dispatch(getDetailProduct(params.id)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const newPayload: any = res.payload;
          form.setFieldsValue({ ...newPayload.data.data });
          setImageUrl(newPayload.data.data.image);
        }
      });
    }
    dispatch(searchCategory({ name: "", page: 1, size: 100 }));
  }, [location, dispatch]);
  const handleChangeTitle = () => {
    if (action === "create") {
      return <span>Thêm mới sản phẩm</span>;
    }
    if (action === "update") {
      return <span>Cập nhật sản phẩm</span>;
    }
    if (action === "view") {
      return <span>Xem chi tiết sản phẩm</span>;
    }
  };
  const handleChangeFile: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    GET_BASE64(info.file.originFileObj as RcFile, (url) => {
      setImageUrl(url);
      setFile(info.file.originFileObj);
    });
  };
  const handleSubmit = (data: any) => {
    const formData = new FormData();
    if (data && Object.keys(data).length) {
      Object.keys(data).forEach((item) => {
        if (item !== "category_name") {
          formData.append(item, data[item]);
        } else {
          data[item].forEach((category: string) => {
            formData.append(item, category);
          });
        }
      });
    }
    if (params.id) {
      formData.append("product_id", params.id);
    }
    if (file) {
      formData.append("image_product", file);
    }
    if (action === "create") {
      dispatch(createProduct(formData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          form.resetFields();
          setFile(undefined);
          setImageUrl("");
          navigate(path.products);
        }
      });
      return;
    }
    if (action === "update") {
      dispatch(updateProduct(formData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          form.resetFields();
          setFile(undefined);
          setImageUrl("");
          navigate(path.products);
        }
      });
    }
  };
  return (
    <div style={{ fontSize: "1.6rem" }}>
      <div>{handleChangeTitle()}</div>
      <div>
        <div>
          <Form form={form} onFinish={handleSubmit}>
            <Row gutter={12}>
              <Col span={8}>
                <Form.Item
                  rules={[
                    { required: true, message: "Trường này là bắt buộc" },
                  ]}
                  name="product_name"
                >
                  <Input
                    disabled={action === "view"}
                    placeholder="Tên sản phẩm"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  rules={[
                    { required: true, message: "Trường này là bắt buộc" },
                  ]}
                  name="product_price"
                >
                  <Input
                    disabled={action === "view"}
                    placeholder="Giá sản phẩm"
                    type="number"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  rules={[
                    { required: true, message: "Trường này là bắt buộc" },
                  ]}
                  name="stock"
                >
                  <Input
                    disabled={action === "view"}
                    type="number"
                    placeholder="Số lượng"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  rules={[
                    { required: true, message: "Trường này là bắt buộc" },
                  ]}
                  name="category_name"
                >
                  <SelectCommon
                    disabled={action === "view"}
                    placeholder="Loại sản phẩm"
                    options={dataSelect}
                    mode="multiple"
                  >
                    {dataSelect?.map((item) => (
                      <Select.Option value={item.label}>
                        {item.label}
                      </Select.Option>
                    ))}
                  </SelectCommon>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  rules={[
                    { required: true, message: "Trường này là bắt buộc" },
                  ]}
                  name="facturers"
                >
                  <SelectCommon
                    disabled={action === "view"}
                    placeholder="Nhà sản xuất"
                    options={PRODUCER}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div className="show-image">
                  <div>
                    <img
                      src={imageUrl}
                      style={{ width: "100%", maxHeight: "200px" }}
                    />
                  </div>
                </div>
                {action !== "view" ? (
                  <div style={{ textAlign: "center" }}>
                    <Upload
                      showUploadList={false}
                      beforeUpload={BEFORE_UPLOAD}
                      onChange={handleChangeFile}
                      accept="image/*"
                    >
                      <div className="upload-product">
                        <UploadOutlined />
                        <span>Tải ảnh lên</span>
                      </div>
                    </Upload>
                  </div>
                ) : null}
              </Col>
              {action !== "view" ? (
                <Col span={24} style={{ textAlign: "end" }}>
                  <Form.Item>
                    <ButtonCommon
                      loading={isLoadingCreate}
                      isSearch={true}
                      htmlType="submit"
                    >
                      <div>
                        <SaveOutlined />
                        <span>Lưu</span>
                      </div>
                    </ButtonCommon>
                  </Form.Item>
                </Col>
              ) : null}
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ControlProducts;
