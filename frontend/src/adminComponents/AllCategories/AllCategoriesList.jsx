import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Image, Skeleton, Table, message } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (name) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span style={{ width: 90 }}>
          <Image
            src={name.image}
            alt={name.name}
            width={90}
            height={90}
            style={{ objectFit: "center", borderRadius: "9px" }}
            fallback="https://via.placeholder.com/90x90"
          />
        </span>
        <span style={{ flex: 1 }}>
          <Title style={{ margin: 0 }} level={5}>
            {name.name}
          </Title>
          <p>{name.slug}</p>
        </span>
      </div>
    ),
  },

  {
    title: "Created at",
    dataIndex: "createdAt",
  },

  {
    title: "Total Products",
    dataIndex: "products_no",
    render: (products_no) => <Paragraph>{products_no}</Paragraph>,
  },

  {
    title: "Action",
    dataIndex: "action_id",
    render: (_id) => (
      <Link to={`/dashboard/users/edit-user//${_id}`}>
        <Button type="primary">View Details</Button>
      </Link>
    ),
  },
];

const AllCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/all"
        );
        if (response.data.success) {
          setCategories(response.data.categories.reverse());
        }
        setLoading(false);
      } catch (error) {
        message.error(error.response.data.message);
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div className="categories-list-page">
      <h2>Categories List</h2>

      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          columns={columns}
          dataSource={categories.map((catObj) => ({
            key: catObj._id,
            name: {
              name: catObj.name,
              image: catObj.image,
              slug: catObj.slug,
            },
            createdAt: new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }).format(new Date(catObj.createdAt)),
            action_id: catObj._id,
            products_no: catObj.products.length,
          }))}
        />
      )}
    </div>
  );
};

export default AllCategoriesList;
