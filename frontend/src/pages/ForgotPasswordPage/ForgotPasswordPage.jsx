import React from "react";
import "./ForgotPasswordPage.scss";
import AppLayout from "../../config/AppLayout/AppLayout";
import ForgotPasswordImage from "../../assests/images/forgot.png";
import ForgotPasswordEmailImage from "../../assests/images/forgot-email.png";
import { Button, Flex, Form, Input, Space, message } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { email } = values;
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/send-verification-link",
        { email }
      );
      if (data.success) {
        message.success(data.message);
        setIsEmailSent(true);
      } else {
        message.error(data.error);
      }
      setLoading(false);
    } catch (error) {
      message.error(error.response.data.error);
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="forgot-password-page">
        <div className="forgot-left">
          {isEmailSent ? (
            <img src={ForgotPasswordEmailImage} alt="forgot-password" />
          ) : (
            <img src={ForgotPasswordImage} alt="forgot-password" />
          )}
        </div>
        <div className="forgot-right">
          <div className="forgot-text">
            <h1>{isEmailSent ? "Check Email" : "Reset Your Password"}</h1>
            <p>
              {isEmailSent ? (
                <>
                  Please check your email inbox and click on the provided link
                  to reset your password . If you don’t receive email,
                  <span
                    className="text-primary bold cursor"
                    onClick={() => {
                      setIsEmailSent(false);
                    }}
                  >
                    Click here to resend.
                  </span>
                </>
              ) : (
                <>
                  Enter your email and we'll send you a link to reset your
                  password. Please check it.
                </>
              )}
            </p>
          </div>

          {isEmailSent && (
            <div className="mt-20">
              <LeftOutlined /> Back to{" "}
              <Link className="link text-sec" to={"/sign-in"}>
                Login
              </Link>{" "}
            </div>
          )}

          {isEmailSent === false && (
            <div className="forgot-form">
              <Form layout="vertical" onFinish={onFinish}>
                <Flex gap={25} vertical>
                  <Form.Item
                    name={"email"}
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your  email address!",
                      },
                      {
                        type: "email",
                        message: "The enter a valid E-mail!",
                      },
                    ]}
                    validateTrigger="onSubmit"
                  >
                    <Input size="large" placeholder="designer@gmail.com" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={loading}>
                      {loading ? (
                        <Space align="center" gap={5}>
                          Sending... <LoadingOutlined />
                        </Space>
                      ) : (
                        "Send Link"
                      )}
                    </Button>

                    <div className="mt-5">
                      Back to{" "}
                      <Link className="link text-sec" to={"/sign-in"}>
                        Login
                      </Link>{" "}
                    </div>
                  </Form.Item>
                </Flex>
              </Form>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ForgotPasswordPage;
