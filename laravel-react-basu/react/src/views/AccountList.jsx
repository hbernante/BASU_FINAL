import React from "react";
import PageComponent from "../components/PageComponent";
import { Link } from "react-router-dom";
import TButton from "../components/core/TButton";

export default function AccountList() {
  return (
    <PageComponent title="Account List">
      <TButton>
        <Link to="/account/register">Register Account</Link>
      </TButton>
    </PageComponent>
  );
}
