import axios from "axios";

export const getDonuts = () => {
  return axios.get("/api/donuts").then((response) => {
    return response.data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  });
};

export const getDonutsInStock = () => {
  return axios.get("/api/donuts/inStock").then((response) => {
    return response.data.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  });
};

export const getDonutItem = (id) => {
  return axios
    .get(`/api/donut/${id}`)
    .then((donutItem) => donutItem.data)
    .catch((err) => {
      throw err;
    });
};

export const putDonutItem = (donutItem) => {
  return axios
    .put(`/api/donut/${donutItem.id.toString()}`, donutItem)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};

export const addYummyMenu = (yummyMenu) => {
  return axios
    .post("/api/menu", yummyMenu)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const deleteMenuItem = (id) => {
  return axios.delete(`/api/menu/${id.toString()}`);
};

export const getYummyMenus = () => {
  return axios
    .get("/api/menu")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
