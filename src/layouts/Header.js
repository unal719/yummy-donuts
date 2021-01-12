import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <h1>Welcome Yummy Donuts</h1>
      <nav>
        <NavLink to="/" activeClassName="active" exact>
          Menu
        </NavLink>

        <NavLink to="/donuts" activeClassName="active">
          Donuts
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
