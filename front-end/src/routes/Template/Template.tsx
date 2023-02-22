import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
export const Template: React.FC = () => {
  return (
      <Container fluid>
      <Header />
        <Row>
          <Outlet />
        </Row>
      <Footer />
      </Container>
  );
};
