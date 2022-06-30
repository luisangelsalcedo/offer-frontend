import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import ReactDOM from "react-dom";

const OfferModal = ({ children, open, handleClose }) => {
  const portalNode = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(portalNode);
    return () => {
      portalNode.remove();
    };
  }, [portalNode]);

  return ReactDOM.createPortal(
    <div className={`offer-modal ${open ? "open" : ""}`}>
      <div>{children}</div>
      <button type="button" onClick={handleClose}>
        Close
      </button>
    </div>,
    portalNode
  );
};

OfferModal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

OfferModal.defaultProps = {
  children: "Modal content",
  open: false,
  handleClose: () => {
    /* Close modal */
  },
};

export default OfferModal;
