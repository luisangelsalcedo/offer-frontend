import React, { useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import useOffers from "../hooks/useOffers";
import Btn from "../../btn/Btn";
import Characteristic from "./Characteristic";
import Price from "./Price";
import OfferCharacteristicForm from "./OfferCharacteristicForm";
import OfferPriceForm from "./OfferPriceForm";
import useModal from "../../modal/hook/useModal";

const OfferEdit = ({ id }) => {
  const { oneOffer, findOffer, loading, handleUpdate } = useOffers();
  const { openModal, closeModal } = useModal();
  const { name, characteristics, prices } = oneOffer;

  const nameRef = useRef();
  const btnRef = useRef();

  const handleChange = () => {
    const nameValue = nameRef.current.value;
    btnRef.current.disabled = !nameValue.length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const udapted = {
      name: nameRef.current.value,
    };
    await handleUpdate(id, udapted);
    closeModal("OfferEdit");
  };

  useEffect(() => {
    findOffer(id);

    nameRef.current.focus();
    nameRef.current.value = name;
    btnRef.current.disabled = true;
  }, [findOffer, id]);

  const inputName = (
    <div>
      <div className="label">Oferta</div>
      <div>
        <input
          type="text"
          ref={nameRef}
          onChange={() => handleChange()}
          placeholder="Inserta una oferta"
          defaultValue={name}
        />
      </div>
    </div>
  );

  const characteristicsBox = (
    <div>
      <div className="label">
        <Btn
          fa="plus"
          data-style="icon"
          onClick={() => openModal(<OfferCharacteristicForm id={id} />)}
        />
        Características ({characteristics.length})
      </div>
      {!!characteristics.length &&
        characteristics.map((c) => (
          <Characteristic key={c.id} data={c} offer={oneOffer} />
        ))}
    </div>
  );

  const pricesBox = (
    <div>
      <div className="label">
        <Btn
          fa="plus"
          data-style="icon"
          onClick={() => openModal(<OfferPriceForm id={id} />)}
        />
        Precios ({prices.length})
      </div>
      {!!prices.length &&
        prices.map((p) => <Price key={p.id} data={p} offer={oneOffer} />)}
    </div>
  );

  return (
    <>
      <h3>Editar Oferta</h3>
      <form onSubmit={handleSubmit}>
        <div className="edit">
          {inputName}
          <div>
            {characteristicsBox}
            {pricesBox}
          </div>
        </div>
        <div className="actions">
          <Btn
            ref={btnRef}
            type="submit"
            fa={loading.update ? `circle-o-notch fa-spin fa-fw` : ``}
            label={loading.update ? `Cargando...` : `Actualizar`}
            disabled={loading.update}
            data-style="block"
            btn="primary"
          />
          <Btn
            label="Cancelar"
            onClick={() => closeModal("OfferEdit")}
            data-style="block"
            btn="secondary"
          />
        </div>
      </form>
    </>
  );
};

OfferEdit.propTypes = {
  id: PropTypes.number,
};

OfferEdit.defaultProps = {
  id: 0,
};

export default OfferEdit;
