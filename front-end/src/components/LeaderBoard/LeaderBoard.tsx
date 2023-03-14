import { useAppSelector } from "../../hooks/hooks";
import classes from "./leaderboard.module.css";

const LeaderBoard = () => {
  const { leaderboard } = useAppSelector((state) => state.game);

  return (
    <div className={classes.leaderboard_container}>
      <h3>Leaderboard:</h3>
      <table>
        <thead>
          <tr className={classes.table_header}>
            <th>Position</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {leaderboard.map((player) => (
            <tr className={classes.table_position}>
              <td>
                {" "}
                <ol>
                  <li></li>
                </ol>{" "}
              </td>
              <td>
                <tr>
                  {" "}
                  <strong>{player.name} </strong>:
                </tr>{" "}
              </td>{" "}
              <td>
                <tr>
                  {" "}
                  <strong>{player.score} </strong>:
                </tr>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
