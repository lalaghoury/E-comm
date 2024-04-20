import React from "react";
import "./Deals.scss";
import AppLayout from "../../config/AppLayout/AppLayout";
import { Typography } from "antd";

const Deals = () => {
  return (
    <AppLayout>
      <div className="deals dis-fcc">
        <div
          style={{
            background:
              "url(https://res.cloudinary.com/dslrkvmwn/image/upload/v1709707110/images/umoxry5lqtg8nqivn6e7.jpg)",
            backgroundRepeat: "no-repeat",
          }}
          className="deals-content"
        >
          <Typography>
            <Typography.Title level={4}>Low Price</Typography.Title>
            <Typography.Title level={1}>
              High Coziness <br />
              <br />
            </Typography.Title>
            <Typography.Title level={5}>UPTO 50% OFF</Typography.Title>
            <Typography.Title level={5}>Explore Items</Typography.Title>
          </Typography>
        </div>
        <div
          style={{
            background:
              "url(https://res.cloudinary.com/dslrkvmwn/image/upload/v1709707196/images/udklegcadqzsakrmeeh1.jpg)",
            backgroundRepeat: "no-repeat",
          }}
          className="deals-content"
        >
          <Typography>
            <Typography.Title level={4}>Beyoung Presents</Typography.Title>
            <Typography.Title level={1}>
              Breezy Summer <br /> Style
            </Typography.Title>
            <Typography.Title level={5}>UPTO 50% OFF</Typography.Title>
            <Typography.Title level={5}>Explore Items</Typography.Title>
          </Typography>
        </div>
      </div>
    </AppLayout>
  );
};

export default Deals;
