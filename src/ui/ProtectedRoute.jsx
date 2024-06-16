import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPageSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the Auth user
  const { isLoading, isAuthenticated } = useUser();

  // 2. if no auth redirect to the loging page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, navigate, isLoading]
  );
  // 3.while Loading show a spiiner
  if (isLoading)
    return (
      <FullPageSpinner>
        <Spinner />
      </FullPageSpinner>
    );
  // 4. if there is a user , render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
