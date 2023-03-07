import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import style from "./header.module.css";

export const Header: React.FC = () => {
  return (
    <Row>
      <Navbar bg="light" variant="light">
        <Container className="justify-content-end">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
};
