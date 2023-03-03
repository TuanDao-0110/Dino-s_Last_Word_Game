import React from "react";
import { MessageProps } from "../../hangman.model";
import classes from "./message.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../src/app/store";

const Message: React.FC<MessageProps> = () => {
  const gameStatus = useSelector((state: RootState) => state.game.gameStatus);
  return (
    <div className={classes.messageContainer}>
      <div className={classes.gameStatus}>{gameStatus}</div>
    </div>
  );
};

export default Message;
