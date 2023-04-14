import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Outlet } from "react-router-dom";

import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

import classes from "./template.module.css";

export const Template: React.FC = () => {
  return (
    <Container className={classes.template} fluid>
      <Header />
      <Row className={classes.main_row}>
        <Outlet />
      </Row>
      <Footer />
    </Container>
  );
};
