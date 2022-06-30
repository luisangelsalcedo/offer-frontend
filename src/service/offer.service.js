import {
  characteristicAdapter,
  priceAdapter,
  offersAdapter,
  offerAdapter,
} from "../adapters";

import httpClient from "../client";

const getAllOffersService = async () => {
  const result = await httpClient.get(`api/offer`);
  return offersAdapter(result);
};

const createOfferService = async (offer) => {
  const result = await httpClient.post(`api/offer`, offer);
  return offerAdapter(result);
};

const getOfferService = async (id) => {
  const result = await httpClient.get(`api/offer/${id}`);
  return offerAdapter(result);
};

const deleteOfferService = async (id) => {
  const result = await httpClient.delete(`api/offer/${id}`);
  return offerAdapter(result);
};

const updateOfferService = async (id, offer) => {
  const result = await httpClient.put(`api/offer/${id}`, offer);
  return offerAdapter(result);
};

const addCharacteristicService = async (id, characteristic) => {
  const result = await httpClient.post(
    `api/offer/${id}/characteristic`,
    characteristic
  );
  return offerAdapter(result);
};

const addPriceService = async (id, price) => {
  const result = await httpClient.post(`api/offer/${id}/price`, price);
  return offerAdapter(result);
};

const deleteCharacteristicService = async (id) => {
  const result = await httpClient.delete(`api/characteristic/${id}`);
  return characteristicAdapter(result);
};

const deletePriceService = async (id) => {
  const result = await httpClient.delete(`api/price/${id}`);
  return priceAdapter(result);
};

export {
  getAllOffersService,
  createOfferService,
  getOfferService,
  deleteOfferService,
  updateOfferService,
  addCharacteristicService,
  addPriceService,
  deleteCharacteristicService,
  deletePriceService,
};
