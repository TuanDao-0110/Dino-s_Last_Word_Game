export interface Player {
  id: number;
  name: string;
  email: string;
  score: number;
}

export interface PlayerState {
  players: Player[];
}

export interface WordLetterProps {
  key: number;
  letter: string;
  guessed: boolean;
  showHint?: (letter: string, className: string) => void;
}

export interface ObjectProps {
  wrongGuesses: number;
}

export interface KeyProps {
  letter: string;
  status: "incorrect" | "correct" | "blank";
}

export interface ControlsProps {
  clickPlayHandler: () => void;
}

export interface ButtonProps {
  text: string;
  clickHandler: () => void;
}
