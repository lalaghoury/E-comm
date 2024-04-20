import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const AlreadyLoggedInRoute = ({ Component, ...props }) => {
  const auth = useSelector((state) => state.auth);
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user && auth?.token) {
      message.info("You are already logged in. No need to do this again.");
      navigate("/");
    } else {
      setOk(true);
    }
  }, [auth, navigate]);

  return ok ? <Component {...props} /> : null;
};

export default AlreadyLoggedInRoute;
