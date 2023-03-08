import { useAppSelector } from "../../hooks/hooks";
import classes from "./leaderboard.module.css";

const LeaderBoard = () => {
  const leaderBoard = useAppSelector((state) => state.game.leaderboard);

  return (
    <div className={classes.leaderboard_container}>
      <h3>Leaderboard</h3>
      {leaderBoard.map((record) => (
        <p>
          {record.name} {record.score}
        </p>
      ))}
    </div>
  );
};

export default LeaderBoard;
