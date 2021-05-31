import { Database } from "./Database/Database";
import { Header } from "./header/header";

export class App {
  private readonly header: Header;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.rootElement.prepend(this.header.element);
    Database.getInstance().init();
  }
}
