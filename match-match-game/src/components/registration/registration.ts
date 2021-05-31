import "./registration.scss";
import { Basecomponent } from "../../shared/base-component";
import { InputField } from "../../shared/InputField/InputField";
import { Header } from "../header/header";
import { Button } from "../../shared/Button/Button";
import { Player } from "./Player/Player";
let isValidFirstName = false,
  isValidLastName = false,
  isValidEmail = false;
export class Registration extends Basecomponent {
  private reg__wrapper: Basecomponent = new Basecomponent("div", ["reg__wrapper"]);
  private reg__form: Basecomponent = new Basecomponent("form", ["reg__form"]);

  private inputFirstName: InputField = new InputField("First Name");
  private inputLastName: InputField = new InputField("Last Name");
  private inputEmail: InputField = new InputField("Email");
  private avatar = document.createElement("img");
  private submit: Button = new Button("add user", "inputSubmit", "submit");
  private cancel: Button = new Button("cancel", "inputCancel", "button");
  private reg_title: Basecomponent = new Basecomponent("h2", ["reg__title"]);
  private button_wrapper: Basecomponent = new Basecomponent("div", ["button__wrapper"]);
  private avatar_edit: Basecomponent = new Basecomponent("div", ["avatar-edit"]);
  private fileInput = document.createElement("input");
  private label = document.createElement("label");
  constructor() {
    super("div", ["registration"]);
    this.element.appendChild(this.reg__wrapper.element);
    this.reg__wrapper.element.appendChild(this.reg_title.element);
    this.reg_title.element.innerHTML = "Registr new Player";
    this.reg__wrapper.element.appendChild(this.reg__form.element);
    this.reg__form.element.appendChild(this.inputFirstName.element);
    this.reg__form.element.appendChild(this.inputLastName.element);
    this.reg__form.element.appendChild(this.inputEmail.element);
    this.reg__form.element.appendChild(this.button_wrapper.element);
    this.button_wrapper.element.appendChild(this.submit.element);
    this.button_wrapper.element.appendChild(this.cancel.element);
    this.submit.element.classList.add("disabled");
    this.reg__form.element.appendChild(this.avatar_edit.element);
    this.avatar_edit.element.appendChild(this.avatar);
    this.fileInput.setAttribute("type", "file");
    this.fileInput.setAttribute("id", "avatar");
    this.avatar_edit.element.appendChild(this.fileInput);
    this.avatar.src = Player.Avatar;
    this.avatar.classList.add("avatar");
    this.avatar_edit.element.appendChild(this.label);
    this.label.setAttribute("for", "avatar");

    this.reg__form.element.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      this.element.remove();
      Player.FirstName = this.inputFirstName.getValue();
      Player.LastName = this.inputLastName.getValue();
      Player.Email = this.inputEmail.getValue();
      Player.Avatar = this.avatar.src;
      console.log(Player.Avatar);
      Header.createPlayButton();
    });
    this.cancel.element.addEventListener("mousedown", (event: Event) => {
      event.preventDefault();
      this.element.remove();
      this.inputFirstName.resetValue();
      this.inputLastName.resetValue();
      this.inputEmail.resetValue();
      this.avatar.src = Player.Avatar;
    });

    this.fileInput.addEventListener("change", () => {
      let file;
      if (this.fileInput.files) {
        file = this.fileInput.files[0];

        const reader = new FileReader();
        reader.onload = () => {
          this.avatar.src = String(reader.result);
        };
        reader.readAsDataURL(file);
      }
    });

    this.inputFirstName.element.addEventListener("input", () => {
      if (this.inputFirstName.getValue() == "") {
        isValidFirstName = false;
        this.setError(this.inputFirstName, "First Name cannot be blank");
      } else if (!this.isLength(this.inputFirstName)) {
        isValidFirstName = false;
        this.setError(this.inputFirstName, "First Name must be less than 30 characters");
      } else if (!this.isName(this.inputFirstName)) {
        isValidFirstName = false;
        this.setError(this.inputFirstName, "First Name must be composed of words");
      } else {
        isValidFirstName = true;
        this.setSuccess(this.inputFirstName);
      }
    });

    this.inputLastName.element.addEventListener("input", () => {
      if (this.inputLastName.getValue() == "") {
        isValidLastName = false;
        this.setError(this.inputLastName, "Last Name cannot be blank");
      } else if (!this.isLength(this.inputLastName)) {
        isValidLastName = false;
        this.setError(this.inputLastName, "Last Name must be less than 30 characters");
      } else if (!this.isName(this.inputLastName)) {
        isValidLastName = false;
        this.setError(this.inputLastName, "Last Name must be composed of words");
      } else {
        isValidLastName = true;
        this.setSuccess(this.inputLastName);
      }
    });

    this.inputEmail.element.addEventListener("input", () => {
      if (this.inputEmail.getValue() == "") {
        isValidEmail = false;
        this.setError(this.inputEmail, "Email cannot be blank");
      } else if (!this.isLength(this.inputEmail)) {
        isValidEmail = false;
        this.setError(this.inputEmail, "Email must be less than 30 characters");
      } else if (!this.isEmail(this.inputEmail)) {
        isValidEmail = false;
        this.setError(this.inputEmail, "invalid Email");
      } else {
        isValidEmail = true;
        this.setSuccess(this.inputEmail);
      }
    });
  }
  setError(input: InputField, error: string) {
    input.element.className = "inputContainer Error";
    input.SetError(error);
    this.updateDisabledButton();
  }
  setSuccess(input: InputField) {
    input.element.className = "inputContainer Success";
    this.updateDisabledButton();
  }
  isLength(input: InputField): boolean {
    if (input.getValue().length > 30) return false;
    else return true;
  }
  updateDisabledButton() {
    if (isValidFirstName && isValidLastName && isValidEmail) {
      this.submit.element.classList.remove("disabled");
    } else {
      this.submit.element.classList.add("disabled");
    }
  }
  isName(Name: InputField): boolean {
    /* return /^\D*$/.test(Name.getValue()); */
    /* return /\p{L}+/.test(Name.getValue()); */
    return /^[^(~ ! @ # $ % * () _ — + = | : ; " ' ` < > , . ? / ^0-9)]*$/.test(Name.getValue());
  }

  isEmail(Email: InputField): boolean {
    return /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u.test(Email.getValue());
  }
}
