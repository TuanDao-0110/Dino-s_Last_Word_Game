import { BtnPrimary } from "../../assets/export_component/resource";

import { useAppDispatch } from "../../hooks/hooks";
import {
  resetGame,
  setCategory,
  setGameStatus,
  /* setRandomCategory, */
  setWordToGuess,
} from "../../features/GameSlice";
import { Categories } from "../../types/API.model";

const Controls = () => {
  const dispatch = useAppDispatch();

  function getRandomCategory(): Categories {
    const categories = Object.values(Categories).filter(
      (category) => category !== Categories.ALL
    );
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  const playAgain = () => {
    dispatch(resetGame());
    dispatch(setWordToGuess());
    dispatch(setCategory(getRandomCategory()));
  };

  const stopPlaying = () => {
    dispatch(setGameStatus("lost"));
  };

  return (
    <div>
      <BtnPrimary text="Play again" clickHandler={playAgain} />
      <BtnPrimary text="Stop playing" clickHandler={stopPlaying} />
    </div>
  );
};

export default Controls;
