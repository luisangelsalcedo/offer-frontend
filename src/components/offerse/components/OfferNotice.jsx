import React, { useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import ReactDOM from "react-dom";

const OfferNotice = ({ message, handleMessage }) => {
  const portalNode = document.createElement("div");
  const timer = useRef();

  useEffect(() => {
    document.body.appendChild(portalNode);
    return () => {
      portalNode.remove();
    };
  }, [portalNode]);

  useEffect(() => {
    timer.current = setTimeout(() => {
      handleMessage("");
    }, 3000);

    return () => clearTimeout(timer.current);
  }, [message]);

  return ReactDOM.createPortal(
    <div>{!!message && <div className="notice">{message}</div>}</div>,
    portalNode
  );
};

OfferNotice.propTypes = {
  message: PropTypes.string,
  handleMessage: PropTypes.func,
};

OfferNotice.defaultProps = {
  message: "",
  handleMessage: () => {
    // Set message
  },
};

export default OfferNotice;
