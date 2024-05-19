import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  if (!isAuthenticated && !isLoading) navigate("/login");

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If ther IS a user, render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
