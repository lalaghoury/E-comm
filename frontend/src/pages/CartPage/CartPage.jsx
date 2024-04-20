import React, { useState } from "react";
import AppLayout from "../../config/AppLayout/AppLayout";
import {
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Spin,
  Table,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartThunks, useCartEffect } from "../../redux/slices/cartSlice";
import Paragraph from "antd/es/typography/Paragraph";
import emptyCart from "../../assests/images/emptyCart.png";
import { useAddressEffect } from "../../redux/slices/addressSlice";

const CartPage = () => {
  useCartEffect();
  const dispatch = useDispatch();
  const { data: cart, loading } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState("");

  const handleUpdateQuantity = (productId, quantity, price) => {
    dispatch(cartThunks.updateQuantity({ productId, quantity, price }));
  };

  const handleDelete = (itemId) => {
    dispatch(cartThunks.deleteCartItem(itemId));
  };

  const applyCoupon = async () => {
    dispatch(cartThunks.applyCoupon(couponCode));
    setCouponCode("");
  };

  return (
    <AppLayout>
      <Spin spinning={loading} tip="Loading...">
        {cart?.items?.length > 0 ? (
          <>
            <Title>Cart</Title>
            {typeof cart?.items[0]?.productId === "object" && (
              <Table
                dataSource={cart?.items || []}
                pagination={false}
                columns={[
                  {
                    title: "Product Details",
                    dataIndex: "productId",
                    key: "productId._id",
                    render: (productId) => (
                      <Spin spinning={loading}>
                        <div
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
                              src={productId?.images[0]?.url}
                              alt={productId?.name}
                              width={90}
                              height={90}
                              style={{
                                objectFit: "center",
                                borderRadius: "9px",
                              }}
                              fallback="https://via.placeholder.com/90x90"
                            />
                          </span>
                          <span style={{ flex: 1 }}>
                            <Title level={5}>{productId?.name}</Title>
                          </span>
                        </div>
                      </Spin>
                    ),
                  },
                  {
                    title: "Price",
                    dataIndex: "productId",
                    key: "productId._id",
                    render: (productId) => productId?.price,
                  },
                  {
                    title: "Quantity",
                    dataIndex: "quantity",
                    key: "quantity",
                    render: (quantity, record) => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Button
                          style={{ marginRight: 8 }}
                          disabled={quantity === 1}
                          onClick={() =>
                            handleUpdateQuantity(
                              record.productId?._id,
                              quantity - 1,
                              record.productId?.price
                            )
                          }
                        >
                          -
                        </Button>
                        <span>{quantity}</span>
                        <Button
                          style={{ marginLeft: 8 }}
                          onClick={() =>
                            handleUpdateQuantity(
                              record.productId?._id,
                              quantity + 1,
                              record.productId?.price
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    ),
                  },
                  {
                    title: "Shipping",
                    dataIndex: "productId",
                    key: "productId._id",
                    render: (productId) =>
                      productId.shipping === 0 ? "Free" : productId.shipping,
                  },
                  {
                    title: "Remove",
                    dataIndex: "productId",
                    key: "productId._id",
                    render: (_, record) => (
                      <>
                        <Button
                          type="warning"
                          color="#8A33FD"
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(record._id)}
                        />
                      </>
                    ),
                  },
                ]}
              />
            )}

            <Flex
              justify="space-between"
              style={{
                width: "100%",
                background: "#F6F6F6",
              }}
              className={`p-10 ${cart.couponApplied && "place-content-end"}`}
            >
              {!cart.couponApplied && (
                <Flex vertical gap={30} style={{ width: "35%" }}>
                  <Flex vertical gap={10}>
                    <Title level={3}>Discount Codes</Title>
                    <p>Enter your coupon code if you have one.</p>
                  </Flex>
                  <Flex>
                    <Input
                      style={{
                        padding: "0 0 0 10px",
                        border: "1px solid #ccc",
                        borderRadius: 5,
                      }}
                      suffix={
                        <>
                          <Button type="primary" onClick={() => applyCoupon()}>
                            Apply Coupon
                          </Button>
                        </>
                      }
                      placeholder="Enter your coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </Flex>
                </Flex>
              )}
              <PriceDetails useWidth={"33%"} />
            </Flex>
          </>
        ) : (
          !loading && <EmptyCart />
        )}
      </Spin>
    </AppLayout>
  );
};

export const PriceDetails = ({
  useWidth = "100%",
  useClassName = "",
  showPlaceOrder = true,
}) => {
  const { data: cart, loading, error } = useSelector((state) => state.cart);
  useAddressEffect();
  const navigate = useNavigate();

  const shipping = cart?.items?.reduce((acc, item) => {
    const {
      quantity,
      productId: { shipping: productShipping },
    } = item;
    if (typeof productShipping === "number") {
      return acc + quantity * productShipping;
    } else if (Array.isArray(productShipping)) {
      const productShippingTotal = productShipping.reduce(
        (acc, shippingOption) => {
          const { quantity: shippingOptionQuantity, cost: shippingOptionCost } =
            shippingOption;
          return acc + shippingOptionQuantity * shippingOptionCost;
        },
        0
      );
      return acc + quantity * productShippingTotal;
    }
    return acc;
  }, 0);

  return (
    <div style={{ width: useWidth }}>
      <Spin spinning={loading} tip="Loading...">
        <Flex
          justify="center"
          vertical
          align="flex-start"
          className={useClassName}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <Flex align="center" gap={4}>
              <Title level={5} style={{ margin: 0 }}>
                Price
              </Title>
              <Paragraph style={{ margin: 0 }}>
                ( {cart?.items?.length} items )
              </Paragraph>
            </Flex>
            <Title level={5} style={{ margin: 0 }}>
              ${cart?.price}
            </Title>
          </Flex>
          <Divider className="sm-divider" />

          {cart?.savings !== 0 && (
            <Flex
              align="center"
              justify="space-between"
              style={{ width: "100%" }}
            >
              <Title level={5} style={{ margin: 0 }}>
                Savings
              </Title>
              <Title level={5} style={{ margin: 0, marginBottom: 5 }}>
                -${cart?.savings}
              </Title>
            </Flex>
          )}
          <Divider className="sm-divider" />

          <Flex
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <Title level={5} style={{ margin: 0 }}>
              Shipping
            </Title>
            <Title level={5} style={{ margin: 0 }}>
              +${shipping}
            </Title>
          </Flex>
          <Divider className="sm-divider" />

          <Flex
            align="center"
            justify="space-between"
            style={{ width: "100%", marginTop: 25 }}
          >
            <Title level={5} style={{ margin: 0 }}>
              Total
            </Title>
            <Title level={5} style={{ margin: 0 }}>
              ${cart?.total + shipping}
            </Title>
          </Flex>
          <Divider className="sm-divider" />

          {showPlaceOrder && (
            <Button
              style={{ marginTop: 16 }}
              type="primary"
              onClick={() => navigate("/checkout")}
              block
            >
              Proceed to Checkout
            </Button>
          )}
        </Flex>
      </Spin>
    </div>
  );
};

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="dis-fcc">
      <Flex
        vertical
        gap={12}
        style={{ width: "100%", borderRadius: 12 }}
        align="center"
      >
        <Image
          src={emptyCart}
          alt="empty cart img"
          width={450}
          height={300}
          style={{ objectFit: "contain" }}
          preview={false}
        />
        <Title>Your cart is empty and sad :(</Title>
        <Paragraph>Add something to make it happy!</Paragraph>
        <Button onClick={() => navigate("/shop")} type="primary">
          Continue Shopping
        </Button>
      </Flex>
    </div>
  );
};

export default CartPage;
