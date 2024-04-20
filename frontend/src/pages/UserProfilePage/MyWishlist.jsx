import Title from "antd/es/typography/Title";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Flex, Image, Skeleton, Spin, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { cartThunks } from "../../redux/slices/cartSlice";
import EmptyWishlishImage from "../../assests/images/emptyWishlist.png";
import {
  useWishlistEffect,
  wishlsitThunks,
} from "../../redux/slices/wishlistSlice";

const MyWishlist = () => {
  useWishlistEffect();
  const { data: products, loading } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const { loading: cartLoading } = useSelector((state) => state.cart);

  const handleAddToCartClick = (productId, quantity = 1, price) => {
    dispatch(cartThunks.addToCart({ productId, quantity, price }));
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(wishlsitThunks.removeFromWishlist(productId));
  };

  return (
    <Spin spinning={loading} tip="Loading...">
      <Skeleton loading={loading} active={loading}>
        {products.length > 0 ? (
          <>
            <Title>Wishlist</Title>
            <Flex vertical gap={20}>
              {products.length > 0 &&
                products.map((product) => (
                  <Card
                    key={product?._id}
                    style={{ width: "100%" }}
                    styles={{
                      body: {
                        padding: 12,
                      },
                    }}
                  >
                    <Flex gap={30} align="center">
                      <CloseOutlined
                        style={{ fontSize: 20 }}
                        className="cursor"
                        onClick={() => handleRemoveFromWishlist(product?._id)}
                      />
                      <Image
                        src={product?.images[0].url}
                        width={110}
                        height={110}
                        fallback="https://via.placeholder.com/110"
                      />
                      <Flex
                        align="center"
                        justify="space-between"
                        style={{ flex: 1 }}
                      >
                        <div>
                          <Title level={5} className="bold">
                            <Link to={`/product/${product?._id}`}>
                              {product?.name}
                            </Link>
                          </Title>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: product?.description
                                ?.split(" ")
                                .slice(0, 8)
                                .join(" "),
                            }}
                          />
                          <Typography.Text className="bold">
                            Quantity : 1
                          </Typography.Text>
                        </div>
                        <Flex gap={20} align="center">
                          <Typography.Text className="op-7">
                            {product?.currency === "USD"
                              ? `$${product?.price}`
                              : product?.currency === "PKR"
                              ? `Rs. ${product?.price}`
                              : product?.currency === "EUR"
                              ? `€${product?.price}`
                              : product?.currency === "RON"
                              ? `lei ${product?.price}`
                              : "UNKNOWN CURRENCY"}
                          </Typography.Text>{" "}
                          <Button
                            type="primary"
                            onClick={() =>
                              handleAddToCartClick(
                                product?._id,
                                1,
                                product?.price
                              )
                            }
                            loading={cartLoading}
                          >
                            Add to cart
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                ))}
            </Flex>
          </>
        ) : (
          <EmptyWishlish />
        )}
      </Skeleton>
    </Spin>
  );
};

const EmptyWishlish = () => {
  const navigate = useNavigate();
  return (
    <div className="dis-fcc" style={{ width: "100%", height: "100%" }}>
      <Flex
        vertical
        gap={12}
        style={{ width: "100%", borderRadius: 12 }}
        align="center"
      >
        <Image
          src={EmptyWishlishImage}
          width={170}
          height={170}
          alt="cart is empty"
          fallback="https://via.placeholder.com/170"
          preview={false}
        />
        <Title>Your wishlist is empty.</Title>
        <Typography.Text style={{ textAlign: "center" }}>
          You don’t have any products in the wishlist yet. You will find a lot{" "}
          <br />
          of interesting products on our Shop page.
        </Typography.Text>
        <Button onClick={() => navigate("/shop")} type="primary">
          Continue Shopping
        </Button>
      </Flex>
    </div>
  );
};

export default MyWishlist;
