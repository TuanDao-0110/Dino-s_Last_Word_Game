import React from "react";

import Word from "../../../components/word/Word";
import Keyboard from "../../../components/keyboard/Keyboard";
import Message from "../../../components/message/Message";
import Object from "../../../components/Object/Object";
import Leaderboard from "../../../components/leader_board/LeaderBoard";

const Main = () => {
  return (
    <div className="Main">
      <h1>Main</h1>

      <Object />
      <Word />
      <Keyboard
        word="Hi"
        guessedLetters={[]}
        letterClickHandler={Leaderboard}
      />
      <Message />
      <Leaderboard />
    </div>
  );
};

export default Main;
