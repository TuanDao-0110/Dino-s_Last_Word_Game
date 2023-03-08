import { BtnPrimary } from "../../assets/export_component/resource";

import { useAppDispatch } from "../../hooks/hooks";
import { resetGame, setWordToGuess } from "../../features/GameSlice";

const Controls = () => {
  const dispatch = useAppDispatch();
  const playAgain = () => {
    console.log("play again");
    dispatch(resetGame());
    dispatch(setWordToGuess());
  };

  return (
    <div>
      <BtnPrimary text="Play again" clickHandler={playAgain} />
    </div>
  );
};

export default Controls;
