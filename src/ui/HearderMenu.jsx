import styled from "styled-components";
import LogOut from "../features/authentication/LogOut";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";

const StyleHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HearderMenu() {
  const navigate = useNavigate();
  return (
    <StyleHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkMode />
      </li>
      <li>
        <LogOut />
      </li>
    </StyleHeaderMenu>
  );
}

export default HearderMenu;
