import React, { useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import Btn from "../../btn/Btn";
import useOffers from "../hooks/useOffers";
import useModal from "../../modal/hook/useModal";

const OfferPriceForm = ({ id }) => {
  const { loading, addPrice } = useOffers();
  const { closeModal } = useModal();

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const btnRef = useRef();

  const handleChange = () => {
    const nameValue = nameRef.current.value;
    const priceValue = priceRef.current.value;
    const descriptionValue = descriptionRef.current.value;

    btnRef.current.disabled = !(
      nameValue.length +
      descriptionValue.length +
      priceValue.length
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const caracteristics = {
      name: nameRef.current.value,
      price_value: priceRef.current.value,
      description: descriptionRef.current.value,
    };
    await addPrice(id, caracteristics);
    closeModal("OfferPriceForm");
  };

  useEffect(() => {
    nameRef.current.focus();
    btnRef.current.disabled = true;
  }, []);

  return (
    <>
      <h3>Agregar Precios</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            ref={nameRef}
            onChange={() => handleChange()}
            placeholder="Nombre"
            required
          />
        </div>
        <div>
          <input
            type="text"
            ref={priceRef}
            onChange={() => handleChange()}
            placeholder="Precio"
            required
          />
        </div>
        <div>
          <textarea
            rows="4"
            ref={descriptionRef}
            onChange={() => handleChange()}
            placeholder="Descripción"
          />
        </div>
        <div className="actions">
          <Btn
            ref={btnRef}
            type="submit"
            fa={loading.update ? `circle-o-notch fa-spin fa-fw` : ``}
            label={loading.update ? `Cargando...` : `Agegar`}
            disabled={loading.update}
            btn="primary"
          />
          <Btn
            label="Cancelar"
            onClick={() => closeModal("OfferPriceForm")}
            btn="secondary"
          />
        </div>
      </form>
    </>
  );
};

OfferPriceForm.propTypes = {
  id: PropTypes.number,
};

OfferPriceForm.defaultProps = {
  id: 0,
};

export default OfferPriceForm;
