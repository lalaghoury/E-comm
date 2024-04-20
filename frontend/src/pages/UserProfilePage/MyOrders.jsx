import React from "react";
import AppLayout from "../../config/AppLayout/AppLayout";
import { Button, Card, Divider, Flex, Image, Segmented, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useOrderEffect } from "../../redux/slices/orderSlice";
import { useSelector } from "react-redux";
import Typography from "antd/es/typography/Typography";
import { Link, useNavigate } from "react-router-dom";

const MyOrders = () => {
  useOrderEffect();
  const navigate = useNavigate();
  const { data: orders, loading, error } = useSelector((state) => state.orders);

  return (
    <div>
      <Spin size="large" spinning={loading} tip="Loading...">
        <Title>My Orders</Title>
        <Segmented
          block
          options={["Active", "Cancelled", "Completed"]}
          defaultValue={"Active"}
          onChange={(value) => {
            console.log(value);
          }}
          size={"large"}
        />
        <Divider />
        {orders && orders.length > 0 ? (
          <>
            <Flex vertical>
              {orders.slice(0, 2).map((order) => (
                <>
                  <div
                    className="bg-sec p-5 rounded-lg  mt-2 flex flex-col gap-y-3"
                    key={order._id}
                  >
                    <p>Order no: #{order._id}</p>
                    <Flex justify="space-between" align="center">
                      <div className="flex items-center">
                        <Title className="m-0 px-1" level={4}>
                          Order Date :{" "}
                        </Title>
                        <Typography.Text className="m-0 px-1">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                        </Typography.Text>
                      </div>
                      <div className="flex items-center">
                        <Title className="m-0 px-1" level={4}>
                          Order Status :{" "}
                        </Title>
                        <Typography.Text className="m-0 px-1">
                          {order.status}
                        </Typography.Text>
                      </div>
                    </Flex>
                  </div>
                  <Flex vertical gap={20}>
                    {order?.products.length > 0 &&
                      order?.products.map((product) => (
                        <Card key={product?._id} className="w-full">
                          <Flex gap={30} align="center">
                            {/* <Image
                              src={product?.images[0].url}
                              width={110}
                              height={110}
                              fallback="https://via.placeholder.com/110"
                            /> */}
                            <Flex
                              align="center"
                              justify="space-between"
                              style={{ flex: 1 }}
                            >
                              <div>
                                <Typography.Text className="bold">
                                  Quantity : {product?.quantity}
                                </Typography.Text>
                              </div>
                              <Flex gap={20} align="center">
                                {/* <Typography.Text className="op-7">
                                  {product?.currency === "USD"
                                    ? `$${product?.price}`
                                    : product?.currency === "PKR"
                                    ? `Rs. ${product?.price}`
                                    : product?.currency === "EUR"
                                    ? `€${product?.price}`
                                    : product?.currency === "RON"
                                    ? `lei ${product?.price}`
                                    : "UNKNOWN CURRENCY"}
                                </Typography.Text>{" "} */}
                                <Button
                                  type="primary"
                                  onClick={() =>
                                    navigate(`/profile/orders/${product?._id}`)
                                  }
                                >
                                  View Detail
                                </Button>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Card>
                      ))}
                  </Flex>
                </>
              ))}
            </Flex>
          </>
        ) : (
          <p>No orders found</p>
        )}
      </Spin>
    </div>
  );
};

export default MyOrders;
