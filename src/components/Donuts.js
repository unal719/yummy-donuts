import React, { useState, useEffect } from "react";
import { getDonuts } from "../services/donutsServices";
import DonutImage from "./DonutImage";

const Donuts = ({ history }) => {
  const [donuts, setDonutsList] = useState([]);
  useEffect(() => {
    getDonuts().then((donutsList) => {
      // console.log(donutsList);
      setDonutsList(donutsList);
    });
  }, []);

  const onItemClickHandler = (to) => {
    history.push(to);
  };

  return (
    <section>
      <h4>Donuts</h4>
      <ul className="donut-items">
        {donuts.map((donut) => {
          return (
            <li
              className="donut-item"
              key={donut.id}
              onClick={() => {
                onItemClickHandler(`/donut/${donut.id}`);
              }}
            >
              <div className="donut-card">
                <h4> {donut.name} </h4>
                {/* <img
                  src={`${
                    process.env.PUBLIC_URL
                  }/donuts-images/donuts-${donut.id.toString()}.PNG`}
                  alt=""
                /> */}
                <DonutImage donutId={donut.id} />
                <div className="stock-field">
                  <span className={`stock ${donut.inStock ? "in" : "out"}`}>
                    {donut.inStock ? "In" : "Out of "} stock
                  </span>
                  <span className="stock-quantity">{donut.quantity}</span>
                </div>
                <div className="price-field">
                  <span className="price-label">Price :</span>
                  <span className="price-value"> {donut.price}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Donuts;
