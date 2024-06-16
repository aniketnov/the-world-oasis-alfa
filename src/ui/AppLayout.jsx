import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyleAppLayOut = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const Contanier = styled.div`
  max-width: 120rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyleAppLayOut>
      <Header />
      <Sidebar />
      <Main>
        <Contanier>
          <Outlet />
        </Contanier>
      </Main>
    </StyleAppLayOut>
  );
}

export default AppLayout;
