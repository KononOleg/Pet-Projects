export class Input {
  readonly element: HTMLInputElement;

  constructor(type: string, style: string) {
    this.element = document.createElement('input');
    this.element.classList.add(style);
    this.element.setAttribute('type', `${type}`);
  }
}
