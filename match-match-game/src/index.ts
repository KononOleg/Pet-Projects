import "./styles.scss";
import { App } from "./components/app";

window.onload = () => {
  const appElement = document.body;
  appElement?.classList.add("body");
  if (!appElement) throw Error("error");
  const app = new App(appElement);
};
