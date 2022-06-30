import React from "react";
import { PropTypes } from "prop-types";
import Btn from "../../btn/Btn";
import { capitalize } from "../../../utils";
import useOffers from "../hooks/useOffers";

const Price = ({ data }) => {
  const { deletePrice } = useOffers();
  const handleClick = (pk) => {
    deletePrice(pk);
  };

  return (
    <div>
      <Btn
        fa="times-circle"
        data-style="icon"
        onClick={() => handleClick(data.id)}
      />
      {capitalize(data.name)} - $ {data.price_value}
    </div>
  );
};

Price.propTypes = {
  data: PropTypes.object,
};

Price.defaultProps = {
  data: {
    id: 0,
    name: "price name",
    price_value: "0.0",
  },
};

export default Price;
