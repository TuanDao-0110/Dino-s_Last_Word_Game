import { WordLetterProps } from "../../hangman.model";

const WordLetters: React.FC<WordLetterProps> = ({ letter, guessed }) => {
  return <div>{guessed ? letter : "_"}</div>;
};

export default WordLetters;
