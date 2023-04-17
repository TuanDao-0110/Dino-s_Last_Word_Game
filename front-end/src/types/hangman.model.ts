export interface ScoreBoard_Type {
  score: number;
  timestamp: number;
}
export interface Player_ScoreBoard_Type {
  email: string;
  name: string;
}
export interface Player {
  scoreData: [[Player_ScoreBoard_Type | ScoreBoard_Type]];
  userInfo: {
    _createTime?: { _second: number; _nanoseconds: number };
    _fieldsProto?: {
      [index: string]: { stringValue: string; valueType: string };
    };
  };
}

export interface AllScore_Type {
  [index: string]: [Player_ScoreBoard_Type | ScoreBoard_Type];
}

export interface PlayerState {
  players?: Player;
  allScore?: AllScore_Type;
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
  clickHandler?: () => void;
}
