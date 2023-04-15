import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import { useAppSelector } from "../../../hooks/hooks";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useContext(AuthContext);
  const { players } = useAppSelector((state) => state.player);

  return (
    <Row>
      <Navbar bg="light" variant="light">
        <Container className="justify-content-end">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {!currentUser && (
                <>
                  <Button onClick={() => navigate("/login")}>Login</Button>
                  <Button onClick={() => navigate("/register")}>
                    Register
                  </Button>
                </>
              )}
              {currentUser && (
                <>
                  <LinkContainer to="/board">
                    <Nav.Link>Board 👾</Nav.Link>
                  </LinkContainer>
                  <h4>
                    🤩😜🤨🥰🥰🖐🏻
                    {players?.userInfo._fieldsProto?.name.stringValue}{" "}
                    🤩🥳😜🤨🥰🥰🖐🏻{" "}
                  </h4>
                  <Button onClick={() => signOut()}>Logout</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
};
