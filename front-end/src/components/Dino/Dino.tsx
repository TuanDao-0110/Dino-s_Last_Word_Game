import { ObjectProps } from "../../types/hangman.model";

import dino_const from "../../assets/dino_frames/dino_const.svg";
import dino0 from "../../assets/dino_frames/dino0.svg";
import dino1 from "../../assets/dino_frames/dino1.svg";
import dino2 from "../../assets/dino_frames/dino2.svg";
import dino3 from "../../assets/dino_frames/dino3.svg";
import dino4 from "../../assets/dino_frames/dino4.svg";
import dino5 from "../../assets/dino_frames/dino5.svg";
import dino6 from "../../assets/dino_frames/dino6.svg";
import dino7 from "../../assets/dino_frames/dino7.svg";
import dino8 from "../../assets/dino_frames/dino8.svg";
import dino9 from "../../assets/dino_frames/dino9.svg";
import m0 from "../../assets/dino_frames/m0.svg";
import m1 from "../../assets/dino_frames/m1.svg";
import m2 from "../../assets/dino_frames/m2.svg";
import m3 from "../../assets/dino_frames/m3.svg";
import m4 from "../../assets/dino_frames/m4.svg";
import m5 from "../../assets/dino_frames/m5.svg";
import m6 from "../../assets/dino_frames/m6.svg";
import m7 from "../../assets/dino_frames/m7.svg";
import m8 from "../../assets/dino_frames/m8.svg";

import "./dino.css";

import { useAppSelector } from "../../hooks/hooks";
import { GameStatus } from "../../types/API.model";

const Dino: React.FC<ObjectProps> = ({ wrongGuesses }) => {
  const { gameStatus } = useAppSelector((state) => state.game);
  const dinoSource = () => {
    if (wrongGuesses === 0 || gameStatus === GameStatus.win) return dino0;
    if (wrongGuesses === 1) return dino1;
    if (wrongGuesses === 2) return dino2;
    if (wrongGuesses === 3) return dino3;
    if (wrongGuesses === 4) return dino4;
    if (wrongGuesses === 5) return dino5;
    if (wrongGuesses === 6) return dino6;
    if (wrongGuesses === 7) return dino7;
    if (wrongGuesses === 8) return dino8;
    return dino9;
  };

  const meteorSource = () => {
    if (wrongGuesses === 1) return m1;
    if (wrongGuesses === 2) return m2;
    if (wrongGuesses === 3) return m3;
    if (wrongGuesses === 4) return m4;
    if (wrongGuesses === 5) return m5;
    if (wrongGuesses === 6) return m6;
    if (wrongGuesses === 7) return m7;
    if (wrongGuesses === 8) return m8;
    return m0;
  };

  return (
    <div className="frames_container">
      <div className="dino_const_container">
        <img className="dino_const" src={dino_const} alt="dino" />
      </div>
      <div>
        <img
          className="dino_changes"
          src={dinoSource()}
          alt={wrongGuesses.toString()}
        />
        <img
          className="meteorite"
          src={meteorSource()}
          alt={wrongGuesses.toString()}
        />
      </div>
    </div>
  );
};

export default Dino;
