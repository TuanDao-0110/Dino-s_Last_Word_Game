import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

/* import classes from "./footer.module.css"; */

export const Footer: React.FC = () => {
  return (
    <Row className="footer" fixed="bottom">
      <Col>
        <a href="https://github.com/TuanDao-0110/HangMan_Game">Dino game</a> -
        by <a href="https://github.com/TuanDao-0110/">Tuan Dao</a>,{" "}
        <a href="https://github.com/CodeLaMat">Eyvaz Alishov</a> and{" "}
        <a href="https://github.com/pixelsnow">Valeria Vagapova</a>
      </Col>
    </Row>
  );
};
