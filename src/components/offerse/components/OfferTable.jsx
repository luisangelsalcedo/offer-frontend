import React from "react";
import Btn from "../../btn/Btn";
import useOffers from "../hooks/useOffers";
import OfferForm from "./OfferForm";
import OfferItem from "./OfferItem";
import OfferLogo from "./OfferLogo";
import useModal from "../../modal/hook/useModal";

const OfferTable = () => {
  const { offers, loading } = useOffers();
  const { openModal } = useModal();

  const btnNewOffer = (
    <Btn
      label="Agregar oferta"
      fa="plus"
      onClick={() => openModal(<OfferForm />)}
      btn="white"
    />
  );

  const tableEmpty = (
    <div className="offerse-empty">
      <OfferLogo />
      {loading.load ? (
        <div>Cargando...</div>
      ) : (
        <div>Crear una nueva oferta {btnNewOffer}</div>
      )}
    </div>
  );

  const tableFull = (
    <>
      <div className="offerse-brand">
        <OfferLogo />
        {btnNewOffer}
      </div>
      <div className="offerse-header offerse-item">
        <div>ID</div>
        <div className="title">NAME</div>
        <div>&nbsp;</div>
        <div className="actions">ACTIONS</div>
      </div>
      <div className="offerse-body">
        {offers.map(({ id, name, characteristics, prices }) => (
          <OfferItem
            key={id}
            id={id}
            name={name}
            characteristics={characteristics}
            prices={prices}
          />
        ))}
      </div>
      {offers.length > 12 && btnNewOffer}
    </>
  );

  return (
    <div className="offerse">
      <div>{!offers.length ? tableEmpty : tableFull}</div>
    </div>
  );
};

export default OfferTable;
