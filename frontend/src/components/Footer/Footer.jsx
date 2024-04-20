import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { Divider, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import App_Store_Badge_Svg from "../../assests/images/app-store-badge.svg";
import Goolge_Play_Badge_Svg from "../../assests/images/google-play-badge.svg";
import { Collapse } from "antd";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: "1",
    label: <h1>Ppular Categories</h1>,
    children: <p>{text}</p>,
  },
];

const FooterUser = () => {
  return (
    <div className="footer-page">
      {/* Stage 1 */}
      <div className="footer-stage-1">
        {/* Footer Stage 1 Part 1 */}
        <div className="footer-part-1">
          <h1>Need Help</h1>
          <Link>Track Order</Link>
          <Link>Returns & Refunds</Link>
          <Link>FAQ's</Link>
          <Link>Career</Link>
        </div>
        {/* Footer Stage 1 Part 2 */}
        <div className="footer-part-1">
          <h1>Company</h1>
          <Link>About Us</Link>
          <Link>euphoria Blog</Link>
          <Link>euphoriastan</Link>
          <Link>Collaboration</Link>
          <Link>Media</Link>
        </div>
        {/* Footer Stage 1 Part 3 */}
        <div className="footer-part-1">
          <h1>More Info</h1>
          <Link>Term and Conditions</Link>
          <Link>Privacy Policy</Link>
          <Link>Shipping Policy</Link>
          <Link>Sitemap</Link>
        </div>
        {/* Footer Stage 1 Part 4 */}
        <div className="footer-part-1">
          <h1>Location</h1>
          <Link>support@euphoria.in</Link>
          <Link>Eklingpura Chouraha, Ahmedabad Main Road</Link>
          <Link>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</Link>
        </div>
      </div>
      {/* Stage 2 */}
      <div className="footer-stage-2">
        {/* Footer Stage 2 Part 1 */}
        <h1>Download The App </h1>
        <div className="footer-stage-2-part-1">
          <Space size={8}>
            {/* Icon Facebook */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
            >
              <rect width="37.024" height="37.024" rx="10.68" fill="#F6F6F6" />
              <path
                d="M22.4368 19.2686L22.9311 16.0472H19.8401V13.9568C19.8401 13.0755 20.2719 12.2164 21.6563 12.2164H23.0615V9.47374C23.0615 9.47374 21.7863 9.2561 20.5671 9.2561C18.0215 9.2561 16.3577 10.799 16.3577 13.5921V16.0472H13.5281V19.2686H16.3577V27.0561H19.8401V19.2686H22.4368Z"
                fill="#2A2F2F"
              />
            </svg>
            {/* Icon Instagram */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
            >
              <rect
                x="-0.00805664"
                y="0.000244141"
                width="37.024"
                height="37.024"
                rx="10.68"
                fill="#F6F6F6"
              />
              <path
                d="M18.4657 14.4757C16.2546 14.4757 14.4711 16.2592 14.4711 18.4703C14.4711 20.6814 16.2546 22.4649 18.4657 22.4649C20.6768 22.4649 22.4603 20.6814 22.4603 18.4703C22.4603 16.2592 20.6768 14.4757 18.4657 14.4757ZM18.4657 21.0673C17.0368 21.0673 15.8687 19.9026 15.8687 18.4703C15.8687 17.0379 17.0334 15.8733 18.4657 15.8733C19.898 15.8733 21.0627 17.0379 21.0627 18.4703C21.0627 19.9026 19.8946 21.0673 18.4657 21.0673ZM23.5554 14.3123C23.5554 14.8303 23.1382 15.244 22.6237 15.244C22.1057 15.244 21.692 14.8268 21.692 14.3123C21.692 13.7978 22.1091 13.3806 22.6237 13.3806C23.1382 13.3806 23.5554 13.7978 23.5554 14.3123ZM26.2011 15.2579C26.142 14.0099 25.8569 12.9043 24.9425 11.9934C24.0317 11.0826 22.9261 10.7975 21.678 10.7349C20.3917 10.6619 16.5362 10.6619 15.2499 10.7349C14.0053 10.794 12.8997 11.0791 11.9854 11.99C11.0711 12.9008 10.7895 14.0064 10.7269 15.2545C10.6539 16.5408 10.6539 20.3963 10.7269 21.6826C10.786 22.9307 11.0711 24.0363 11.9854 24.9471C12.8997 25.858 14.0018 26.1431 15.2499 26.2056C16.5362 26.2786 20.3917 26.2786 21.678 26.2056C22.9261 26.1465 24.0317 25.8615 24.9425 24.9471C25.8534 24.0363 26.1385 22.9307 26.2011 21.6826C26.2741 20.3963 26.2741 16.5443 26.2011 15.2579ZM24.5393 23.0628C24.2681 23.7442 23.7431 24.2692 23.0582 24.5438C22.0327 24.9506 19.5991 24.8567 18.4657 24.8567C17.3323 24.8567 14.8953 24.9471 13.8732 24.5438C13.1918 24.2727 12.6668 23.7477 12.3921 23.0628C11.9854 22.0372 12.0793 19.6036 12.0793 18.4703C12.0793 17.3369 11.9889 14.8999 12.3921 13.8777C12.6633 13.1963 13.1883 12.6714 13.8732 12.3967C14.8988 11.99 17.3323 12.0838 18.4657 12.0838C19.5991 12.0838 22.0361 11.9934 23.0582 12.3967C23.7396 12.6679 24.2646 13.1929 24.5393 13.8777C24.946 14.9033 24.8521 17.3369 24.8521 18.4703C24.8521 19.6036 24.946 22.0407 24.5393 23.0628Z"
                fill="#2A2F2F"
              />
            </svg>
            {/* Icon Twitter */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
            >
              <rect
                x="0.983887"
                y="0.000244141"
                width="37.024"
                height="37.024"
                rx="10.68"
                fill="#F6F6F6"
              />
              <path
                d="M28.3463 14.995C28.3576 15.1531 28.3576 15.3113 28.3576 15.4694C28.3576 20.2921 24.6869 25.8489 17.978 25.8489C15.9111 25.8489 13.9911 25.2503 12.376 24.2113C12.6696 24.2451 12.952 24.2564 13.2569 24.2564C14.9624 24.2564 16.5323 23.6804 17.786 22.6978C16.1822 22.6639 14.8381 21.6135 14.3751 20.1678C14.601 20.2017 14.8268 20.2243 15.0641 20.2243C15.3916 20.2243 15.7191 20.1791 16.0241 20.1001C14.3525 19.7612 13.0988 18.293 13.0988 16.5197V16.4746C13.5844 16.7456 14.1492 16.9151 14.7478 16.9376C13.7651 16.2825 13.1214 15.1644 13.1214 13.8994C13.1214 13.2218 13.3021 12.6006 13.6183 12.0584C15.4141 14.2721 18.1135 15.7178 21.1404 15.876C21.0839 15.6049 21.05 15.3226 21.05 15.0402C21.05 13.0298 22.6764 11.3921 24.6981 11.3921C25.7485 11.3921 26.6972 11.8326 27.3636 12.5441C28.1881 12.386 28.9787 12.081 29.679 11.6632C29.4079 12.5103 28.8319 13.2218 28.0752 13.6735C28.8093 13.5945 29.5209 13.3912 30.1759 13.1089C29.679 13.8317 29.0578 14.4754 28.3463 14.995Z"
                fill="#2A2F2F"
              />
            </svg>
            {/* Icon Linkedin */}
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.976074"
                y="0.000244141"
                width="37.024"
                height="37.024"
                rx="10.68"
                fill="#F6F6F6"
              />
              <path
                d="M15.8389 15.2443V24.2722H13.4276V15.2443H15.8389ZM13.2774 12.8913C13.2774 12.5409 13.3998 12.2517 13.6445 12.0236C13.8893 11.7955 14.2175 11.6815 14.6291 11.6815C15.0351 11.6815 15.3605 11.7955 15.6053 12.0236C15.8556 12.2517 15.9808 12.5409 15.9808 12.8913C15.9808 13.2418 15.8556 13.531 15.6053 13.7591C15.3605 13.9872 15.0351 14.1012 14.6291 14.1012C14.2175 14.1012 13.8893 13.9872 13.6445 13.7591C13.3998 13.531 13.2774 13.2418 13.2774 12.8913ZM20.5194 17.1717V24.2722H18.1164V15.2443H20.3692L20.5194 17.1717ZM20.169 19.4412H19.5182C19.5182 18.7737 19.6044 18.1729 19.7768 17.6389C19.9493 17.0994 20.1912 16.6405 20.5027 16.2622C20.8142 15.8784 21.1841 15.5864 21.6125 15.3861C22.0463 15.1803 22.5303 15.0774 23.0643 15.0774C23.487 15.0774 23.8736 15.1386 24.2241 15.261C24.5745 15.3833 24.8749 15.578 25.1252 15.845C25.3811 16.112 25.5757 16.4652 25.7092 16.9047C25.8483 17.3441 25.9178 17.8809 25.9178 18.515V24.2722H23.4981V18.5067C23.4981 18.1062 23.4425 17.7947 23.3313 17.5722C23.22 17.3497 23.0559 17.1939 22.839 17.1049C22.6276 17.0104 22.3662 16.9631 22.0547 16.9631C21.7321 16.9631 21.4511 17.0271 21.212 17.155C20.9783 17.2829 20.7836 17.4609 20.6279 17.689C20.4777 17.9115 20.3637 18.1729 20.2858 18.4733C20.2079 18.7737 20.169 19.0963 20.169 19.4412Z"
                fill="#2A2F2F"
              />
            </svg>
          </Space>
          {/* Footer Stage 2 Part 2 */}
          <div className="footer-stage-2-part-2">
            <Space size={12}>
              {/* Available on Google Play */}
              <div>
                <img src={App_Store_Badge_Svg} alt="App Store" />
              </div>

              {/* Available on App store */}
              <div>
                <img src={Goolge_Play_Badge_Svg} alt="Google Play" />
              </div>
            </Space>
          </div>
        </div>
      </div>
      <Divider />
      {/* Stage 3 */}
      <div className="footer-stage-3">
        {/* <h1>Ppular Categories</h1> */}
        <div>
          <Collapse
            size="large"
            expandIconPosition={"end"}
            bordered={false}
            expandIcon={({ isActive }) => (
              <DownOutlined rotate={isActive ? 180 : 0} />
            )}
            ghost
            accordion
            items={items}
          />
        </div>
      </div>
      <Divider />
      {/* Stage 4 */}
      <div>
        <p>Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterUser;
