import api from "./api";

export const createReadingItem = async (itemData) => {
  const { data } = await api.post("/items", itemData);
  return data;
};

export const getReadingItems = async () => {
  const { data } = await api.get("/items");
  return data;
};

export const getReadingItemById = async (itemId) => {
  const { data } = await api.get(`/items/${itemId}`);
  return data;
};

export const updateReadingItem = async (itemId, updatedData) => {
  const { data } = await api.put(`items/${itemId}`, updatedData);
  return data;
};

export const deleteReadingItem = async (itemId) => {
  const { data } = await api.delete(`items/${itemId}`);
  return data;
};
