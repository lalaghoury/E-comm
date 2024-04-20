import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Input,
  Slider,
  Typography,
  Spin,
  Divider,
  Flex,
  Menu,
  Image,
  Tooltip,
  Button,
  Tag,
  Modal,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../config/AppLayout/AppLayout";
import "./Shop.scss";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import WishlistButton from "../WishlistButton";
import { useDispatch, useSelector } from "react-redux";
import { cartThunks } from "../../redux/slices/cartSlice";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [typesNames, setTypesNames] = useState([]);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:5000/api/categories/names"
        );
        setCategoriesNames(res.data.categoriesNames);
        const res2 = await axios.get("http://localhost:5000/api/types/names");
        setTypesNames(res2.data.typesNames);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/filter",
          {
            params: {
              minPrice,
              maxPrice,
              category,
              type,
              tags,
            },
          }
        );
        if (response.data.success) {
          setProducts(response.data.products);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [minPrice, maxPrice, category, type, tags]);

  const handlePriceRangeChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const generateCategoriesItems = () => {
    return categoriesNames.map((categoryObj) => (
      <Menu.Item key={categoryObj._id} icon={<MailOutlined />}>
        {categoryObj.name}
      </Menu.Item>
    ));
  };

  const generateTypesItems = () => {
    return typesNames.map((typeObj) => (
      <Menu.Item key={typeObj._id} icon={<MailOutlined />}>
        {typeObj.name}
      </Menu.Item>
    ));
  };

  const handleTypeClick = (event) => {
    setType(event.key);
  };

  const handleCategoryClick = (event) => {
    setCategory(event.key);
  };

  const handleReset = () => {
    setCategory("");
    setType("");
    setTags([]);
    setMinPrice(0);
    setMaxPrice(1000);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleTagClose = (removedTag) => {
    const updatedTags = tags.filter((tag) => tag !== removedTag);
    setTags(updatedTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

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

  return (
    <AppLayout>
      <Spin spinning={loading} tip="Loading...">
        <Flex gap={50} className="shop-container">
          <Flex style={{ width: "25%" }} justify="space-between" vertical>
            <Flex justify="space-between" align="center">
              {" "}
              <Flex gap={10} align="center">
                <Typography.Title level={4}>Filters</Typography.Title>
                <Tooltip title="Filters">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="20"
                    viewBox="0 0 17 20"
                    fill="none"
                  >
                    <path
                      d="M2.83333 6.33333L2.83333 1.75M2.83333 18.25L2.83333 10M13.8333 18.25L13.8333 10M8.33333 18.25V13.6667M8.33333 10V1.75M13.8333 6.33333L13.8333 1.75M1 6.33333H4.66667M6.5 13.6667H10.1667M12 6.33333L15.6667 6.33333"
                      stroke="#807D7E"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </Tooltip>
              </Flex>
              <Typography.Text>
                <Tooltip title="Reset all filters">
                  <Button type="link" onClick={handleReset}>
                    Reset
                  </Button>
                </Tooltip>
              </Typography.Text>
            </Flex>
            <Divider />

            <Menu onClick={handleCategoryClick} mode="inline">
              <SubMenu
                key="categories"
                icon={<MailOutlined />}
                title="Categories"
              >
                {generateCategoriesItems()}
              </SubMenu>
            </Menu>

            <Menu onClick={handleTypeClick} mode="inline">
              <SubMenu key="types" icon={<AppstoreOutlined />} title="Types">
                {generateTypesItems()}
              </SubMenu>
            </Menu>
            <Divider />

            <Typography.Title level={5}>Price Range</Typography.Title>
            <Slider
              range
              min={0}
              max={1000}
              value={[minPrice, maxPrice]}
              onChange={handlePriceRangeChange}
            />

            <Flex align="center" gap={10}>
              <Flex align="center" gap={5} vertical>
                <Typography.Text>Min: </Typography.Text>
                <Input
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="min price"
                  type="number"
                  min={minPrice}
                  max={1000}
                  step="10"
                />
              </Flex>
              <Flex align="center" gap={5} vertical>
                <Typography.Text>Max: </Typography.Text>
                <Input
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="max price"
                  type="number"
                  min={minPrice}
                  max={1000}
                  step="10"
                />
              </Flex>
            </Flex>
            <Divider />

            <Typography.Title level={5}>Tags</Typography.Title>
            <Input
              type="text"
              size="large"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
              style={{ width: 200, marginBottom: 10 }}
            />
            <div>
              {tags?.map((tag) => (
                <Tag key={tag} closable onClose={() => handleTagClose(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </Flex>

          <Flex
            style={{ width: "75%" }}
            gap={20}
            wrap="wrap"
            justify="space-between"
          >
            {products.map((product) => (
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
                    <div
                      key={product._id}
                      style={{ backgroundColor: "#f5f5f5" }}
                    >
                      <Typography.Title className="mt-20" level={5}>
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
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
        </Flex>
      </Spin>
    </AppLayout>
  );
};

export default Shop;
