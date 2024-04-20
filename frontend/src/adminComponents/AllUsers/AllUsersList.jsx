import React, { useEffect, useState } from "react";
import { Skeleton, Table, Tag, message, Image, Button, Space } from "antd";
import axios from "axios";
import Title from "antd/es/typography/Title";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const handleDelete = (id) => {
  console.log(id);
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (name) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span style={{ width: 60 }}>
          <Image
            src={name.avatar}
            alt={name.name}
            width={50}
            height={50}
            style={{ objectFit: "center", borderRadius: "9px" }}
            fallback="https://via.placeholder.com/50x50"
          />
        </span>
        <span style={{ flex: 1 }}>
          <Title style={{ margin: 0 }} level={5}>
            {name.name}
          </Title>
          <p>{name.email}</p>
        </span>
      </div>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (role) => (
      <>
        {role === "user" ? (
          <Tag color="green" key={role}>
            {role.toUpperCase()}
          </Tag>
        ) : role === "admin" ? (
          <Tag color="geekblue" key={role}>
            {role.toUpperCase()}
          </Tag>
        ) : (
          <Tag color="volcano" key={role}>
            {role.toUpperCase()}
          </Tag>
        )}
      </>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => (
      <>
        {status === "active" ? (
          <Tag color="green" key={status}>
            {status.toUpperCase()}
          </Tag>
        ) : status === "blocked" ? (
          <Tag color="volcano" key={status}>
            {status.toUpperCase()}
          </Tag>
        ) : (
          <Tag color="geekblue" key={status}>
            {status.toUpperCase()}
          </Tag>
        )}
      </>
    ),
  },
  {
    title: "Actions",
    dataIndex: "action_id",
    render: (_id) => (
      <Space>
        <Button icon={<DeleteOutlined />} onClick={() => handleDelete(_id)} />
        <Link to={`/dashboard/users/edit-user//${_id}`}>
          <Button type="primary">
            <EditOutlined />
          </Button>
        </Link>
      </Space>
    ),
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const AllUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/users/all");
        if (response.data.success) {
          setUsers(response.data.users.reverse());
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
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={users.map((userObj) => ({
          key: userObj._id,
          name: {
            name: userObj.name,
            avatar: userObj.avatar,
            email: userObj.email,
          },
          email: userObj.email,
          createdAt: new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(new Date(userObj.createdAt)),
          role: userObj.role,
          status: userObj.status,
          action_id: userObj._id,
        }))}
      />
    </div>
  );
};
export default AllUsersList;
