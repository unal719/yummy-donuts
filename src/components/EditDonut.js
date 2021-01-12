import React, { useState, useEffect, useRef } from "react";
import { getDonutItem, putDonutItem } from "../services/donutsServices";
import DonutImage from "./DonutImage";

const EditDonut = ({ match, history }) => {
  const isMounted = useRef(true);
  const [donutItem, setDonutItem] = useState({
    id: null,
    inStock: false,
    price: 0,
    quantity: 0,
    name: "",
  });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getDonutItem(match.params.donutId).then((donutItemData) => {
      if (isMounted.current) {
        console.log(donutItemData);
        setDonutItem(donutItemData);
      }
    });
  }, [match.params.donutId]);

  const onChangeHandler = (e) => {
    let newDonutItem = {
      ...donutItem,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    if (e.target.name === "quantity") {
      newDonutItem.inStock = e.target !== "0";
    }

    if (e.target.name === "inStock" && !e.target.checked) {
      newDonutItem.quantity = "0";
    }

    setDonutItem(newDonutItem);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    putDonutItem(donutItem).then(() => {
      navigateDonuts();
    });
  };

  const navigateDonuts = () => {
    history.push("/donuts");
  };

  return (
    donutItem.id !== null && (
      <section>
        <div className="donut-edit-container">
          <div className="read-only-container">
            <p>{donutItem.name}</p>
            <DonutImage donutId={donutItem.id} />
          </div>
          <div className="donut-form-container">
            <form onSubmit={onSubmitHandler}>
              <div className="form-field">
                <label htmlFor="inStock">In stock:</label>
                <input
                  id="inStock"
                  type="checkbox"
                  name="inStock"
                  checked={donutItem.inStock}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="quantity" className="quantity">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={donutItem.quantity}
                  onChange={onChangeHandler}
                >
                  <option value="0">0</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="price">Price: </label>
                <input
                  id="price"
                  type="number"
                  step="0.25"
                  name="price"
                  value={donutItem.price}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="form-footer">
                <button type="submit">Save</button>
                <button
                  type="button"
                  className="cancel"
                  onClick={navigateDonuts}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  );
};

export default EditDonut;
