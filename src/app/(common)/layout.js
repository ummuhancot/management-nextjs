import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserMenu } from "@/components/UserMenu";
import React from "react";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <UserMenu />
      </Header>
      <Container className="flex-grow-1 my-3">{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
