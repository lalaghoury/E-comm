import { useCallback, useEffect, useState } from "react";
import { ConfigProvider, message } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import {
  Header,
  SignUpPage,
  SignInPage,
  HomePage,
  ForgotPasswordPage,
  NewPasswordPage,
  PageNotFound,
  AdminDashboard,
  AdminLayout,
  AllUsersList,
  AllProductsList,
  AllCategoriesList,
  AllOrdersList,
  AddCategory,
  AddProduct,
  EditProduct,
  Shop,
  ProductDetails,
  CartPage,
  PrivateRoute,
  CheckoutPage,
  OrderConfirmed,
  UserProfileLayout,
  MyOrders,
  MyWishlist,
  MyInfo,
  SearchPage,
  LoginSuccess,
  Test,
} from "./comp";
import IsAdmin from "./Routes/IsAdmin";

function App() {
  axios.defaults.withCredentials = true;
  const [theme, setTheme] = useState("");
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    const url = window.location.pathname;
    setIsDashboard(url.includes("dashboard"));
  }, [window.location.pathname]);

  useEffect(() => {
    const url = window.location.pathname;
    setIsDashboard(url.includes("dashboard"));
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme);
    } else if (!storedTheme) {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, []);

  const changeTheme = useCallback(() => {
    const url = window.location.pathname;
    setIsDashboard(url.includes("dashboard"));
    const newTheme = theme === "light" ? "dark" : "light";
    message.loading({
      content: `Switching to ${newTheme} mode...`,
      key: "theme",
    });
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setTimeout(() => {
      message.success({
        content: `Switched to ${newTheme} mode`,
        key: "theme",
        duration: 2,
      });
    }, 800);
  }, [theme]);

  const themeConfig = {
    light: {
      token: {
        colorLink: "#777373",
        colorTextSecondary: "#000000c0",
        colorBorder: "#4e2727",
        colorBorderSecondary: "#aa9999d8",
        wireframe: false,
        colorPrimaryBgHover: "#8e9295",
        colorBgElevated: "#d2d2d238",
        colorPrimaryBg: "#cbd9e4",
        colorPrimaryHover: "#722ed1",
        colorPrimary: "#8e4ee9",
        colorInfo: "#8e4ee9",
        colorBgBase: "#ffffff67",
        fontSize: 16,
      },
      components: {
        Button: {
          algorithm: true,
          colorPrimaryHover: "rgb(114, 37, 223)",
          defaultBorderColor: "rgb(60, 66, 66)",
          borderColorDisabled: "rgb(60, 66, 66)",
          defaultColor: "#722ED1",
          paddingInline: 24,
          controlHeight: 45,
          paddingBlock: 10,
        },
        Divider: {
          fontFamily: "roboto",
        },
        Anchor: {
          colorPrimary: "rgb(0, 0, 0)",
        },
        Breadcrumb: {
          itemColor: "rgb(0, 0, 0)",
          lastItemColor: "rgb(0, 0, 0)",
          linkHoverColor: "rgb(0, 0, 0)",
          colorText: "rgb(0, 0, 0)",
          linkColor: "rgba(0, 0, 0, 0.6)",
        },
      },
      algorithm: [],
    },
    dark: {
      token: {
        colorBorder: "#4e2727",
        colorBorderSecondary: "#000000d8",
        wireframe: false,
        colorPrimaryBgHover: "#8e9295",
        colorPrimaryBg: "#cbd9e4",
        colorPrimaryHover: "#722ed1",
        fontSize: 16,
        colorPrimary: "#8e4ee9",
        colorInfo: "#8e4ee9",
        colorBgSpotlight: "#201d1d",
        colorBgElevated: "#00000098",
      },
      components: {
        Button: {
          defaultBorderColor: "rgb(60, 66, 66)",
          borderColorDisabled: "rgb(60, 66, 66)",
          colorBgContainer: "rgba(179, 175, 175, 0.53)",
          colorTextLightSolid: "rgb(255, 255, 255)",
          colorText: "rgb(0, 0, 0)",
          defaultBg: "rgb(0, 0, 0)",
          defaultColor: "rgb(255, 255, 255)",
          defaultActiveBorderColor: "rgba(0, 0, 0, 0.6)",
          defaultHoverBg: "rgb(255, 255, 255)",
          defaultHoverBorderColor: "rgba(0, 0, 0, 0.59)",
          defaultHoverColor: "rgb(0, 0, 0)",
          paddingInline: 24,
          controlHeight: 45,
          paddingBlock: 10,
        },
        Divider: {
          fontFamily: "roboto",
        },
        Anchor: {
          colorPrimary: "rgb(0, 0, 0)",
        },
        Breadcrumb: {
          itemColor: "rgb(0, 0, 0)",
          lastItemColor: "rgb(0, 0, 0)",
          linkHoverColor: "rgb(0, 0, 0)",
          colorText: "rgb(0, 0, 0)",
          linkColor: "rgba(0, 0, 0, 0.6)",
        },
        Select: {
          optionActiveBg: "rgba(0, 0, 0, 0.58)",
          optionSelectedBg: "rgb(255, 255, 255)",
          colorBgElevated: "rgba(0, 0, 0, 0.8)",
          selectorBg: "rgb(0, 0, 0)",
          colorText: "rgb(255, 255, 255)",
          optionSelectedColor: "rgb(0, 0, 0)",
          colorTextPlaceholder: "rgb(255, 255, 255)",
          colorTextQuaternary: "rgb(255, 255, 255)",
        },
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig[theme]}>
      {!isDashboard && <Header changeTheme={changeTheme} />}
      <Routes>
        <Route path="/shop" element={<Shop changeTheme={changeTheme} />} />
        <Route path="/" element={<HomePage changeTheme={changeTheme} />} />
        <Route path="/auth/login/success" element={<LoginSuccess />} />
        <Route
          path="/product/:productId"
          element={
            <ProductDetails changeTheme={changeTheme} authRequired={false} />
          }
        />

        <Route
          path="/sign-up"
          element={<SignUpPage changeTheme={changeTheme} />}
        />

        <Route
          path="/sign-in"
          element={<SignInPage changeTheme={changeTheme} />}
        />

        <Route
          path="/search"
          element={<SearchPage changeTheme={changeTheme} />}
        />

        {/* User Private Routes */}

        <Route path="/" element={<PrivateRoute changeTheme={changeTheme} />}>
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage changeTheme={changeTheme} />}
          />

          <Route path="/test" element={<Test changeTheme={changeTheme} />} />

          <Route
            path="/cart"
            element={<CartPage changeTheme={changeTheme} />}
          />

          <Route
            path="/profile"
            element={<UserProfileLayout changeTheme={changeTheme} />}
          >
            <Route
              path="/profile/my-orders"
              element={<MyOrders changeTheme={changeTheme} />}
            />
            <Route
              path="/profile/my-wishlist"
              element={<MyWishlist changeTheme={changeTheme} />}
            />
            <Route
              path="/profile/my-info"
              element={<MyInfo changeTheme={changeTheme} />}
            />
          </Route>

          <Route
            path="/reset-password/:resetToken"
            element={<NewPasswordPage changeTheme={changeTheme} />}
          />

          <Route
            path="/checkout"
            element={<CheckoutPage changeTheme={changeTheme} />}
          />

          <Route
            path="/order-confirmed"
            element={<OrderConfirmed changeTheme={changeTheme} />}
          />
        </Route>

        {/* Admin Private Routes */}

        <Route path="/" element={<IsAdmin changeTheme={changeTheme} />}>
          <Route
            path="dashboard"
            element={<AdminLayout changeTheme={changeTheme} />}
          >
            <Route
              index
              element={<AdminDashboard changeTheme={changeTheme} />}
            />
            <Route
              path="orders/orders-list"
              element={<AllOrdersList changeTheme={changeTheme} />}
            />
            <Route
              path="orders/order-details/:id"
              element={<AllOrdersList changeTheme={changeTheme} />}
            />
            <Route
              path="orders/edit-order/:id"
              element={<AllOrdersList changeTheme={changeTheme} />}
            />

            <Route
              path="users/all-users-list"
              element={<AllUsersList changeTheme={changeTheme} />}
            />
            <Route
              path="users/add-user"
              element={<AllUsersList changeTheme={changeTheme} />}
            />
            <Route
              path="users/details/:id"
              element={<AllUsersList changeTheme={changeTheme} />}
            />
            <Route
              path="products/products-list"
              element={<AllProductsList changeTheme={changeTheme} />}
            />
            <Route
              path="products/add-product"
              element={<AddProduct changeTheme={changeTheme} />}
            />
            <Route
              path="products/edit-product/:id"
              element={<EditProduct changeTheme={changeTheme} />}
            />
            <Route
              path="categories/categories-list"
              element={<AllCategoriesList changeTheme={changeTheme} />}
            />
            <Route
              path="categories/add-category"
              element={<AddCategory changeTheme={changeTheme} />}
            />
          </Route>
        </Route>

        {/* Page Not Found */}
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
