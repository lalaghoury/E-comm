import React, { useEffect } from "react";
import AppLayout from "../../config/AppLayout/AppLayout";
import CommonHeading from "../../components/CommonHeading/CommonHeading";
import { Layout, Breadcrumb, Divider, Flex } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import Paragraph from "antd/es/typography/Paragraph";
import { HeartOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { signout as signoutAction } from "../../redux/slices/authSlice";

const { Header, Sider, Content } = Layout;

const headerStyle = {
  color: "#fff",
  backgroundColor: "#fff",
  padding: "0",
};
const contentStyle = {
  backgroundColor: "#fff",
};
const siderStyle = {
  // lineHeight: "120px",
  color: "#807d7e",
  backgroundColor: "#fff",
};
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  backgroundColor: "#fff",
};

const UserProfileLayout = () => {
  const auth = useSelector((state) => state.auth);
  const [word, setWord] = React.useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signoutAction());
  };

  useEffect(() => {
    const url = location.pathname.split("/")[2].split("-").join(" ");
    setWord(url);
  }, [location]);

  return (
    <AppLayout>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={"/"} className="bold">
                    Home
                  </Link>
                ),
              },
              {
                title: <Link className="bold">My Account</Link>,
              },
              {
                title: (
                  <span
                    className="bold"
                    style={{ color: "#722ED1", textTransform: "capitalize" }}
                  >
                    {word}
                  </span>
                ),
              },
            ]}
            separator=">"
          />
          <Divider />
        </Header>
        <Layout>
          <Sider width="25%" style={siderStyle}>
            <CommonHeading text={`Hello ${auth?.user?.name}`} />
            <Paragraph className="m-0">Welcome to your Account</Paragraph>
            <Flex className="mt-30" vertical gap={20}>
              <Link to={"/profile/my-orders"}>
                <Flex gap={15}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M15.5833 8.39473L15.5138 7.45768C15.4501 6.59928 14.7083 5.93421 13.8146 5.93421H11.9937M5.5 17.4167H4.45365C3.465 17.4167 2.68398 16.609 2.75442 15.6594L3.36283 7.45769C3.42651 6.59928 4.16831 5.93421 5.06207 5.93421H6.88298M6.88298 5.93421V4.29385C6.88298 2.93494 8.02705 1.83333 9.43833 1.83333C10.8496 1.83333 11.9937 2.93494 11.9937 4.29385V5.93421M6.88298 5.93421H11.9937M15.5833 13.75C15.5833 14.7625 14.7625 15.5833 13.75 15.5833C12.7375 15.5833 11.9167 14.7625 11.9167 13.75M10.0833 19.25H17.4167C18.4292 19.25 19.25 18.4292 19.25 17.4167V12.8333C19.25 11.8208 18.4292 11 17.4167 11H10.0833C9.07081 11 8.25 11.8208 8.25 12.8333V17.4167C8.25 18.4292 9.07081 19.25 10.0833 19.25Z"
                      stroke="#807D7E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  My orders
                </Flex>
              </Link>
              <Link to={"/profile/my-wishlist"}>
                <Flex gap={15}>
                  <HeartOutlined />
                  Wishlist
                </Flex>
              </Link>
              <Link to={"/profile/my-info"}>
                <Flex gap={15}>
                  <UserOutlined />
                  My info
                </Flex>
              </Link>
              <span className="cursor" onClick={handleSignout}>
                <Flex gap={15}>
                  <LogoutOutlined />
                  Sign out
                </Flex>
              </span>
            </Flex>
          </Sider>
          <Content style={contentStyle} className="px-5">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </AppLayout>
  );
};

export default UserProfileLayout;
