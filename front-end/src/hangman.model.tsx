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
  letter: string;
  guessed: boolean;
}

export interface WordProps {
  wordToGuess: string;
  guessedLetters: string[];
}

export interface ObjectProps {
  wordToGuess: string;
  wrongGuesses: number;
}

export interface KeyboardProps {
  wordToGuess: string;
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
