export interface Player {
  name: string;
  score: number;
  email: string;
}

export interface WordLetterProps {
  letter: string;
  guessed: boolean;
}

export interface WordProps {
  word: string;
  guessedLetters: string[];
}

export interface ObjectProps {
  wrongGuesses: number;
}

export interface KeyboardProps {
  word: string;
  guessedLetters: string[];
  letterClickHandler: (letter: string) => void;
}

export interface KeyProps {
  letter: string;
  status: "incorrect" | "correct" | "blank";
  letterClickHandler: (letter: string) => void;
}

export interface ControlsProps {
  clickPlayHandler: () => void;
}
