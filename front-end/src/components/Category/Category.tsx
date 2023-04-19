// React
import React, { ReactEventHandler } from "react";

// Redux
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  getWordDispatch,
  setCategory,
  setWordToGuess,
} from "../../features/GameSlice";

// Bootstrap
import Form from "react-bootstrap/Form";

// Components
import {
  Message,
  Controls,
  PopoverHint,
} from "../../assets/export_component/resource";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

// Types
import { Categories, GameStatus } from "../../types/API.model";

// Styles
import classes from "./category.module.css";

const Category: React.FC = () => {
  const { category, score, round, gameStatus, guessedLetters, wordToGuess } =
    useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

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
    /* console.log("setWordToGuess setUpCategory"); */
    dispatch(setWordToGuess());
  };

  const getMeteorProgress = () => {
    const wrongGuesses = guessedLetters.filter(
      (letter) => !wordToGuess.includes(letter)
    ).length;
    return (wrongGuesses / 9) * 100;
  };

  const getMeteorClass = () => {
    const wrongGuesses = guessedLetters.filter(
      (letter) => !wordToGuess.includes(letter)
    ).length;
    return Math.floor(wrongGuesses / 3);
  };

  return (
    <div className={classes.category_container}>
      <div className={classes.popover_container}>
        <PopoverHint />
      </div>
      <div className={classes.category_section}>
        <div className={classes.game_status_container}>
          <p className={classes.score}>
            Round: <span>{round}</span>
          </p>
          <p className={classes.score}>
            Score: <span>{score}</span>
          </p>
        </div>

        <div className={classes.circular_progress_bar_container}>
          <CircularProgressbarWithChildren
            className={classes.circular_progress_bar}
            value={getMeteorProgress()}
            strokeWidth={8}
            styles={buildStyles({
              textColor: "#000",
              pathColor: "#ff8585",
              trailColor: "#5050ff",
              strokeLinecap: "round",
              pathTransitionDuration: 0.5,
            })}
          >
            <p
              className={`${classes.tries} ${
                classes["wrong" + getMeteorClass()]
              }`}
            >
              <span>
                <span>
                  {
                    guessedLetters.filter(
                      (letter) => !wordToGuess.includes(letter)
                    ).length
                  }
                </span>
                /9
              </span>{" "}
              tries
            </p>
          </CircularProgressbarWithChildren>
        </div>
      </div>
      <div className={classes.category_info}>
        <p className={classes.category_display}>
          Word category: {/* <span>{category}</span> */}
        </p>{" "}
        <Form.Select
          disabled={
            guessedLetters.length > 0 || gameStatus !== GameStatus.playing
          }
          aria-label="select category"
          onChange={setUpCategory}
          className={classes.category_select}
        >
          {renderOption()}
        </Form.Select>
        <p className={classes.points_earned}>
          Points to be earned: {category === "all" ? 2 : 1}
        </p>
      </div>
      <div className={classes.category_section}>
        {gameStatus === GameStatus.win && (
          <p className={classes.game_status}>You won!</p>
        )}
        {gameStatus === GameStatus.lose && (
          <p className={classes.game_status}>Ouch. You lost!</p>
        )}

        <Controls />
      </div>
      {gameStatus === GameStatus.lose && <Message />}
    </div>
  );
};

export default Category;
