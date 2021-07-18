import "./AdminPage.scss";
import React from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Categories } from "./Categories/Categories.tsx";
import { Cards } from "./Cards/Cards.tsx";
import { IRootState } from "../../shared/store/store";

export function AdminPage(): JSX.Element {
  const isAutheticated = useSelector((state: IRootState) => state.isAutheticated.isAutheticated);

  return (
    <div className="AdminPage__wrapper">
      <div className="admin__header">
        <div style={{ display: "flex", gap: "25px" }}>
          <NavLink to="/admin/categories" className="admin__nav-link" activeClassName="admin__nav-link_active ">
            Categories
          </NavLink>
          <NavLink to="/admin/words" className="admin__nav-link admin__nav-link_not-active" activeClassName="admin__nav-link_active">
            Words
          </NavLink>
        </div>
        <NavLink to="/" className="admin__nav-link">
          Logout
        </NavLink>
      </div>
      <Route path="/admin/categories" render={() => (isAutheticated ? <Categories /> : <Redirect to="/" />)} />
      <Route path="/admin/words/:category" render={(props) => (isAutheticated ? <Cards {...props} /> : <Redirect to="/" />)} />
    </div>
  );
}
