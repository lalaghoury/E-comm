import React from "react";
import "./SignUpPage.scss";
import AppLayout from "../../config/AppLayout/AppLayout";
import GoogleSvg from "../../assests/images/Google.svg";
// import TwitterSvg from "../../assests/images/twitter.svg";
import SignUpImage from "../../assests/images/signin.png";
import { Button, Checkbox, Form, Input, Space, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DiscordOutlined, LoadingOutlined } from "@ant-design/icons";

const SignUpPage = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();

  function discordSignIn() {
    window.location.href = "http://localhost:5000/api/auth/discord";
  }

  function googleSignIn() {
    window.location.href = "http://localhost:5000/api/auth/google";
  }

  const onFinish = async (values) => {
    if (!values.email || !values.password || !values.name) {
      return message.error("All fields are required");
    }
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        values
      );
      const data = response.data;
      console.log(data);
      if (data.success) {
        message.success(data.message, 1, () => {
          navigate("/sign-in");
        });
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error);
      setIsSubmitting(false);
    }
  };
  return (
    <AppLayout>
      <div className="signup-page">
        <div className="signup-left">
          <img src={SignUpImage} alt="signup" />
        </div>
        <div className="signup-right">
          <div className="signup-main">
            <div className="signup-text">
              <h1 className="mt-20">Sign Up</h1>
              <p className="mb-20">
                Sign up for free to access to in any of our products{" "}
              </p>
              <div className="signup-btns">
                <Button className="signup-btn" block onClick={googleSignIn}>
                  <img
                    src={GoogleSvg}
                    alt="google img"
                    style={{ width: "2rem", height: "2rem" }}
                    className="mr-3"
                  />
                  <span>Continue With Google</span>
                </Button>{" "}
                <Button className="signup-btn" block onClick={discordSignIn}>
                  {/* <img src={TwitterSvg} alt="facebook img" /> */}
                  <DiscordOutlined
                    style={{ fontSize: "2rem", color: "#7289DA" }}
                  />
                  <span style={{ verticalAlign: "middle" }}>
                    Continue With Discord
                  </span>
                </Button>{" "}
              </div>
            </div>

            <div className="signup-form">
              <Form
                layout="vertical"
                onFinish={onFinish}
                className="signup-form"
                scrollToFirstError={true}
              >
                {/* Name */}
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: "Name is required!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input size="large" placeholder="John Doe" />
                </Form.Item>

                {/* Email */}
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    {
                      required: true,
                      message: "Email is required!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input size="large" placeholder="designer@gmail.com" />
                </Form.Item>

                {/* Password */}
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Password is required!",
                    },
                    {
                      validator: (_, value) => {
                        if (!value || value.length < 8) {
                          return Promise.reject(
                            "Password must have 8 characters or more"
                          );
                        }
                        if (!/[A-Z]/.test(value)) {
                          return Promise.reject(
                            "Password must have at least one uppercase letter"
                          );
                        }
                        if (!/[a-z]/.test(value)) {
                          return Promise.reject(
                            "Password must have at least one lowercase letter"
                          );
                        }
                        if (!/[0-9]/.test(value)) {
                          return Promise.reject(
                            "Password must have at least one number"
                          );
                        }
                        if (!/[^a-zA-Z0-9]/.test(value)) {
                          return Promise.reject(
                            "Password must have at least one symbol"
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <div>
                    <Input.Password size="large" />
                    <span>
                      Use 8 or more characters with a mix of letters, numbers &
                      symbols
                    </span>
                  </div>
                </Form.Item>

                {/* Agreement */}
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      required: true,
                      message: "You must agree to our privacy agreement",
                    },
                  ]}
                  validateTrigger="onSubmit"
                >
                  <Checkbox>
                    Agree to our{" "}
                    <Link className="link text-sec" to={"#"}>
                      Terms of use
                    </Link>{" "}
                    and{" "}
                    <Link className="link text-sec" to={"#"}>
                      Privacy Policy
                    </Link>
                  </Checkbox>
                </Form.Item>

                {/* Newsletter */}
                <Form.Item name="newsletter" valuePropName="checked">
                  <Checkbox defaultChecked>
                    Subscribe to our monthly newsletter
                  </Checkbox>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Space align="center" gap={5}>
                        Sending... <LoadingOutlined />
                      </Space>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  <div className="mt-5">
                    Already have an account?{" "}
                    <Link className="link text-sec" to={"/sign-in"}>
                      Log In
                    </Link>{" "}
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SignUpPage;
