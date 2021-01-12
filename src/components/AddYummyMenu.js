import React, { useState, useEffect } from "react";
import { addYummyMenu, getDonutsInStock } from "../services/donutsServices";
import DonutImage from "./DonutImage";

const AddYummyMenu = ({ history }) => {
  const [stockDonuts, setStockDonuts] = useState([]);
  const [yummyMenu, setYummyMenu] = useState({
    name: "",
    donuts: [],
    totalPrice: 0,
  });
  useEffect(() => {
    getDonutsInStock().then((stockDonutList) => {
      console.log(stockDonutList);
      setStockDonuts(stockDonutList);
    });
  }, []);

  const addDonutItem = (donut) => {
    const inStatus = checkDonutIsInMenu(donut.id);
    if (inStatus) {
      const availableStock = checkDonutStock(donut.id);
      if (availableStock) {
        const menuDonut = yummyMenu.donuts.find(
          (donutItem) => donutItem.id === donut.id
        );

        let { count } = menuDonut;
        count++;
        const newMenuDonut = { ...menuDonut, count };
        let menuDonuts = [...yummyMenu.donuts];
        menuDonuts = menuDonuts.map((menuItem) => {
          if (menuItem.id === newMenuDonut.id) {
            return newMenuDonut;
          }
          return menuItem;
        });
        setYummyMenu({ ...yummyMenu, donuts: [...menuDonuts] });
      }
    } else {
      const menuDonut = {
        id: donut.id,
        name: donut.name,
        price: donut.price,
        count: 1,
      };

      const menuDonuts = [...yummyMenu.donuts];
      menuDonuts.push(menuDonut);
      setYummyMenu({ ...yummyMenu, donuts: [...menuDonuts] });
      console.log(yummyMenu);
    }
  };

  const decraseDonutItem = (donut) => {
    const menuDonut = yummyMenu.donuts.find(
      (donutItem) => donutItem.id === donut.id
    );

    let { count } = menuDonut;
    count--;
    const newMenuDonut = { ...menuDonut, count };
    let menuDonuts = [...yummyMenu.donuts];
    menuDonuts = menuDonuts.map((menuItem) => {
      if (menuItem.id === newMenuDonut.id) {
        return newMenuDonut;
      }
      return menuItem;
    });
    menuDonuts = menuDonuts.filter((item) => item.count > 0);
    setYummyMenu({ ...yummyMenu, donuts: [...menuDonuts] });
  };

  const checkDonutIsInMenu = (donutId) => {
    if (yummyMenu.donuts.length <= 0) {
      return false;
    }
    if (
      yummyMenu.donuts.findIndex((donutItem) => donutItem.id === donutId) >= 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkDonutStock = (donutId) => {
    const donutStock = stockDonuts.find((donut) => donut.id === donutId)
      .quantity;
    const yummyMenuDonutCount = yummyMenu.donuts.find(
      (donut) => donut.id === donutId
    ).count;

    if (yummyMenuDonutCount + 1 <= donutStock) {
      return true;
    } else {
      return false;
    }
  };

  const onChangeHandler = (e) => {
    let newYummyMenuItem = {
      ...yummyMenu,
      [e.target.name]: e.target.value,
    };

    setYummyMenu(newYummyMenuItem);
  };

  const getMenuTotalPrice = () => {
    let totalPrice = 0;
    if (yummyMenu.donuts.length <= 0) {
      return 0;
    }
    yummyMenu.donuts.map((item) => {
      totalPrice = totalPrice + item.count * item.price;
    });

    return totalPrice;
  };

  const removeDonutFromMenu = (menuDonutId) => {
    let newDonutList = yummyMenu.donuts.filter((item) => {
      if (item.id !== menuDonutId) {
        return item;
      }
    });

    let newYummyMenuItem = {
      ...yummyMenu,
      donuts: [...newDonutList],
    };

    setYummyMenu(newYummyMenuItem);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const totalPrice = getMenuTotalPrice();
    const reqBodyData = {
      ...yummyMenu,
      ...{ totalPrice },
    };
    addYummyMenu(reqBodyData).then((res) => {
      history.push("/");
    });
  };

  return (
    <section>
      <div className="add-yummy-container">
        <div className="donuts-container">
          {stockDonuts.length > 0 &&
            stockDonuts.map((donutItem) => {
              return (
                <div className="donut-card" key={donutItem.id}>
                  <div className="card-image">
                    <DonutImage donutId={donutItem.id} />
                    <button
                      className="donut-button add"
                      onClick={() => addDonutItem(donutItem)}
                    >
                      +
                    </button>
                    {checkDonutIsInMenu(donutItem.id) && (
                      <>
                        <span className="donut-quantity">
                          {
                            yummyMenu.donuts.find(
                              (donutInMenu) => donutItem.id === donutInMenu.id
                            ).count
                          }
                        </span>
                        <button
                          className="donut-button delete"
                          onClick={() => decraseDonutItem(donutItem)}
                        >
                          -
                        </button>
                      </>
                    )}
                    {checkDonutIsInMenu(donutItem.id) &&
                      donutItem.quantity ===
                        yummyMenu.donuts.find(
                          (donutInMenu) => donutItem.id === donutInMenu.id
                        ).count && (
                        <div className="no-stock-overlay">No Stock</div>
                      )}
                  </div>
                  <div className="card-detail">
                    <p> {donutItem.name} </p>
                    <span className="price-value"> {donutItem.price} </span>
                  </div>
                </div>
              );
            })}
        </div>
        {yummyMenu.donuts.length > 0 && (
          <div className="yummy-form-container">
            <ul className="menu-donut-items">
              {yummyMenu.donuts.map((item) => {
                return (
                  <li key={item.id} className="menu-donut-item">
                    <DonutImage donutId={item.id} />
                    <p> {item.name} </p>
                    <span className="price-value">
                      {" "}
                      {item.count * item.price}{" "}
                    </span>
                    <button
                      className="remove-item-menu"
                      onClick={() => removeDonutFromMenu(item.id)}
                    >
                      -
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="total-price-field">
              <p>Total Price</p>
              <span className="price-value"> {getMenuTotalPrice()} </span>
            </div>

            <form onSubmit={onSubmitHandler}>
              <div className="form-field">
                <label htmlFor="name">Menu Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={yummyMenu.name}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-footer">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddYummyMenu;
