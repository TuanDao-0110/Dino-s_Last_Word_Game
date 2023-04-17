import { Outlet } from "react-router-dom";

// Redux
import { useAppSelector } from "../../hooks/hooks";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Components
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

// Styles
import classes from "./template.module.css";

export const Template: React.FC = () => {
  const { wordToGuess, guessedLetters } = useAppSelector((state) => state.game);
  return (
    <Container
      className={`${classes.template} ${
        guessedLetters.filter((letter) => !wordToGuess.includes(letter))
          .length >= 9
          ? classes.game_over
          : ""
      }`}
      fluid
    >
      <Header />
      <Row className={classes.main_row}>
        <Outlet />
      </Row>
      <Footer />
    </Container>
  );
};
