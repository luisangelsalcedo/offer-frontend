import React from "react";
import { PropTypes } from "prop-types";
import useOffers from "../hooks/useOffers";
import OfferEdit from "./OfferEdit";
import { capitalize } from "../../../utils";
import Btn from "../../btn/Btn";
import OfferCharacteristicForm from "./OfferCharacteristicForm";
import OfferPriceForm from "./OfferPriceForm";
import useModal from "../../modal/hook/useModal";

const OfferItem = (props) => {
  const { id, name, characteristics, prices } = props;
  const { loading, handleDelete } = useOffers();
  const { openModal } = useModal();

  return (
    <div className="offerse-item" key={id}>
      <div>
        <span>ID:</span> {id}
      </div>
      <div className="title">{capitalize(name)}</div>
      <div>
        <Btn
          label={`${characteristics.length} caracteristicas`}
          onClick={() => openModal(<OfferCharacteristicForm id={id} />)}
        />
        <Btn
          label={`${prices.length} precios`}
          onClick={() => openModal(<OfferPriceForm id={id} />)}
        />
      </div>
      <div className="actions">
        <Btn
          label="Editar"
          fa="pencil-square-o"
          onClick={() => openModal(<OfferEdit id={id} />)}
          btn="primary"
        />

        <Btn
          label="Eliminar"
          fa="trash"
          onClick={() => handleDelete(id)}
          disabled={loading.delete}
          btn="secondary"
        />
      </div>
    </div>
  );
};

OfferItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  characteristics: PropTypes.array,
  prices: PropTypes.array,
};

OfferItem.defaultProps = {
  id: 0,
  name: "",
  characteristics: [],
  prices: [],
};

export default OfferItem;
