const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = 5000;

let donuts = [
  {
    id: 0,
    inStock: true,
    price: 1.25,
    quantity: 10,
    name: "Rome Cream Donut",
  },
  {
    id: 1,
    inStock: true,
    price: 1.75,
    quantity: 3,
    name: "Chocolate & Sour Cherry Donut",
  },
  {
    id: 2,
    inStock: true,
    price: 2.5,
    quantity: 7,
    name: "Chocolate Ring Donut",
  },
  {
    id: 3,
    inStock: true,
    price: 1.55,
    quantity: 10,
    name: "Cherry Ring Donut",
  },
  {
    id: 4,
    inStock: true,
    price: 1.9,
    quantity: 14,
    name: "Double Chocolate Donut",
  },
  {
    id: 5,
    inStock: true,
    price: 4.75,
    quantity: 10,
    name: "Double Cherry Donut",
  },
  {
    id: 6,
    inStock: true,
    price: 3.45,
    quantity: 10,
    name: "Double Caramel Donut",
  },
  {
    id: 7,
    inStock: true,
    price: 2.95,
    quantity: 10,
    name: "Apple & Cinnamon Donut",
  },
  {
    id: 8,
    inStock: false,
    price: 5.99,
    quantity: 0,
    name: "Nut-Caramel & Cinnamon Donut",
  },
  {
    id: 9,
    inStock: false,
    price: 2.35,
    quantity: 0,
    name: "Caramel Ring Donut",
  },

  {
    id: 10,
    inStock: true,
    price: 1.15,
    quantity: 45,
    name: "Banana Ring Donut",
  },
  {
    id: 11,
    inStock: false,
    price: 1,
    quantity: 0,
    name: "Powdered Sugar Adana  Donut",
  },
  {
    id: 12,
    inStock: true,
    price: 2.65,
    quantity: 17,
    name: "Cherry Powdered Sugar Donut",
  },
  {
    id: 13,
    inStock: false,
    price: 1,
    quantity: 0,
    name: "Banana Powdered Sugar Donut",
  },
  {
    id: 14,
    inStock: true,
    price: 1,
    quantity: 9,
    name: "Sour Cherry Powdered Sugar Donut",
  },
  {
    id: 15,
    inStock: true,
    price: 1,
    quantity: 10,
    name: "Raspberry & Vanilla Donut",
  },
  {
    id: 16,
    inStock: false,
    price: 1,
    quantity: 0,
    name: "Vanilla Ring Donut",
  },
];

let yummyMenus = [];

app.get("/api/menu", (req, res) => {
  res.send(yummyMenus);
});

app.post("/api/menu", (req, res) => {
  const { ...rest } = req.body;
  const newMenuItem = {
    id:
      yummyMenus.reduce((prev, cur) => (cur.id > prev ? cur.id : prev), 0) + 1,
    ...rest,
  };

  yummyMenus.push(newMenuItem);

  res.send({ data: newMenuItem, result: "Success" });
});

app.delete("/api/menu/:id", (req, res) => {
  yummyMenus = yummyMenus.filter(
    (menuItem) => menuItem.id !== parseInt(req.params.id, 10)
  );
  res.status(204);
  res.send();
});

app.get("/api/donuts", (req, res) => {
  res.send(donuts);
});

app.get("/api/donuts/inStock", (req, res) => {
  const sotckItems = donuts.filter((donut) => donut.inStock);
  res.send(sotckItems);
});

app.get("/api/donut/:id", (req, res) => {
  const donut = donuts.find(
    (donut) => donut.id === parseInt(req.params.id, 10)
  );
  if (donut) {
    res.send(donut);
  } else {
    res.status(404);
    res.send({ error: "Donut not found" });
  }
});

app.put("/api/donut/:id", (req, res) => {
  const donutId = parseInt(req.params.id, 10);
  const { ...reqItem } = req.body;
  const updatedDonut = donuts.find((donut) => donut.id === donutId);
  if (reqItem.id === updatedDonut.id) {
    donuts = donuts.map((donut) => {
      if (donut.id === donutId) {
        return reqItem;
      } else {
        return donut;
      }
    });
    res.send({ result: "Success", message: "Donut updated" });
  } else {
    res.send({ result: "Fail", message: "Donut not found" });
  }
});

app.listen(port, () =>
  console.log(`Project ICE server listening on port ${port}!`)
);
