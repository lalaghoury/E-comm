import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import { useSelector } from "react-redux";
import LogoImg from "../../assests/images/logo.svg";
import {
  SearchOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Input, Select, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuthEffect } from "../../redux/slices/authSlice";
import { cartThunks } from "../../redux/slices/cartSlice";
import {
  useWishlistEffect,
  wishlsitThunks,
} from "../../redux/slices/wishlistSlice";
import { useDispatch } from "react-redux";

export const Logo = () => {
  return (
    <div className="logo">
      <Link to={"/"}>
        <img src={LogoImg} alt="asdsa" />
      </Link>
    </div>
  );
};

export const Links = () => {
  return (
    <div className="nav-links dis-fcc">
      <Link className="hov-scale" to={"/shop"}>
        Shop
      </Link>
      <Link className="hov-scale" to={"/men"}>
        Men
      </Link>
      <Link className="hov-scale" to={"/women"}>
        Womens
      </Link>
      <Link className="hov-scale" to={"/combos"}>
        Combos
      </Link>
      <Link className="hov-scale" to={"/joggers"}>
        Joggers
      </Link>
    </div>
  );
};

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSearchIconClick = () => {
    setSearchTerm("");
    setShowSearch(true);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setShowSearch(false);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  return (
    <div
      className="search"
      style={{ width: showSearch && "400px" }}
      ref={searchRef}
    >
      {showSearch ? (
        <>
          <Input
            type="text"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            className="search-input"
            onChange={handleInputChange}
            onPressEnter={handleSearch}
            autoFocus
          />
          <Button
            className="disable-hover text-primary bold"
            onClick={handleSearch}
          >
            Search
          </Button>
        </>
      ) : (
        <Button
          onClick={handleSearchIconClick}
          type="text"
          className="bg-sec"
          block
          icon={<SearchOutlined />}
        >
          Search
        </Button>
      )}
    </div>
  );
};

export const SelectLanguage = () => {
  const { Option } = Select;
  const languages = [
    {
      value: "en-US",
      label: "English (united States)",
    },
    {
      value: "es-ES",
      label: "Spanish (Espana)",
    },
  ];
  return (
    <Select
      defaultValue={"en-US"}
      style={{ width: 206 }}
      onChange={(value) => console.log(value)}
    >
      {languages.map((lang) => (
        <Option value={lang.value} key={lang.value}>
          {lang.label}
        </Option>
      ))}
    </Select>
  );
};

export const Buttons = () => {
  useAuthEffect();
  useWishlistEffect("count");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.data);
  const { count } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      // dispatch(wishlsitThunks.fetchWishlistCount());
      dispatch(cartThunks.getCount());
    }
  }, [dispatch]);

  return (
    <>
      {auth.user ? (
        <div className="nav-btn-login">
          <Space size={12} align="center">
            {auth?.user.role === "admin" && auth?.user.status === "active" && (
              <Button
                className="dis-fcc"
                onClick={() => navigate("/dashboard")}
              >
                <DashboardOutlined />
              </Button>
            )}

            <Button
              className="dis-fcc"
              onClick={() => navigate("/profile/my-wishlist")}
            >
              <Badge count={count || 0} showZero>
                <Avatar className="" icon={<HeartOutlined />} />
              </Badge>
            </Button>

            <Button
              className="dis-fcc"
              onClick={() => navigate("/profile/my-info")}
            >
              <UserOutlined />
            </Button>

            <Button className="dis-fcc" onClick={() => navigate("/cart")}>
              <Badge count={cart?.items?.length || 0} showZero>
                <Avatar icon={<ShoppingCartOutlined />} />
              </Badge>
            </Button>
          </Space>
        </div>
      ) : (
        <div className="nav-btns">
          <Space size={12} align="center">
            <Link to="/sign-in">
              <Button type="primary">Login</Button>
            </Link>
            <Link to="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </Space>
        </div>
      )}
    </>
  );
};

export const ToggleTheme = ({ changeTheme }) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, [changeTheme]);

  return (
    <Button
      onClick={changeTheme}
      icon={theme === "light" ? <SunOutlined /> : <MoonOutlined />}
    />
  );
};
