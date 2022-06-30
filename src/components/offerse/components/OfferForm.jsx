import React, { useEffect, useRef } from "react";
import Btn from "../../btn/Btn";
import useOffers from "../hooks/useOffers";
import useModal from "../../modal/hook/useModal";

const OfferForm = () => {
  const { loading, handleCreate } = useOffers();
  const { closeModal } = useModal();
  const nameRef = useRef();
  const btnRef = useRef();

  const handleChange = () => {
    const nameValue = nameRef.current.value;
    btnRef.current.disabled = !nameValue.length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const offer = {
      name: nameRef.current.value,
    };
    await handleCreate(offer);
    closeModal("OfferForm");
  };

  useEffect(() => {
    nameRef.current.focus();
    btnRef.current.disabled = true;
  }, []);

  return (
    <>
      <h3>Nueva Oferta</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={nameRef}
          onChange={() => handleChange()}
          placeholder="Oferta"
          required
        />
        <div className="actions">
          <Btn
            ref={btnRef}
            type="submit"
            fa={loading?.create ? `circle-o-notch fa-spin fa-fw` : ``}
            label={loading?.create ? `Cargando...` : `Agegar`}
            disabled={loading?.create}
            btn="primary"
          />
          <Btn
            label="Cancelar"
            onClick={() => closeModal("OfferForm")}
            btn="secondary"
          />
        </div>
      </form>
    </>
  );
};

export default OfferForm;
