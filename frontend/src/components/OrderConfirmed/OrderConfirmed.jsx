import React from "react";
import "./OrderConfirmed.scss";
import vector from "../../assests/images/vector.svg";
import vector1 from "../../assests/images/vector-1.svg";
import vector2 from "../../assests/images/vector-2.svg";
import vector3 from "../../assests/images/vector-3.svg";
import vector4 from "../../assests/images/vector-4.svg";
import vector5 from "../../assests/images/vector-5.svg";
import vector6 from "../../assests/images/vector-6.svg";
import vector7 from "../../assests/images/vector-7.svg";
import vector8 from "../../assests/images/vector-8.svg";
import vector9 from "../../assests/images/vector-9.svg";
import vector10 from "../../assests/images/vector-10.svg";
import group from "../../assests/images/group.svg";
import vector11 from "../../assests/images/vector-11.svg";
import vector12 from "../../assests/images/vector-12.svg";
import vector13 from "../../assests/images/vector-13.svg";
import vector14 from "../../assests/images/vector-14.svg";
import vector15 from "../../assests/images/vector-15.svg";
import vector16 from "../../assests/images/vector-16.svg";
import vector17 from "../../assests/images/vector-17.svg";
import vector18 from "../../assests/images/vector-18.svg";
import vector19 from "../../assests/images/vector-19.svg";
import vector20 from "../../assests/images/vector-20.svg";
import vector21 from "../../assests/images/vector-21.svg";
import vector22 from "../../assests/images/vector-22.svg";
import vector23 from "../../assests/images/vector-23.svg";
import vector24 from "../../assests/images/vector-24.svg";
import vector25 from "../../assests/images/vector-25.svg";
import vector26 from "../../assests/images/vector-26.svg";
import vector27 from "../../assests/images/vector-27.svg";
import vector28 from "../../assests/images/vector-28.svg";
import vector29 from "../../assests/images/vector-29.svg";
import vector30 from "../../assests/images/vector-30.svg";
import vector31 from "../../assests/images/vector-31.svg";
import vector32 from "../../assests/images/vector-32.svg";
import vector33 from "../../assests/images/vector-33.svg";
import vector34 from "../../assests/images/vector-34.svg";
import vector35 from "../../assests/images/vector-35.svg";
import AppLayout from "../../config/AppLayout/AppLayout";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/shop`);
  };
  return (
    <AppLayout>
      <div className="order-confirmed-1">
        <section className="frame-parent">
          <div className="vector-parent">
            <img className="vector-icon" alt="abc" src={vector} />
            <img className="vector-icon1" alt="" src={vector1} />
            <img className="vector-icon2" alt="" src={vector2} />
            <img className="vector-icon3" alt="" src={vector3} />
            <img className="vector-icon4" alt="" src={vector4} />
            <img className="vector-icon5" alt="" src={vector5} />
            <img className="vector-icon6" alt="" src={vector6} />
            <img className="vector-icon7" alt="" src={vector7} />
            <img className="vector-icon8" alt="" src={vector8} />
            <img className="vector-icon9" alt="" src={vector9} />
            <div className="vector-group">
              <img className="vector-icon10" alt="" src={vector10} />
              <img className="group-icon" alt="" src={group} />
              <img className="vector-icon11" alt="" src={vector11} />
              <img className="vector-icon12" alt="" src={vector12} />
              <img className="vector-icon13" alt="" src={vector13} />
              <img
                className="vector-icon14"
                loading="lazy"
                alt=""
                src={vector14}
              />
              <img className="vector-icon15" alt="" src={vector15} />
            </div>
            <img className="vector-icon16" alt="" src={vector16} />
            <img className="vector-icon17" alt="" src={vector17} />
            <div className="vector-container">
              <img className="vector-icon18" alt="" src={vector18} />
              <img className="vector-icon19" alt="" src={vector19} />
              <img className="vector-icon20" alt="" src={vector20} />
              <img className="vector-icon21" alt="" src={vector21} />
              <img className="vector-icon22" alt="" src={vector22} />
            </div>
            <div className="frame-div">
              <img className="vector-icon23" alt="" src={vector23} />
              <img className="vector-icon24" alt="" src={vector24} />
            </div>
          </div>
          <div className="frame-group">
            <div className="vector-parent1">
              <img className="vector-icon25" alt="" src={vector25} />
              <div className="button-instance">
                <img className="vector-icon26" alt="" src={vector26} />
                <img
                  className="vector-icon27"
                  loading="lazy"
                  alt=""
                  src={vector27}
                />
              </div>
              <div className="vector-parent2">
                <img className="vector-icon28" alt="" src={vector28} />
                <img
                  className="vector-icon29"
                  loading="lazy"
                  alt=""
                  src={vector29}
                />
              </div>
              <img
                className="vector-icon30"
                loading="lazy"
                alt=""
                src={vector30}
              />
              <img
                className="vector-icon31"
                loading="lazy"
                alt=""
                src={vector31}
              />
              <img
                className="vector-icon32"
                loading="lazy"
                alt=""
                src={vector32}
              />
              <img
                className="vector-icon33"
                loading="lazy"
                alt=""
                src={vector33}
              />
              <img
                className="vector-icon34"
                loading="lazy"
                alt=""
                src={vector34}
              />
              <img
                className="vector-icon35"
                loading="lazy"
                alt=""
                src={vector35}
              />
            </div>
            <div className="your-order-is-confirmed-wrapper">
              <h2 className="your-order-is-container">
                <p className="your-order-is">Your Order is</p>
                <p className="confirmed">Confirmed</p>
              </h2>
            </div>
            {/* <button className="button"> */}
            <Button
              className="button dis-fcc"
              type="primary"
              onClick={handleClick}
            >
              Continue Shopping
            </Button>
            {/* </button> */}
          </div>
        </section>
        <section className="confirmed-order" />
      </div>
    </AppLayout>
  );
};

export default OrderConfirmed;
