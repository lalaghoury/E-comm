import React, { useEffect, useState } from "react";
import AppLayout from "../../config/AppLayout/AppLayout";
import DropIn from "braintree-web-drop-in-react";
import {
  Spin,
  Form,
  Input,
  Button,
  Select,
  Flex,
  Radio,
  Divider,
  message,
  Image,
} from "antd";
import CommonHeading from "../../components/CommonHeading/CommonHeading";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import { cartThunks, useCartEffect } from "../../redux/slices/cartSlice";
import { PriceDetails } from "../CartPage/CartPage";
import {
  addressThunks,
  useAddressEffect,
} from "../../redux/slices/addressSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  useAddressEffect();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { data: cart, loading } = useSelector((state) => state.cart);
  const [form] = Form.useForm();
  const [selectedBillingOption, setSelectedBillingOption] =
    useState("existing-billing");
  const { data: addresses } = useSelector((state) => state.addresses);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/checkout/token"
        );
        if (data.success) {
          setClientToken(data.clientToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, []);

  const handlePayment = async () => {
    try {
      if (addresses.length === 0) {
        message.info("Please add an address before making payment");
        return;
      }
      const products = cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      if (!instance) {
        throw new Error("Drop-in instance not available");
      }

      const { nonce } = await instance.requestPaymentMethod();

      dispatch(
        cartThunks.handlePayment({
          nonce,
          amount: cart.total,
          products,
          shipping_address: addresses[selectedAddressIndex]._id,
          navigate,
        })
      );
      // !loading && navigate("/order-confirmed");
    } catch (error) {
      console.error("Payment Error:", error.message);
      message.error("Payment Error: " + error.message);
    }
  };

  const onFinish = (values) => {
    values = { ...values, address_type: "billing" };
    dispatch(addressThunks.addAddress(values));
  };

  return (
    <AppLayout>
      <Flex justify="space-between">
        <div className="left" style={{ width: "60%" }}>
          <CommonHeading text={"Check Out"} />

          <Flex vertical gap={25}>
            {/* <BillingDetails /> */}
            <>
              <Title>Billing Details</Title>

              <div
                style={{
                  width: "100%",
                  background: "#F6F6F6",
                  borderRadius: 20,
                  padding: 50,
                }}
              >
                <Radio.Group
                  value={selectedBillingOption}
                  onChange={(e) => setSelectedBillingOption(e.target.value)}
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <Title level={5}>Select Billing Details</Title>
                  <Divider />
                  <Radio value="existing-billing" className="bold">
                    Use existing Billing details
                  </Radio>

                  {selectedBillingOption === "existing-billing" && (
                    <>
                      {addresses.length > 0 ? (
                        <>
                          <Radio.Group
                            value={selectedAddressIndex}
                            onChange={(e) =>
                              setSelectedAddressIndex(e.target.value)
                            }
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 10,
                              marginLeft: 20,
                            }}
                          >
                            {addresses.map((address, index) => (
                              <Radio
                                value={index}
                                key={address._id}
                                className="bold"
                              >
                                {address.address_line_1}, {address.city}
                              </Radio>
                            ))}
                          </Radio.Group>
                        </>
                      ) : (
                        <Title level={3}>No Address Found</Title>
                      )}
                    </>
                  )}

                  <Radio value="new-billing" className="bold">
                    Or add new billing details
                  </Radio>
                </Radio.Group>

                {selectedBillingOption === "new-billing" && (
                  <>
                    <Title>Add Billing Details</Title>

                    <Form
                      name="billing-details-form"
                      form={form}
                      layout="vertical"
                      onFinish={onFinish}
                    >
                      <Flex gap={20} justify="space-between">
                        <Form.Item
                          label="First Name"
                          name="first_name"
                          rules={[{ required: true }]}
                          style={{ width: "100%" }}
                        >
                          <Input
                            className="input-md"
                            placeholder="First Name"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Last Name"
                          name="last_name"
                          rules={[{ required: true }]}
                          style={{ width: "100%" }}
                        >
                          <Input className="input-md" placeholder="Last Name" />
                        </Form.Item>
                      </Flex>

                      <Form.Item
                        label="Country/Region"
                        name="country"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please select your country/region!",
                          },
                        ]}
                      >
                        <Select
                          className="select"
                          placeholder="Select country/region"
                          style={{ width: "100%" }}
                        >
                          <Select.Option value="USA">USA</Select.Option>
                          <Select.Option value="UK">UK</Select.Option>
                          <Select.Option value="Canada">Canada</Select.Option>
                        </Select>
                      </Form.Item>

                      <Flex gap={20} justify="space-between">
                        <Form.Item
                          label="Street"
                          name="street"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your street!",
                            },
                          ]}
                          style={{ width: "100%" }}
                        >
                          <Input
                            className="input-md"
                            placeholder="House number and street name"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Apt, suite, unit"
                          name="appartment"
                          style={{ width: "100%" }}
                        >
                          <Input
                            className="input-md"
                            placeholder="apartment, suite, unit, etc. (optional)"
                          />
                        </Form.Item>
                      </Flex>

                      <Form.Item
                        label="Adress Line 1"
                        name="address_line_1"
                        rules={[
                          {
                            required: true,
                            message: "Please add atleast Adress Line 1!",
                          },
                        ]}
                        style={{ width: "100%" }}
                      >
                        <Input
                          className="input-md"
                          placeholder="House number and street name"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Adress Line 2"
                        name="address_line_2"
                        style={{ width: "100%" }}
                      >
                        <Input
                          className="input-md"
                          placeholder="House number and street name"
                        />
                      </Form.Item>

                      <Flex gap={20} justify="space-between">
                        <Form.Item
                          label="City"
                          name="city"
                          rules={[{ required: true }]}
                          style={{ width: "100%" }}
                        >
                          <Input className="input-md" placeholder="City" />
                        </Form.Item>

                        <Form.Item
                          label="State"
                          name="state"
                          rules={[{ required: true }]}
                          style={{ width: "100%" }}
                        >
                          <Input className="input-md" placeholder="State" />
                        </Form.Item>

                        <Form.Item
                          label="Pin Code"
                          name="pincode"
                          rules={[{ required: true }]}
                          style={{ width: "100%" }}
                        >
                          <Input className="input-md" placeholder="Pin Code" />
                        </Form.Item>
                      </Flex>

                      <div style={{ width: "50%" }}>
                        <Form.Item
                          label="Phone"
                          name="phone"
                          rules={[{ required: true }]}
                          style={{ width: "100%" }}
                        >
                          <Input className="input-md" placeholder="Phone" />
                        </Form.Item>
                      </div>

                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Save Billing Address
                        </Button>
                      </Form.Item>
                    </Form>
                  </>
                )}
              </div>
            </>
            <AddressList />
            <ShippingMethod />
            {/* <PaymentMethod /> */}
            <Flex vertical gap={12} style={{ width: "100%", borderRadius: 12 }}>
              <Title>Payment Method</Title>
              <Paragraph>All transactions are secure and encrypted.</Paragraph>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#F6F6F6",
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <Radio value="card">
                    <Paragraph style={{ fontWeight: "bold", margin: 0 }}>
                      Credit Card
                    </Paragraph>

                    <Paragraph>We accept all major credit cards.</Paragraph>
                  </Radio>

                  {paymentMethod === "card" && (
                    <div style={{ width: "100%", height: "100%" }}>
                      <DropIn
                        options={{
                          authorization: clientToken,
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                    </div>
                  )}
                  <Divider />
                  <Radio value="cod">
                    <Paragraph style={{ fontWeight: "bold", margin: 0 }}>
                      Cash on delivery
                    </Paragraph>
                    <Paragraph>Pay with cash upon delivery.</Paragraph>
                  </Radio>
                </Radio.Group>
              </div>
            </Flex>
            <Button
              onClick={handlePayment}
              loading={loading}
              disabled={!instance || (paymentMethod === "card" && !instance)}
              type="primary"
            >
              Place Order
            </Button>
          </Flex>
        </div>
        <div className="right" style={{ width: "35%" }}>
          <CartSummary />
        </div>
      </Flex>
    </AppLayout>
  );
};

