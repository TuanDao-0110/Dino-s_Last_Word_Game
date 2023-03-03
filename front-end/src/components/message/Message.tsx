import React from "react";
import classes from "./message.module.css";

const Message = () => {
  return (
    <div className={classes.messageContainer}>
      <div className={classes.gameStatus}>Game status</div>
    </div>
  );
};

export default Message;
