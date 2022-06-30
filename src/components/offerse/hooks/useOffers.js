import { useContext } from "react";
import { OfferContext } from "../context/OfferProvider";

const useOffers = () => {
  const offersMethods = useContext(OfferContext);

  return offersMethods;
};

export default useOffers;
