import { BtnDanger, BtnPrimary } from "../../assets/export_component/resource";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { nextGame, resetGame, setCategory, setGameStatus, setWordToGuess } from "../../features/GameSlice";
import { Categories } from "../../types/API.model";
import { useEffect } from "react";

const Controls = () => {
  const dispatch = useAppDispatch();
  const { score, gameStatus } = useAppSelector((state) => state.game);
  useEffect(() => {
    console.log(gameStatus);
  }, []);
  const getRandomCategory = (): Categories => {
    const categories = Object.values(Categories).filter((category) => category !== Categories.ALL);
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  };
  const playAgain = () => {
    dispatch(resetGame());
    dispatch(setWordToGuess());
    dispatch(setCategory(getRandomCategory()));
  };

  const stopPlaying = () => {
    dispatch(setGameStatus("lost"));
  };
  const playNext = () => {
    dispatch(nextGame());
  };
  const renderButton = (status: string) => {
    console.log(status);
    if (status === "won" && score > 1) {
      return <BtnPrimary text="Play next" clickHandler={playNext} />;
    }
    if (status === "lost") {
      return <BtnDanger text="Play again" clickHandler={playAgain} />;
    }
    if (status === "playing") {
      return <BtnDanger text="Stop game" clickHandler={stopPlaying} />;
    }
  };
  return <div>{renderButton(gameStatus)}</div>;
};

export default Controls;
