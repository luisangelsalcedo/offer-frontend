import { useContext } from "react";
import { modalContext } from "../context/ModalProvider";

const useModal = () => {
  const modalMethods = useContext(modalContext);
  return modalMethods;
};

export default useModal;
