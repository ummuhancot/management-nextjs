import DashboardMenu from "@/components/DashboardMenu";
import { UserMenu } from "@/components/UserMenu";
import Link from "next/link";
import React from "react";
import { Button, Container } from "react-bootstrap";

const layout = ({ children }) => {
  return (
    <div>
      <DashboardMenu>
        <Button as={Link} href="/api/auth/signout" variant="outline-light">
          Logout
        </Button>
      </DashboardMenu>
      <Container>{children}</Container>
    </div>
  );
};

export default layout;
