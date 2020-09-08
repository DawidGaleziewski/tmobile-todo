import React from "react";

// Components
import Dashboard from "../../components/Dashboard/Dashboard";
import SectionHeader from "../../components/atoms/headers/SectionHeader";

// Libraries
import { css, jsx } from "@emotion/core";

/** @jsx jsx */

const notFoundTextParStyle = css`
  color: #e30074;
  font-size: 10rem;
`;

const PageNotFoundView = ({ pageTitle }) => (
  <Dashboard>
    <SectionHeader text={pageTitle} />
    <span css={notFoundTextParStyle}>Ups 404. Sorry</span>
  </Dashboard>
);
export default PageNotFoundView;
