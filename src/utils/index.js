const capitalize = (name) => {
  const separator = "";
  const [first, ...res] = name.split(separator);
  return first.toUpperCase() + res.join(separator);
};

const deleteItem = (arr, itemID) => arr.filter((i) => i.id !== itemID);
const addItem = (arr, item) => [...arr, item];
const updateItem = (arr, updated) =>
  arr.map((i) => (i.id === updated.id ? updated : i));

export { capitalize, deleteItem, addItem, updateItem };
