const priceAdapter = ({ data } = {}) => ({
  success: data?.data.deleted,
  message: data?.message,
  error: !data?.data.deleted,
});

export default priceAdapter;
