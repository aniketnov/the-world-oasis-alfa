import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../Context/ThemeContext";

function DarkMode() {
  const { isDarkMode, toggleDark } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDark}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkMode;
