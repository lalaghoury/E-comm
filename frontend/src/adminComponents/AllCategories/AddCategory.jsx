import React, { useState } from "react";
import { Form, Input, Button, Flex, Avatar, message, Divider } from "antd";
import ReactQuill from "react-quill";
import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";

const AddCategory = () => {
  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const res = await axios.post("http://localhost:5000/api/categories/new", {
      ...values,
      image: images[0].url,
    });
    if (res.data.success) {
      message.success(res.data.message);
      navigate("/dashboard/categories/categories-list");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    navigate(-1);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    setSelectedImages((prevImages) => [...prevImages, file]);

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

  const onDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <Form
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
      layout="vertical"
    >
      <Form.Item
        label="Category Name"
        name="name"
        rules={[
          { required: true, message: "Please input your category name!" },
        ]}
      >
        <Input className="input-md" placeholder="Category Name" />
      </Form.Item>
      <Divider />

      <Form.Item
        label="Category Slug"
        name="slug"
        rules={[
          { required: true, message: "Please input your category slug!" },
        ]}
      >
        <Input className="input-md" placeholder="Category Slug" />
      </Form.Item>
      <Divider />

      <Form.Item
        label="Category Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input your category description!",
          },
        ]}
      >
        <CategoryDescriptionInput
          value={description}
          onChange={onDescriptionChange}
        />
      </Form.Item>

      <Divider />

      {/* Images */}
      <Form.Item
        rules={[
          { required: true, message: "Please upload at least one image" },
        ]}
        name={"images"}
        label={<Title level={5}>Images</Title>}
      >
        <Dragger
          beforeUpload={beforeUpload}
          onChange={handleUpload}
          accept="image/*"
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
      </Form.Item>

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
  );
};

const CategoryDescriptionInput = ({ value, onChange }) => {
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

export default AddCategory;
