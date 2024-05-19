import React from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import Spinner from "../../ui/Spinner";

const Logout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {isLoading ? <Spinner /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default Logout;
