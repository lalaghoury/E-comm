import { Button, Image, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AllProductsList.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";

const AllProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/products/all"
      );
      if (response.data.success) {
        setProducts(response.data.products);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <div className="all-products-list">
      <Table
        dataSource={products.map((product) => ({
          key: product._id,
          name: {
            name: product.name,
            images: product.images,
            category: product.category,
          },
          sku: product.sku,
          quantity: product.quantity,
          price: { price: product.price, currency: product.currency },
          _id: product._id,
        }))}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            render: (name) => (
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
                  {" "}
                  <Image
                    src={name.images[0].url}
                    alt={name.name}
                    width={90}
                    height={90}
                    style={{ objectFit: "center", borderRadius: "9px" }}
                    fallback="https://via.placeholder.com/90x90"
                  />
                </span>
                <span style={{ flex: 1 }}>
                  {" "}
                  <Title level={5}>{name.name}</Title>
                  <p>in {name.category}</p>
                </span>
              </div>
            ),
          },
          {
            title: "SKU",
            dataIndex: "sku",
            render: (sku) => {
              return sku;
            },
          },
          {
            title: "Stock",
            dataIndex: "quantity",
            render: (quantity) => {
              return quantity + " " + "units";
            },
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (price) => {
              return (
                <>
                  {" "}
                  {price.currency === "USD" ? (
                    <p>$ {price.price}</p>
                  ) : price.currency === "PKR" ? (
                    <p>Rs. {price.price}</p>
                  ) : price.currency === "EUR" ? (
                    <p>&euro; {price.price}</p>
                  ) : price.currency === "RON" ? (
                    <p>lei {price.price}</p>
                  ) : (
                    <p>UNKNOWN CURRENCY</p>
                  )}
                </>
              );
            },
          },
          {
            title: "Actions",
            dataIndex: "_id",
            render: (_id) => (
              <Space>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(_id)}
                />
                <Link to={`/dashboard/products/edit-product/${_id}`}>
                  <Button type="primary">
                    <EditOutlined />
                  </Button>
                </Link>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
};

export default AllProductsList;
