import "./styles.scss";
import { App } from "./components/app";

window.onload = () => {
  const appElement = document.querySelector("body");
  if (!appElement) throw Error("error");
  new App(appElement);
};
