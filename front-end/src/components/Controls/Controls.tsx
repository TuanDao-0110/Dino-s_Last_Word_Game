import {
  BtnDanger,
  BtnPrimary,
  BtnSuccess,
} from "../../assets/export_component/resource";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  nextGame,
  resetGame,
  setCategory,
  setGameStatus,
  setModal,
  setWordToGuess,
  getWordDispatch,
  setRandomCategory,
} from "../../features/GameSlice";
import { Categories } from "../../types/API.model";

const Controls = () => {
  const dispatch = useAppDispatch();
  const { score, gameStatus, category } = useAppSelector((state) => state.game);

  const getRandomCategory = (): Categories => {
    const categories = Object.values(Categories).filter(
      (category) => category !== Categories.ALL
    );
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  };
  const playAgain = () => {
    dispatch(resetGame());
    dispatch(setRandomCategory())
    dispatch(setWordToGuess());
    dispatch(setCategory(getRandomCategory()));
  };

  const stopPlaying = () => {
    console.log("lost, showing modal");
    dispatch(setGameStatus("lost"));
    dispatch(setModal(true));
  };

  const playNext = async () => {
    await dispatch(getWordDispatch(category));
    dispatch(setRandomCategory());
    dispatch(setWordToGuess());
    dispatch(nextGame());
  };

  const renderButton = (status: string, score: number) => {
    if (status === "won" && score !== 0) {
      return <BtnPrimary text="Play next" clickHandler={playNext} />;
    } else if (status === "lost") {
      return <BtnPrimary text="Play again" clickHandler={playAgain} />;
    } else if (status === "playing") {
      return <BtnDanger text="Stop game" clickHandler={stopPlaying} />;
    }
  };
  return <div>{renderButton(gameStatus, score)}</div>;
};

export default Controls;
