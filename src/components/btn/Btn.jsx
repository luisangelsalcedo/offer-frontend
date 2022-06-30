import React from "react";
import { PropTypes } from "prop-types";
import "./btn.scss";

const Btn = React.forwardRef((props, ref) => {
  const { label, btn, fa, className, ...res } = props;

  return (
    <button
      ref={ref}
      type="button"
      data-type={btn}
      className={`btn ${className}`}
      {...res}
    >
      {fa && <i className={`fa fa-${fa}`} aria-hidden="true" />}
      <span>{label}</span>
    </button>
  );
});

Btn.propTypes = {
  label: PropTypes.string,
  btn: PropTypes.string,
  fa: PropTypes.string,
  className: PropTypes.string,
};

Btn.defaultProps = {
  label: "button",
  btn: "",
  fa: "",
  className: "btn ",
};
export default Btn;
