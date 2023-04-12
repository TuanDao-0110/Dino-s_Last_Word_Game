import { useContext } from "react";
import { getAllScore, getUserInfo, postNewScore } from "../../api/userapi";
import { BtnPrimary } from "../../assets/export_component/resource";
import { AuthContext } from "../../context/auth-context";
import { setPlayerDispatch } from "../../features/PlayerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import classes from "./board.module.css";

const Board = () => {
  const { currentUser, signOut } = useContext(AuthContext);
  const { players } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  console.log(currentUser);

  return (
    <div>
      <h2>Testing </h2>
      <div className={classes.buttons}>
        <BtnPrimary
          text="Get user info"
          clickHandler={() => {
            if (currentUser) {
              dispatch(setPlayerDispatch(currentUser));
            }
          }}
        />
        <BtnPrimary
          text="Post new score"
          clickHandler={() => {
            if (currentUser) {
              postNewScore(currentUser, { score: 50 });
            }
          }}
        />
        <BtnPrimary
          text="Get all scores"
          clickHandler={() => {
            if (currentUser) {
              getAllScore();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Board;
