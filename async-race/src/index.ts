import { Menu } from "./pages/Menu/Menu";

window.onload = () => {
  const menu = new Menu();
  document.body.prepend(menu.element);
  document.body.classList.add("body");
};
