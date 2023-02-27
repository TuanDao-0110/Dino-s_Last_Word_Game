import React from "react";
import classes from "./key.module.css";

import { KeyProps } from "../../hangman.model";

const Key = (props: KeyProps) => {
  return (
    <div className={classes.key_container}>
      <button
        className={props.status}
        onClick={() => props.letterClickHandler(props.letter)}
        disabled={props.status !== "blank"}
      >
        {props.letter}
      </button>
    </div>
  );
};

export default Key;
