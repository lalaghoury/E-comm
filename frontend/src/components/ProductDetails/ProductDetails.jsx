import React, { useEffect, useState } from "react";
import { Typography, Image, Spin, Flex, Breadcrumb, Button, Modal } from "antd";
import AppLayout from "../../config/AppLayout/AppLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { cartThunks } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;

const ProductDetails = ({ authRequired }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [openImage, setOpenImage] = useState(null);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const handleAddToCartClick = () => {
    if (authRequired) {
      dispatch(
        cartThunks.addToCart({
          productId: product._id,
          quantity: 1,
          price: product.price,
        })
      );
    } else if (!auth.user) {
      Modal.info({
        title: "Please login to continue",
        content: "You need to login to add a product to your cart",
        onOk() {
          navigate("/sign-in");
        },
      });
    } else if (!authRequired && auth.user) {
      dispatch(
        cartThunks.addToCart({
          productId: product._id,
          quantity: 1,
          price: product.price,
        })
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        const data = await response.data;
        if (data.success) {
          setProduct(data.product);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <AppLayout>
      <Spin spinning={loading} tip="Loading...">
        <Flex gap={25}>
          <Flex>
            <Flex
              vertical
              gap={16}
              align="center"
              justify="center"
              style={{ width: 200 }}
            >
              {product.images &&
                product.images.map((image) => (
                  <Image
                    key={image.name}
                    src={image.url}
                    alt={image.name}
                    width={70}
                    height={70}
                    preview={false}
                    onClick={() => setOpenImage(image)}
                    style={{
                      cursor: "pointer",
                      borderRadius: 8,
                      border: "2px solid #8A33FD",
                    }}
                  />
                ))}
            </Flex>
            {openImage !== null ? (
              <div style={{ width: 500 }}>
                <Image
                  src={openImage.url}
                  alt={openImage.name}
                  fallback="https://via.placeholder.com/500"
                  width={500}
                  height={500}
                />
              </div>
            ) : (
              <>
                {product.images && (
                  <div style={{ width: 500 }}>
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].name}
                      fallback="https://via.placeholder.com/500"
                      width={500}
                      height={500}
                    />
                  </div>
                )}
              </>
            )}
          </Flex>
          <Flex vertical>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/shop">Shop</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={3}>{product.name}</Title>
            <div
              style={{ marginTop: 20 }}
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
            <Button
              type="primary"
              onClick={handleAddToCartClick}
              loading={loading}
            >
              Add to Cart
            </Button>
          </Flex>
        </Flex>
      </Spin>
    </AppLayout>
  );
};

export default ProductDetails;
