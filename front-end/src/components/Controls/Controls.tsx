import { BtnSuccess } from "../../assets/export_component/resource";

const Controls = () => {
  const playAgain = () => {
    console.log("playing again");
  };

  return (
    <div>
      <BtnSuccess text="Play again" clickHandler={playAgain} />
    </div>
  );
};

export default Controls;
