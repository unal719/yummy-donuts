import React, { useState, useEffect } from "react";
import { getYummyMenus, deleteMenuItem } from "../services/donutsServices";
import DonutImage from "./DonutImage";

const YummyMenu = ({ history }) => {
  const [menuList, setMenuList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    getYummyMenus().then((resData) => {
      setMenuList(resData);
      setIsLoaded(true);
      setTimeout(() => {
        console.log(menuList);
      }, 2500);
    });
  }, []);

  const navigateCreateMenu = () => {
    history.push("/add-menu");
  };

  const onDeleteHandler = (menuItemId) => {
    deleteMenuItem(menuItemId).then(() => {
      const newYummyMenus = menuList.filter(
        (menuItem) => menuItemId !== menuItem.id
      );
      setMenuList(newYummyMenus);
    });
  };
  return (
    <section>
      <div className="yummy-menu-container">
        {menuList.length > 0 ? (
          <div className="yummy-menu-list-container">
            <p>Delicious Yummy Menu's for You</p>
            <ul className="menu-list-items-container">
              {menuList.map((menuItem) => {
                return (
                  <li key={menuItem.id} className="menu-list-item-container">
                    <div className="left-container">
                      <ul className="menu-donuts-list">
                        {menuItem.donuts.map((donutItem) => {
                          return (
                            <li
                              key={donutItem.id}
                              className="menu-donut-list-item"
                            >
                              <DonutImage donutId={donutItem.id} />
                              <span> {donutItem.name} </span>
                              <span className="quantity-badge">
                                {donutItem.count}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="right-container">
                      <div className="image-container"></div>
                      <div className="info-container">
                        <p> {menuItem.name} </p>
                        <span className="price-value">
                          {" "}
                          {menuItem.totalPrice}{" "}
                        </span>
                      </div>
                    </div>
                    <button
                      className="delete-menu-item-button"
                      onClick={() => onDeleteHandler(menuItem.id)}
                    >
                      Delete Menu
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="add-menu" onClick={navigateCreateMenu}>
              <i className="add-icon"></i>
            </div>
          </div>
        ) : isLoaded ? (
          <div className="no-yummy-menu-container">
            <h2>No available menu! do you want to add a new one? </h2>
            <div className="add-menu" onClick={navigateCreateMenu}>
              <i className="add-icon"></i>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default YummyMenu;
