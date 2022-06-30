const offersAdapter = ({ data } = {}) => ({
  arrOffers: data?.data,
  success: data?.success,
  error: data?.error,
});

const offerAdapter = ({ data } = {}) => ({
  offer: data?.data,
  success: data?.success,
  error: data?.error,
  message: data?.message,
});

export { offersAdapter, offerAdapter };
