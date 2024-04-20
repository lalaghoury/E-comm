import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AppLayout from "../../config/AppLayout/AppLayout";
import { Button, Card, Flex, Image, Modal, Typography } from "antd";
import WishlistButton from "../WishlistButton";
import { productThunks } from "../../redux/slices/productSlice";
import { cartThunks } from "../../redux/slices/cartSlice";
import Title from "antd/es/typography/Title";

const SearchPage = () => {
  const {
    data: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  const auth = useSelector((state) => state.auth);

  console.log(products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCartClick = (productId, price, quantity = 1) => {
    if (!auth.user) {
      Modal.info({
        title: "Please login to continue",
        content: "You need to login to add a product to your cart",
        onOk() {
          navigate("/sign-in");
        },
      });
    } else if (auth.user) {
      dispatch(
        cartThunks.addToCart({
          productId,
          quantity,
          price,
        })
      );
    }
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");

  useEffect(() => {
    if (searchQuery) {
      dispatch(productThunks.getSearchProducts(searchQuery));
    }
  }, [searchQuery, dispatch]);

  return (
    <AppLayout>
      <Flex gap={20} wrap="wrap" justify="space-between">
        {products &&
          products.length > 0 &&
          products?.map((product) => (
            <>
              <Card
                key={product._id}
                style={{
                  width: 250,
                  height: 350,
                  backgroundColor: "#f5f5f5",
                }}
                styles={{
                  body: {
                    padding: 0,
                    borderRadius: "8px",
                  },
                }}
                hoverable
                bordered={false}
                className="mb-2"
              >
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  width={250}
                  height={220}
                  preview={false}
                  style={{
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <WishlistButton
                  wishlists={product.wishlists}
                  productId={product._id}
                />
                <div className="flex justify-around items-center">
                  <div key={product._id} style={{ backgroundColor: "#f5f5f5" }}>
                    <Typography.Title className="mt-20" level={5}>
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </Typography.Title>
                    {product.currency === "USD" ? (
                      <p>${product.price}</p>
                    ) : product.currency === "PKR" ? (
                      <p>Rs. {product.price}</p>
                    ) : product.currency === "EUR" ? (
                      <p>&euro; {product.price}</p>
                    ) : product.currency === "RON" ? (
                      <p>lei {product.price}</p>
                    ) : (
                      <p>UNKNOWN CURRENCY</p>
                    )}
                  </div>
                  <Button
                    type="primary"
                    onClick={() =>
                      handleAddToCartClick(product._id, product.price)
                    }
                    loading={loading}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </>
          ))}
      </Flex>

      {products.length === 0 && (
        <div className="text-center w-full h-96 dis-fcc">
          <div>
            <Title>No products found</Title>
            <Link to="/">
              <Button type="primary">Go back to home</Button>
            </Link>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default SearchPage;
