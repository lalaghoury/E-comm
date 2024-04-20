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
  Table,
  Tooltip,
  Typography,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.scss";
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

const EditProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [product, setProduct] = useState({});
  const [typesNames, setTypesNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = async () => {
    if (!id || id === ":id") {
      return navigate("/dashboard/products/products-list");
    } else {
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
      const res3 = await axios.get(`http://localhost:5000/api/products/${id}`);
      if (res3.data.success) {
        const product = await res3.data.product;
        setProduct(product);
        form.setFieldsValue({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          handle: product.handle,
          sku: product.sku,
          tags: product.tags,
          category: product.category,
          type: product.type,
          allow_backorder: product.allow_backorder,
          height: product.height,
          width: product.width,
          length: product.length,
          weight: product.weight,
          currency: product.currency,
          barcode: product.barcode,
          images: product.images,
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!product) return <div>Product not found!</div>;

  const handleCancel = () => {
    form.resetFields();
    navigate("/dashboard/products/products-list");
  };

  const hasImagesChanged = (formImages, productImages2) => {
    const valuesImages = [formImages] || [];
    const productImages = [productImages2] || [];
    const valuesImagesString = valuesImages.join(",");
    const productImagesString = productImages.join(",");
    return valuesImagesString !== productImagesString;
  };

  const checkDirtyness = (values, product, form) => {
    const formFieldsHaveChanged = Object.keys(values)
      .filter((field) => field !== "images") // don't check images
      .some((field) => {
        const formValue = form.getFieldValue(field);
        const productValue = product[field];
        return form.isFieldTouched(field) && formValue !== productValue;
      });

    console.log(
      "🚀 ~ checkDirtyness ~ formFieldsHaveChanged:",
      formFieldsHaveChanged
    );

    const imagesChanged = hasImagesChanged(values.images, product.images);
    console.log("🚀 ~ checkDirtyness ~ imagesChanged:", imagesChanged);

    return formFieldsHaveChanged || imagesChanged;
  };

  const onFinish = async (values) => {
    setLoading(true);
    const dirtynessResult = checkDirtyness(values, product, form);
    if (dirtynessResult === true) {
      values.handle = values.handle.replace(/\s+/g, "-").replace(/[\s-]+$/, "");
      values.images = values.images.filter((image) => image !== "");
      values.sku = values.sku.replace(/\s/g, "");
      if (!values.sku) values.sku = Math.random().toString(36).substr(2, 5);

      try {
        const response = await axios.put(
          `http://localhost:5000/api/products/edit/${id}`,
          values
        );
        const data = await response.data;
        if (data.success) {
          message.success(data.message, 1.5, () => {
            navigate("/dashboard/products/products-list");
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error updating product:", error);
        message.error(error.response.data.message);
        setLoading(false);
      }
    } else {
      message.warning("No changes have been made!");
      setLoading(false);
    }
  };

  const onDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <div className="add-product">
      <Title>Update product</Title>

      <Form
        form={form}
        scrollToFirstError={true}
        onFinish={onFinish}
        className="add-product-form"
        layout="vertical"
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
          {/* <p>Please separate tags by comma</p> */}
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
              <Select style={{ width: 100 }}>
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
          >
            <Input className="input-md" placeholder="401_1BBXBK" />
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
            <Button loading={loading} type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
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
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!id || id === ":id") {
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        if (res.data.success) {
          setImages(res.data.product.images);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        message.error("Error fetching images");
      }
    };
    fetchData();
  }, [id]);

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
                  disabled={loading}
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

export default EditProduct;
