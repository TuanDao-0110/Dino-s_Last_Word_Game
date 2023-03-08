import { BtnSuccess } from "../../assets/export_component/resource";

import { useAppDispatch } from "../../hooks/hooks";
import { resetGame } from "../../features/GameSlice";

const Controls = () => {
  const dispatch = useAppDispatch();
  const playAgain = () => {
    console.log("play again");
    dispatch(resetGame());
  };

  return (
    <div>
      <BtnSuccess text="Play again" clickHandler={playAgain} />
    </div>
  );
};

export default Controls;
