import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Flex,
  Image,
  Modal,
  Spin,
  Typography,
  message,
} from "antd";
import AppLayout from "../../config/AppLayout/AppLayout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CommonHeading from "../../components/CommonHeading/CommonHeading";
import WishlistButton from "../../components/WishlistButton";
import { useSelector, useDispatch } from "react-redux";
import { cartThunks } from "../../redux/slices/cartSlice";

const CardShortHand = ({ text, apiUrl, color, width, height, slice }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(apiUrl);
        if (data.success) {
          {
            slice
              ? setProducts(data.products.slice(0, slice))
              : setProducts(data.products);
          }
        }
      } catch (error) {
        console.error("Error fetching Products:", error.response.data);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slice]);

  return (
    <AppLayout>
      <Spin spinning={loading} loading={loading}>
        <CommonHeading text={text} />
        <Flex gap={10} wrap="wrap" justify="space-between">
          {products.map((product) => (
            <Card
              key={product._id}
              style={{ width: 255, height: 350, backgroundColor: color }}
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
                width={width}
                height={height}
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
                <div key={product._id} style={{ backgroundColor: color }}>
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
          ))}
        </Flex>
      </Spin>
    </AppLayout>
  );
};

export default CardShortHand;
