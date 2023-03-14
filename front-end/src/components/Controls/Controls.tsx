import { BtnPrimary } from "../../assets/export_component/resource";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { resetGame, setRandomCategory, setWordToGuess } from "../../features/GameSlice";
import { Categories } from "../../types/API.model";

const Controls = () => {
  const dispatch = useAppDispatch();
  const { gameStatus, score } = useAppSelector((state) => state.game);
  function getRandomCategory(): Categories {
    const categories = Object.values(Categories).filter((category) => category !== Categories.ALL);
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }
  const playAgain = () => {
    dispatch(resetGame());
    dispatch(setWordToGuess());
    dispatch(setRandomCategory(getRandomCategory()));
  };
  const renderButton = (status: string) => {
    if (status === "won" && score > 1) {
      <BtnPrimary text="Play again" clickHandler={playAgain} />;

    }if (status === 'lost') { 
      <BtnPrimary text="Play again" clickHandler={playAgain} />;

    }
  };
  return (
    <div>
      <BtnPrimary text="Play again" clickHandler={playAgain} />
    </div>
  );
};

export default Controls;
