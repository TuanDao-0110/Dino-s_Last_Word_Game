import { useContext } from "react";
import { BtnSuccess } from "../../assets/export_component/resource";
import { AuthContext } from "../../context/auth-context";
import { SignOutUser } from "../../firebase/firebase";

const Board = () => {
  const { currentUser, setCurrentUser, signOut } = useContext(AuthContext);

  return (
    <div>
      Board
      <BtnSuccess clickHandler={signOut} text="log out" />
    </div>
  );
};

export default Board;
