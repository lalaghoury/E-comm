import React from "react";
import { Typography } from "antd";
import AppLayout from "../../config/AppLayout/AppLayout";
const { Title } = Typography;

const CommonHeading = ({ text }) => {
  return (
    <div style={{ marginTop: "20px", marginBottom: "50px" }}>
      {/* <AppLayout> */}
      <Title
        level={2}
        style={{
          borderLeft: "6px solid #8A33FD",
        }}
      >
        <span style={{ paddingLeft: "15px" }}>{text}</span>
      </Title>
      {/* </AppLayout> */}
    </div>
  );
};

export default CommonHeading;
