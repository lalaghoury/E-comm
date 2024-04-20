import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Spin,
  Table,
  Tooltip,
  Typography,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  InfoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
const { Title } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const currencies = [
  {
    name: "USD",
  },
  {
    name: "EUR",
  },
  {
    name: "RON",
  },
  {
    name: "PKR",
  },
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [typesNames, setTypesNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/categories/names"
      );
      if (response.data.success) {
        setCategoriesNames(response.data.categoriesNames);
      }
      const response2 = await axios.get(
        "http://localhost:5000/api/types/names"
      );
      if (response2.data.success) {
        setTypesNames(response2.data.typesNames);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCancel = () => {
    form.resetFields();
    navigate(-1);
  };

  const onFinish = async (values) => {
    try {
      values.handle = values.handle.replace(/\s+/g, "-").replace(/[\s-]+$/, "");
      values.sku = values.sku.replace(/\s/g, "");
      if (!values.sku) {
        const randomSku = Math.random().toString(36).substr(2, 5);
        values.sku = randomSku;
      }

      const response = await axios.post(
        "http://localhost:5000/api/products/new",
        values
      );

      const data = await response.data;

      if (data.success) {
        message.success("Product created successfully", 1.5, () => {
          navigate("/dashboard/products/products-list");
        });
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong", 1.5);
    }
  };

  const onDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <Spin spinning={loading} tip="Loading...">
      <div className="add-product">
        <Title>Create product</Title>

        <Form
          form={form}
          scrollToFirstError={true}
          onFinish={onFinish}
          className="add-product-form"
          layout="vertical"
          initialValues={{
            currency: "USD",
            price: 0,
          }}
          validateTrigger="onSubmit"
        >
          <Title level={5}>Basic information</Title>

          {/* Product name */}
          <Flex gap={20} justify="space-between">
            <Form.Item
              label="Product name"
              name="name"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <Input className="input-md" placeholder="Product Name" />
            </Form.Item>

            <Form.Item
              label="Handle"
              name="handle"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <Input className="input-md" placeholder="Handle Name" />
            </Form.Item>
          </Flex>

          <Flex gap={20} justify="space-between">
            {/* Category */}
            <Form.Item
              label="Category"
              name="category"
              className="select"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <Select style={{ width: "100%" }}>
                {categoriesNames.map((categoryName) => (
                  <Option value={categoryName._id} key={categoryName._id}>
                    {categoryName.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Type */}
            <Form.Item
              className="select"
              label="Type"
              name="type"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <Select style={{ width: "100%" }}>
                {typesNames.map((typeName) => (
                  <Option value={typeName._id} key={typeName._id}>
                    {typeName.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Flex>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
            style={{ width: "100%" }}
          >
            <ProductDescriptionInput
              value={description}
              onChange={onDescriptionChange}
            />
          </Form.Item>

          {/* Tags */}
          <Form.Item
            label="Tags"
            name="tags"
            rules={[{ type: "array", message: "Please enter tags" }]}
            style={{ width: "100%" }}
          >
            <Select
              mode="tags"
              placeholder="Tags"
              style={{ width: "100%" }}
              tokenSeparators={[","]}
              onChange={(values) => {
                console.log(values);
                form.setFieldValue("tags", values);
              }}
            ></Select>
            <p>Please separate tags by comma</p>
          </Form.Item>

          <Divider />

          <Title level={5}>Pricing</Title>
          {/* Price and currency */}
          <div style={{ width: "50%" }}>
            <Flex gap={20}>
              <Form.Item label="Price" name="price" style={{ width: 150 }}>
                <InputNumber style={{ width: 150 }} className="input-md" />
              </Form.Item>

              <Form.Item
                label="Currency"
                name="currency"
                rules={[
                  {
                    required: true,
                    message: "Please select a currency",
                  },
                ]}
                style={{ width: 100 }}
              >
                <Select
                  style={{ width: 100 }}
                  onChange={(value) => console.log(value)}
                >
                  {currencies.map((currency) => (
                    <Option value={currency.name} key={currency.name}>
                      {currency.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Flex>
          </div>

          <Divider />

          {/* Images */}
          <Form.Item
            rules={[
              { required: true, message: "Please upload at least one image" },
            ]}
            name={"images"}
            label={<Title level={5}>Images</Title>}
          >
            <ImageInput />
          </Form.Item>

          <Divider />

          <Title level={5}>Stock & inventory</Title>
          {/* SKU and barcode */}
          <Flex gap={20} justify="space-between">
            <Form.Item
              name="sku"
              label="Stock keeping unit (SKU)"
              style={{ width: "100%" }}
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input the SKU for stock and inventory!",
              //   },
              //   {
              //     pattern: /^[\w-]+$/,
              //     message: "SKU should not contain spaces",
              //   },
              // ]}
            >
              <div>
                <Input className="input-md" placeholder="401_1BBXBK" />
                <span>
                  <p>Leave blank for auto generated</p>
                </span>
              </div>
            </Form.Item>
            <Form.Item
              name="barcode"
              label="Barcode (EAN)"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please input the barcode for stock and inventory!",
                },
                {
                  pattern: /^\d{13}$/,
                  message: "Barcode should be 13 digits long",
                },
              ]}
            >
              <Input
                className="input-md"
                placeholder="e.g. 00123456789012"
                onBlur={(e) => {
                  const value = e.target.value;
                  if (value.length === 13 && !/^\d{13}$/.test(value)) {
                    form.setFields([
                      { name: "barcode", errors: ["Invalid barcode format"] },
                    ]);
                  }
                }}
              />
            </Form.Item>{" "}
          </Flex>

          {/* Quantity && Allow backorder && Keep selling when stock is empty */}
          <div style={{ width: "50%" }}>
            <Form.Item
              name="quantity"
              label="Quantity"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please input the quantity" }]}
            >
              <InputNumber
                className="input-md"
                placeholder="e.g. 00123456789012"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Flex align="center">
              <Form.Item name="allow_backorder" valuePropName="checked">
                <Checkbox>Allow backorders </Checkbox>
              </Form.Item>

              <Tooltip title="Keep selling when stock is empty">
                <InfoOutlined
                  style={{
                    marginLeft: "5px",
                    backgroundColor: "#222",
                    padding: "2px",
                    borderRadius: "50%",
                    color: "#ffffff",
                    opacity: "0.8",
                    marginBottom: 24,
                  }}
                />{" "}
              </Tooltip>
            </Flex>
          </div>

          {/* Dimensions */}
          <Flex gap={20} justify="space-between">
            <Form.Item
              name="height"
              label="Height"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please input the height" }]}
            >
              <InputNumber
                className="input-md"
                placeholder="e.g 25"
                style={{ width: "100%" }}
                suffix={<span style={{ marginRight: 30 }}>cm</span>}
              />
            </Form.Item>

            <Form.Item
              name="width"
              label="Width"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please input the width" }]}
            >
              <InputNumber
                className="input-md"
                placeholder="e.g 15"
                suffix={<span style={{ marginRight: 30 }}>cm</span>}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Flex>

          <Flex gap={20} justify="space-between">
            <Form.Item
              name="length"
              label="Length"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please input the length" }]}
            >
              <InputNumber
                className="input-md"
                placeholder="e.g 5"
                suffix={<span style={{ marginRight: 30 }}>cm</span>}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name="weight"
              label="Weight"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please input the weight" }]}
            >
              <InputNumber
                className="input-md"
                placeholder="e.g 0.25"
                suffix={<span style={{ marginRight: 30 }}>kg</span>}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Flex>

          {/* Buttons */}
          <Flex gap={12} justify="flex-end">
            <Form.Item>
              <Button onClick={handleCancel}>Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Product
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </div>
    </Spin>
  );
};

const ProductDescriptionInput = ({ value, onChange }) => {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      placeholder="Enter product description"
      className="custom-quill"
    />
  );
};

const ImageInput = ({ value = [], onChange }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const triggerAdd = (addedImages) => {
    const newImages = [...value, ...addedImages];
    onChange?.(newImages);
  };

  const triggerDelete = (deletedImageIndex) => {
    const newImages = [...value];
    newImages.splice(deletedImageIndex, 1);
    onChange?.(newImages);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const getUniqueFileName = (fileName, existingFileNames) => {
      let uniqueFileName = fileName;
      let counter = 1;
      while (existingFileNames.has(uniqueFileName)) {
        const extensionIndex = fileName.lastIndexOf(".");
        const nameWithoutExtension = fileName.slice(0, extensionIndex);
        const extension = fileName.slice(extensionIndex);
        uniqueFileName = `${nameWithoutExtension}${counter}${extension}`;
        counter++;
      }
      return uniqueFileName;
    };

    const existingFileNames = new Set(images.map((file) => file.name));
    const uniqueFileName = getUniqueFileName(file.name, existingFileNames);

    const updatedFile = new File([file], uniqueFileName, { type: file.type });

    setSelectedImages((prevImages) => [...prevImages, updatedFile]);

    return false;
  };

  const handleUpload = async () => {
    setLoading(true);

    if (selectedImages.length === 0) {
      message.error("No image selected");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    for (const image of selectedImages) {
      formData.append("images", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/images",
        formData
      );
      const data = response.data;
      if (data.success) {
        triggerAdd(data.images);
        const newImages = data.images.map((imgObj) => ({
          url: imgObj.url,
          name: imgObj.name,
        }));
        setImages([...images, ...newImages]);
        setSelectedImages([]);
        setLoading(false);
      } else {
        message.error("Failed to upload images");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      message.error("Error uploading images");
      setLoading(false);
    }
  };

  const handleDelete = (record) => {
    setImages(
      images.filter(
        (imgObj) => imgObj.url !== record.url && imgObj.name !== record.name
      )
    );
    triggerDelete(images.findIndex((imgObj) => imgObj.url === record.url));
  };

  return (
    <>
      <Flex vertical gap={30}>
        <Table
          dataSource={images.map((imgObj) => ({
            key: imgObj.url,
            url: imgObj.url,
            name: imgObj.name,
          }))}
          pagination={false}
          columns={[
            {
              title: "Image",
              dataIndex: "url",
              render: (url) => (
                <Image src={url} alt="avatar" width={50} height={50} />
              ),
            },
            {
              title: "File name",
              dataIndex: "name",
              render: (name) => {
                return name;
              },
            },
            {
              title: "Action",
              dataIndex: "url",
              render: (_, record) => (
                <Button
                  type="warning"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record)}
                />
              ),
            },
          ]}
        />

        <Dragger
          multiple={true}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
          showUploadList={false}
          accept="image/*"
          maxCount={7}
          style={{ border: "2px dashed rgba(0,0,0,0.1)", opacity: 1 }}
        >
          <>
            {loading ? (
              <Flex
                gap={4}
                align="center"
                justify="center"
                style={{ height: 200 }}
              >
                <span>Uploading image(s)...</span>
                <LoadingOutlined style={{ fontSize: 64 }} />
              </Flex>
            ) : (
              <Flex
                gap={4}
                align="center"
                justify="center"
                style={{ height: 200 }}
              >
                <p className="ant-upload-drag-icon">
                  <Avatar size={64}>
                    <CloudUploadOutlined style={{ fontSize: 32 }} />
                  </Avatar>
                </p>
                <Flex vertical gap={4}>
                  <p className="ant-upload-text">
                    Click or upload or drag and drop
                  </p>
                  <p className="ant-upload-hint">
                    (SVG, JPG, PNG, or gif maximum 900x400)
                  </p>
                </Flex>
              </Flex>
            )}
          </>
        </Dragger>
      </Flex>
    </>
  );
};

export default AddProduct;
