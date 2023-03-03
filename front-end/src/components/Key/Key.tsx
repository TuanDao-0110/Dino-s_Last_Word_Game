import React from "react";
import classes from "./key.module.css";

import { KeyProps } from "../../hangman.model";

const Key: React.FC<KeyProps> = ({ letter, status, letterClickHandler }) => {
  return (
    <div className={classes.key_container}>
      <button
        className={status}
        onClick={() => letterClickHandler(letter)}
        disabled={status !== "blank"}
      >
        {letter}
      </button>
    </div>
  );
};

export default Key;
