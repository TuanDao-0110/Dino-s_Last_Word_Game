// Bootstrap
import { Row } from "react-bootstrap";

// Styles
import classes from "./footer.module.css";

const Footer: React.FC = () => {
  return (
    <Row className={classes.footer}>
      <span>
        <a href="https://github.com/TuanDao-0110/HangMan_Game">Dino game</a> -
        by <a href="https://github.com/TuanDao-0110/">Tuan Dao</a>,{" "}
        <a href="https://github.com/CodeLaMat">Eyvaz Alishov</a> and{" "}
        <a href="https://github.com/pixelsnow">Valeria Vagapova</a>
      </span>
    </Row>
  );
};

export default Footer;
