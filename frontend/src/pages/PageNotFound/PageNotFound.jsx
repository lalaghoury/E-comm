import React from "react";
import "./PageNotFound.scss";
import AppLayout from "../../config/AppLayout/AppLayout";
import PageNotFoundImage from "../../assests/images/page-not-found.png";
import { Button } from "antd";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <AppLayout>
      <div className="page-not-found">
        <div className="page-not-found-content">
          <img src={PageNotFoundImage} alt="page not found" />
          <h1>Oops! Page not found</h1>
          <p>
            The page you are looking for might have been removed or temporarily
            unavailable.
          </p>
          <div>
            <Link to="/">
              <Button type="primary">Back to HomePage</Button>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PageNotFound;
