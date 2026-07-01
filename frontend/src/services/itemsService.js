import api from "./api";

export const createReadingItem = async (itemData) => {
  const { data } = await api.post("/items", itemData);
  return data.item;
};

export const getReadingItems = async () => {
  const { data } = await api.get("/items");
  return data.items;
};

export const getReadingItemById = async (itemId) => {
  const { data } = await api.get(`/items/${itemId}`);
  return data.item;
};

export const updateReadingItem = async (itemId, updatedData) => {
  const { data } = await api.put(`/items/${itemId}`, updatedData);
  return data.newItem;
};

export const deleteReadingItem = async (itemId) => {
  const response = await api.delete(`/items/${itemId}`);
  return response.status === 204;
};
