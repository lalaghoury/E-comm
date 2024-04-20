import React from "react";
import "./NewPasswordPage.scss";
import AppLayout from "../../config/AppLayout/AppLayout";
import NewPasswordImage from "../../assests/images/new-password.png";
import { Button, Form, Input, message, Space } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const NewPasswordPage = () => {
  const [form] = Form.useForm();
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const onFinish = async (values) => {
    const { password, confirm } = values;
    if (password !== confirm) {
      return message.error("Passwords do not match");
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${resetToken}`,
        { password }
      );
      const data = await response.data;
      console.log(data);
      if (data.success) {
        setTimeout(() => {
          message.success(data.message);
          navigate("/sign-in", { replace: true });
        }, 2000);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error(error.response.data.error);
      setLoading(false);
    }
  };
  return (
    <AppLayout>
      <div className="new-password-page">
        <div className="new-left">
          <img src={NewPasswordImage} alt="new-password" />
        </div>
        <div className="new-right">
          <div className="new-text">
            <h1>Create New Password</h1>
            <p>
              Your new password must be different from previous used passwords.
            </p>
          </div>

          <div className="new-form">
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="signup-form"
              scrollToFirstError
              form={form}
            >
              <Form.Item
                name={"password"}
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                  {
                    pattern: new RegExp(
                      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
                    ),
                    message:
                      "Please enter a strong password (with uppercase, lowercase, special characters and numbers)",
                  },
                ]}
                validateTrigger="onBlur"
              >
                <div>
                  <Input.Password size="large" />
                </div>
              </Form.Item>

              <Form.Item
                name={"confirm"}
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "New password and comfirm new password do not match!"
                        )
                      );
                    },
                  }),
                ]}
                validateTrigger="onBlur"
              >
                <div>
                  <Input.Password size="large" />
                </div>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={loading}>
                  {loading ? (
                    <Space align="center" gap={5}>
                      Sending... <LoadingOutlined />
                    </Space>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NewPasswordPage;
