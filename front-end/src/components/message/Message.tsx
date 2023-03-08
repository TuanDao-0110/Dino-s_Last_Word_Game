import { MessageProps } from "../../types/hangman.model";
import { useAppSelector } from "../../hooks/hooks";

import classes from "./message.module.css";

const Message: React.FC<MessageProps> = () => {
  const gameStatus = useAppSelector((state) => state.game.gameStatus);
  return (
    <div className={classes.messageContainer}>
      <div className={classes.gameStatus}>{gameStatus}</div>
    </div>
  );
};

export default Message;
