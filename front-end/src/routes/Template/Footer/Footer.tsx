import React from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import style from "./Footer.module.css";
export const Footer: React.FC = () => {
  return (
    <Row>
      <Container className="justify-content-end">
        <Navbar bg="light" variant="light" fixed="bottom">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/">
                <Nav.Link>bottom </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Row>
  );
};
