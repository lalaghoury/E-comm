import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { signout } from "../redux/slices/authSlice";

export default function PrivateRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user: authUser, verified } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/verify"
        );
        if (data.success) {
          setLoading(false);
          dispatch(signin({ user: data.user }));
          return;
        }
      } catch (error) {
        console.error("Verification failed:", error.response.data.message);
        dispatch(signout());
        navigate("sign-in", { replace: true });
      }
    };
    if (authUser) {
      verifyLogin();
    }
  }, [navigate]);

  if (loading) {
    return (
      <Spin
        style={{
          marginTop: "200px",
          height: "calc(100vh - 200px)",
          width: "100vw",
        }}
      />
    );
  }

  return verified && <Outlet />;
}
