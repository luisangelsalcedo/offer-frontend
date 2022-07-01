import React, { useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import Btn from "../../btn/Btn";
import useOffers from "../hooks/useOffers";
import useModal from "../../modal/hook/useModal";

const OfferCharacteristicForm = ({ id }) => {
  const { loading, addCharacteristic } = useOffers();
  const { closeModal } = useModal();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const btnRef = useRef();

  const handleChange = () => {
    const nameValue = nameRef.current.value;
    const descriptionValue = descriptionRef.current.value;

    btnRef.current.disabled = !(nameValue.length + descriptionValue.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const caracteristics = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };
    await addCharacteristic(id, caracteristics);
    closeModal("OfferCharacteristicForm");
  };

  useEffect(() => {
    nameRef.current.focus();
    btnRef.current.disabled = true;
  }, []);

  return (
    <>
      <h3>Agregar una Característica</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            ref={nameRef}
            onChange={() => handleChange()}
            placeholder="Característica"
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
            onClick={() => closeModal("OfferCharacteristicForm")}
            btn="secondary"
          />
        </div>
      </form>
    </>
  );
};

OfferCharacteristicForm.propTypes = {
  id: PropTypes.number,
};

OfferCharacteristicForm.defaultProps = {
  id: 0,
};

export default OfferCharacteristicForm;
