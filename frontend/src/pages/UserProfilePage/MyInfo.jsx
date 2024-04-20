import React from "react";
import Title from "antd/es/typography/Title";
import { Button, Card, Divider, Flex } from "antd";
import { useSelector } from "react-redux";
import Paragraph from "antd/es/typography/Paragraph";
import { useAddressEffect } from "../../redux/slices/addressSlice";

const MyInfo = () => {
  useAddressEffect();
  return (
    <div>
      <Title>My Info</Title>
      <ContactDetails />
      <AddressDetails />
    </div>
  );
};

const ContactDetails = () => {
  const auth = useSelector((state) => state.auth);
  const { data: addresses } = useSelector((state) => state.addresses);

  return (
    <div>
      <Title level={4}>Contact Details</Title>
      <Divider />
      <Flex vertical>
        <div>
          <Title level={5}>Your Name</Title>
          <Flex justify="space-between">
            <Paragraph>{auth?.user?.name}</Paragraph>
            <Button type="text">Change</Button>
          </Flex>
          <Divider className="sm-divider" />
        </div>
        <div>
          <Title level={5}>Email Address</Title>
          <Flex justify="space-between">
            <Paragraph>{auth?.user?.email}</Paragraph>
            <Button type="text">Change</Button>
          </Flex>
          <Divider className="sm-divider" />
        </div>
        <div>
          <Title level={5}>Phone Number</Title>
          <Flex justify="space-between">
            <Paragraph>{addresses[0]?.phone}</Paragraph>
            <Button type="text">Change</Button>
          </Flex>
          <Divider className="sm-divider" />
        </div>
        <div>
          <Flex justify="space-between" align="center">
            <Title level={5}>Subscribed To Newsletters</Title>
            <Button type="primary">
              {auth?.user?.newsletter ? "Subscribed" : "Subscribed Now!"}
            </Button>
          </Flex>
          <Divider className="sm-divider" />
        </div>
      </Flex>
    </div>
  );
};

const AddressDetails = () => {
  const auth = useSelector((state) => state.auth);
  const { data: addresses } = useSelector((state) => state.addresses);

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Title level={4}>Addresses</Title>
        <Button type="text">Add New</Button>
      </Flex>
      <Divider />
      <Flex gap={20} wrap="wrap" style={{ width: "100%" }}>
        {addresses?.map((address) => (
          <Card
            key={address?._id}
            style={{ width: "48%", height: 270, borderRadius: 12 }}
          >
            <Title level={5}>
              {address?.first_name + " " + address?.last_name}
            </Title>
            <Paragraph>{address?.phone}</Paragraph>
            <Paragraph>
              {address?.address_line_1}
              <br />
              {address?.address_line_2}
            </Paragraph>
            <Flex vertical gap={10}>
              <div className="dis-fcsb">
                <Button type="primary">Home</Button>
                <Button type="primary">Default billing address</Button>
              </div>
              <Flex gap={20}>
                <Button type="link">Remove</Button>
                <Button type="link">Edit</Button>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default MyInfo;
