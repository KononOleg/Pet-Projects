import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Page } from "./page/Page.tsx";
import { store } from "./shared/store/store";

window.onload = () => {
  const app = document.createElement("div");
  document.body.append(app);
  document.body.classList.add("body");
  app.classList.add("page__container");
  ReactDOM.render(
    <Provider store={store}>
      <Page />
    </Provider>,
    app
  );
};
