import { useAppSelector } from "../../hooks/hooks";

import classes from "./message.module.css";

const Message: React.FC = () => {
  const gameStatus = useAppSelector((state) => state.game.gameStatus);
  return (
    <div className={classes.messageContainer}>
      <div className={classes.gameStatus}>{gameStatus}</div>
    </div>
  );
};

export default Message;
