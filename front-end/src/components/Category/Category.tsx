import React, { ReactEventHandler } from "react";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { Categories } from "../../types/API.model";
import {
  getWordDispatch,
  setCategory,
  setWordToGuess,
} from "../../features/GameSlice";
import classes from "./category.module.css";
import { Message, Controls } from "../../assets/export_component/resource";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

const Category: React.FC = () => {
  const { category, score, round, gameStatus, guessedLetters, wordToGuess } =
    useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderOption = () => {
    return Object.values(Categories).map((category, index) => (
      <option value={category} key={index}>
        {category}
      </option>
    ));
  };
  const setUpCategory: ReactEventHandler<HTMLSelectElement> = async (e) => {
    dispatch(setCategory(e.currentTarget.value as Categories));
    await dispatch(getWordDispatch(e.currentTarget.value as Categories));
    dispatch(setWordToGuess());
  };

  const getMeteorProgress = () => {
    const wrongGuesses = guessedLetters.filter(
      (letter) => !wordToGuess.includes(letter)
    ).length;
    return (wrongGuesses / 9) * 100;
  };

  return (
    <div className={classes.category_container}>
      <div>
        <IconButton
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
        >
          <TipsAndUpdatesIcon color="warning" sx={{ fontSize: 30 }} />
        </IconButton>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            You can open any letter by sacrificing one point
          </Typography>
        </Popover>
      </div>{" "}
      <div>
        <div className={classes.gameStatus_container}>
          <p className={classes.score}>
            Round: <span>{round}</span>
          </p>{" "}
          <p className={classes.score}>
            Score: <span>{score}</span>
          </p>
        </div>

        <ProgressBar
          className={classes.progress_bar}
          variant="danger"
          now={getMeteorProgress()}
        />
        <div className={classes.category_info}>
          <p className={classes.category_display}>
            Word category: <span>{category}</span>
          </p>
          <p className={classes.points_earned}>
            Points to be earned: {category === "all" ? 2 : 1}
          </p>
          <Form.Select
            disabled={guessedLetters.length > 0 || gameStatus !== "playing"}
            aria-label="select category"
            onChange={setUpCategory}
            className={classes.category_select}
          >
            {renderOption()}
          </Form.Select>{" "}
        </div>
        {gameStatus === "won" && (
          <p className={classes.game_status}>You won!</p>
        )}
        {gameStatus === "lost" && (
          <p className={classes.game_status}>Ouch. You lost!</p>
        )}
        <Controls />
        {gameStatus === "lost" && <Message />}
      </div>
    </div>
  );
};

export default Category;
