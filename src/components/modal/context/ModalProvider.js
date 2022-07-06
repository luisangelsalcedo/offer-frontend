import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import OfferModal from "../../offerse/components/OfferModal";

const modalContext = createContext();
const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const openModal = (child) => {
    setModals((c) => [...c, child]);
  };

  const closeModal = (nameType) => {
    setModals((arr) =>
      arr.filter((m) => String(m?.type?.name) !== String(nameType))
    );
  };

  const memoValues = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    []
  );

  return (
    <modalContext.Provider value={memoValues}>
      {children}

      {modals.map((child, i) => (
        <OfferModal
          key={String(i)}
          handleClose={() => closeModal(child?.type?.name)}
          open
        >
          {child}
        </OfferModal>
      ))}
    </modalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ModalProvider, modalContext };