const AddressList = () => {
  const [selectedAddress, setSelectedAddress] = useState("billing");
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values = { ...values, address_type: "billing" };
    dispatch(addressThunks.addAddress(values));
  };

  return (
    <Flex vertical gap={12} style={{ width: "100%", borderRadius: 12 }}>
      <Title>Shipping Address</Title>
      <Paragraph>
        Select the address that matches your card or payment method.
      </Paragraph>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F6F6F6",
          borderRadius: 20,
          padding: 20,
        }}
      >
        <Radio.Group
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <Radio value="billing" className="bold">
            Same as Billing address
          </Radio>
          <Divider />
          <Radio value="new-address" className="bold">
            Use a different shipping address
          </Radio>
        </Radio.Group>
        {selectedAddress && selectedAddress !== "billing" && (
          <div>
            <Title className="mt-20">New Shipping Address</Title>
            <Form
              name="billing-details-form"
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Flex gap={20} justify="space-between">
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                >
                  <Input className="input-md" placeholder="First Name" />
                </Form.Item>

                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                >
                  <Input className="input-md" placeholder="Last Name" />
                </Form.Item>
              </Flex>

              <Form.Item
                label="Country/Region"
                name="country"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please select your country/region!",
                  },
                ]}
              >
                <Select
                  className="select"
                  placeholder="Select country/region"
                  style={{ width: "100%" }}
                >
                  <Select.Option value="USA">USA</Select.Option>
                  <Select.Option value="UK">UK</Select.Option>
                  <Select.Option value="Canada">Canada</Select.Option>
                </Select>
              </Form.Item>

              <Flex gap={20} justify="space-between">
                <Form.Item
                  label="Street"
                  name="street"
                  rules={[
                    { required: true, message: "Please enter your street!" },
                  ]}
                  style={{ width: "100%" }}
                >
                  <Input
                    className="input-md"
                    placeholder="House number and street name"
                  />
                </Form.Item>

                <Form.Item
                  label="Apt, suite, unit"
                  name="appartment"
                  style={{ width: "100%" }}
                >
                  <Input
                    className="input-md"
                    placeholder="apartment, suite, unit, etc. (optional)"
                  />
                </Form.Item>
              </Flex>

              <Form.Item
                label="Adress Line 1"
                name="address_line_1"
                rules={[
                  {
                    required: true,
                    message: "Please add atleast Adress Line 1!",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <Input
                  className="input-md"
                  placeholder="House number and street name"
                />
              </Form.Item>

              <Form.Item
                label="Adress Line 2"
                name="address_line_2"
                style={{ width: "100%" }}
              >
                <Input
                  className="input-md"
                  placeholder="House number and street name"
                />
              </Form.Item>

              <Flex gap={20} justify="space-between">
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                >
                  <Input className="input-md" placeholder="City" />
                </Form.Item>

                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                >
                  <Input className="input-md" placeholder="State" />
                </Form.Item>

                <Form.Item
                  label="Pin Code"
                  name="pincode"
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                >
                  <Input className="input-md" placeholder="Pin Code" />
                </Form.Item>
              </Flex>

              <div style={{ width: "50%" }}>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                >
                  <Input className="input-md" placeholder="Phone" />
                </Form.Item>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Billing Address
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </Flex>
  );
};

const ShippingMethod = () => {
  return (
    <Flex vertical gap={12} style={{ width: "100%", borderRadius: 12 }}>
      <Title>Shipping Method</Title>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F6F6F6",
          borderRadius: 12,
          padding: 20,
        }}
      >
        <Paragraph className="bold">Arrives by Monday, June 7</Paragraph>
        <Divider />
        <Flex align="center" justify="space-between">
          <Paragraph className="bold">Delivery Charges</Paragraph>
          <Paragraph className="bold">$ 5.00</Paragraph>
        </Flex>
        <Paragraph>Additional fess may apply</Paragraph>
      </div>
    </Flex>
  );
};

const CartSummary = () => {
  const cart = useSelector((state) => state.cart);
  const { items, loading } = cart;
  return (
    <Spin spinning={loading} tip="Loading...">
      <Title className="p-20">Order Summary</Title>
      <Flex className="p-20" gap={20} vertical>
        {items?.map((item) => (
          <div
            key={item.productId._id}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <span style={{ width: 90 }}>
              <Image
                src={item.productId.images[0].url}
                alt={item.productId.name}
                width={90}
                height={90}
                style={{ objectFit: "center", borderRadius: "9px" }}
                fallback="https://via.placeholder.com/90x90"
              />
            </span>
            <span style={{ flex: 1 }}>
              <Flex align="center" justify="space-between">
                <Title level={5}>{item.productId.name}</Title>
                <Paragraph>${item.productId.price}</Paragraph>
              </Flex>
            </span>
          </div>
        ))}
      </Flex>
      <PriceDetails useClassName={"p-20"} showPlaceOrder={false} />
    </Spin>
  );
};

export default CheckoutPage;
