import React, { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import {
  addCharacteristicService,
  addPriceService,
  createOfferService,
  deleteCharacteristicService,
  deleteOfferService,
  deletePriceService,
  getAllOffersService,
  updateOfferService,
} from "../../../service/offer.service";
import httpClient from "../../../client";
import OfferNotice from "../components/OfferNotice";
import { addItem, deleteItem, updateItem } from "../../../utils";
// import OfferModal from "../components/OfferModal";

const OfferContext = createContext();

const OfferProvider = ({ children }) => {
  const [offers, setOffers] = useState([]);
  const [oneOffer, setOneOffer] = useState({ characteristics: [], prices: [] });

  const [loading, setLoading] = useState({
    create: false,
    load: false,
    delete: false,
  });

  // const [modal, setModal] = useState(null);
  const [noticeMessage, setNoticeMessage] = useState("");

  const fetchOffers = async () => {
    setLoading({ ...loading, load: true });
    try {
      const { arrOffers } = await getAllOffersService();
      if (!offers.length) setOffers(arrOffers);
      setLoading({ ...loading, load: false });
    } catch (error) {
      setLoading({ ...loading, load: false });
    }
  };

  const handleDelete = async (offerID) => {
    setLoading({ ...loading, delete: true });
    try {
      const { success, message } = await deleteOfferService(offerID);
      if (success) setOffers((arr) => deleteItem(arr, offerID));
      setNoticeMessage(message);
      setLoading({ ...loading, delete: false });
    } catch (error) {
      setLoading({ ...loading, delete: false });
    }
  };

  const handleCreate = async (newOffer) => {
    setLoading({ ...loading, create: true });
    try {
      const { offer, success, message } = await createOfferService(newOffer);

      Object.assign(offer, { characteristics: [], prices: [] });

      if (success) setOffers((arr) => addItem(arr, offer));
      setNoticeMessage(message);
      setLoading({ ...loading, create: false });
    } catch (error) {
      setLoading({ ...loading, create: false });
    }
  };

  const handleUpdate = async (id, updated) => {
    try {
      setLoading({ ...loading, update: true });
      const { offer, success, message } = await updateOfferService(id, updated);
      if (success) {
        setOneOffer(offer);
        setOffers((arr) => updateItem(arr, offer));
      }
      setNoticeMessage(message);
      setLoading({ ...loading, update: false });
    } catch (error) {
      setLoading({ ...loading, update: false });
    }
  };

  const addCharacteristic = async (id, characteristic) => {
    try {
      setLoading({ ...loading, update: true });
      const { offer, success } = await addCharacteristicService(
        id,
        characteristic
      );

      if (success) {
        setOffers((arr) => updateItem(arr, offer));
        setOneOffer(offer);
      }
      setNoticeMessage("Added characteristic");
      setLoading({ ...loading, update: false });
    } catch (error) {
      setLoading({ ...loading, update: false });
    }
  };

  const deleteCharacteristic = async (id) => {
    try {
      const { success, message } = await deleteCharacteristicService(id);
      if (success) {
        const arrCharacteristics = deleteItem(oneOffer.characteristics, id);
        const updated = { ...oneOffer, characteristics: arrCharacteristics };

        setOffers((arr) => updateItem(arr, updated));
        setOneOffer(updated);
        setNoticeMessage(message);
      }
    } catch (error) {
      setNoticeMessage(error.message);
    }
  };

  const addPrice = async (id, price) => {
    try {
      setLoading({ ...loading, update: true });
      const { offer, success } = await addPriceService(id, price);

      if (success) {
        setOffers((arr) => updateItem(arr, offer));
        setOneOffer(offer);
      }
      setNoticeMessage("Added price");
      setLoading({ ...loading, update: false });
    } catch (error) {
      setLoading({ ...loading, update: false });
    }
  };

  const deletePrice = async (id) => {
    try {
      const { success, message } = await deletePriceService(id);
      if (success) {
        const arrPrices = deleteItem(oneOffer.prices, id);
        const updated = { ...oneOffer, prices: arrPrices };

        setOffers((arr) => updateItem(arr, updated));
        setOneOffer(updated);
        setNoticeMessage(message);
      }
    } catch (error) {
      setNoticeMessage(error.message);
    }
  };

  const findOffer = (id) => {
    const finded = offers.find((o) => o.id === id);
    setOneOffer(finded);
  };

  // const openModal = (child) => {
  //   setModal(child);
  // };

  // const closeModal = () => {
  //   setModal(null);
  // };

  // RESPONSE INTERCEPTOR
  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { message } = error.response.data;
      setNoticeMessage(message);

      return Promise.reject(error);
    }
  );

  const memoValues = useMemo(
    () => ({
      offers,
      oneOffer,
      findOffer,
      loading,
      handleDelete,
      handleCreate,
      handleUpdate,
      // openModal,
      // closeModal,
      noticeMessage,
      addCharacteristic,
      deleteCharacteristic,
      addPrice,
      deletePrice,
      setOneOffer,
    }),
    [offers, loading, oneOffer, findOffer]
  );

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <OfferContext.Provider value={memoValues}>
      {children}

      {/* <OfferModal open={!!modal} handleClose={closeModal}>
        {modal}
      </OfferModal> */}

      <OfferNotice message={noticeMessage} handleMessage={setNoticeMessage} />
    </OfferContext.Provider>
  );
};

OfferProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { OfferProvider, OfferContext };
