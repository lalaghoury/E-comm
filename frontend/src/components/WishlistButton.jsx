import { useEffect, useState } from "react";
import { Button, Modal, message } from "antd";
import axios from "axios";
import { HeartFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateWishlistCount } from "../redux/slices/wishlistSlice";

const WishlistButton = ({ wishlists, productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInWishlist, setIsInWishlist] = useState(true);
  const auth = useSelector((state) => state.auth);

  const handleNotLoggedIn = () => {
    Modal.info({
      title: "Please login to continue",
      content: "You need to login to add a product to your wishlist",
      onOk() {
        navigate("/sign-in");
      },
    });
  };

  useEffect(() => {
    setIsInWishlist(wishlists.includes(auth?.user?._id));
  }, [auth?.user?._id, productId, wishlists]);

  const toggleWishlist = async () => {
    if (!auth?.user) {
      handleNotLoggedIn();
      return;
    }
    const action = isInWishlist ? "remove-from-wishlist" : "add-to-wishlist";

    try {
      const endpoint = `http://localhost:5000/api/products/${action}/${productId}`;
      const { data } = await axios.post(endpoint);
      if (data.success) {
        dispatch(updateWishlistCount(data.count));
        message.success(data.message);
        setIsInWishlist(!isInWishlist);
      }
    } catch (error) {
      console.error(error.response.data);
      message.error(error.response.data.message, 3);
    }
  };

  const style = {
    position: "absolute",
    borderRadius: "50%",
    right: "3px",
    top: "3px",
    padding: "5px",
    backgroundColor: "rgb(255, 255, 255)",
    color: isInWishlist ? "#8A33FD" : "rgb(141 141 141)",
  };

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<HeartFilled />}
      onClick={toggleWishlist}
      className="flex justify-center items-center rounded-full bg-white"
      style={style}
    />
  );
};

export default WishlistButton;
