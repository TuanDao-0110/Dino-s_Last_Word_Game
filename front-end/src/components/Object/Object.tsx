import React from "react";
import { ObjectProps } from "../../hangman.model";

const Object: React.FC<ObjectProps> = ({ wrongGuesses }) => {
  return <div>{wrongGuesses}</div>;
};

export default Object;
