import React from "react";
import { PropTypes } from "prop-types";
import Btn from "../../btn/Btn";
import { capitalize } from "../../../utils";
import useOffers from "../hooks/useOffers";

const Characteristic = ({ data }) => {
  const { deleteCharacteristic } = useOffers();

  const handleClick = (pk) => {
    deleteCharacteristic(pk);
  };

  return (
    <div>
      <Btn
        fa="times-circle"
        data-style="icon"
        onClick={() => handleClick(data.id)}
      />
      {capitalize(data.name)}
    </div>
  );
};

Characteristic.propTypes = {
  data: PropTypes.object,
};

Characteristic.defaultProps = {
  data: {
    name: "chracteristic name",
  },
};

export default Characteristic;
