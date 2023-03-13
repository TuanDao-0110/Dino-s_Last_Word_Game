import { useAppSelector } from "../../hooks/hooks";
import classes from "./leaderboard.module.css";

const LeaderBoard = () => {
  const { leaderboard } = useAppSelector((state) => state.game);

  return (
    <div className={classes.leaderboard_container}>
      <h3>Leaderboard</h3>
      {leaderboard.map((record) => (
        <p>
          {record.name} {record.score}
        </p>
      ))}
    </div>
  );
};

export default LeaderBoard;
