import { Main } from "../main/main";

export class Routing {
  private static instance: Routing;

  public static getInstance(): Routing {
    if (!Routing.instance) {
      Routing.instance = new Routing();
    }

    return Routing.instance;
  }

  private main: Main = new Main();

  render<T>(item: T) {
    this.main.element.innerHTML = "";
    const page = eval("new item()");
    this.main.element.prepend(page.element);
  }
}
