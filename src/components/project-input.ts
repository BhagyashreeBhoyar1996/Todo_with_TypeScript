import { Component } from "./base-component";
import { autobind } from "../decorators/autobind";
import { validatable, validate } from '../util/validation';
import { projectState } from "../state/project-state";

     // ProjectInpunt Class
  export class ProjectInpunt extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
      const enterTitle = this.titleInputElement.value;
      const enterDescription = this.descriptionInputElement.value;
      const enterPeople = this.peopleInputElement.value;

      const titleValidable: validatable = {
        value: enterTitle,
        required: true,
      };

      const descriptionValidable: validatable = {
        value: enterDescription,
        required: true,
        minLength: 5,
      };

      const peopleValidable: validatable = {
        value: +enterPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidable) ||
        !validate(descriptionValidable) ||
        !validate(peopleValidable)
      ) {
        alert("Invalid input, Please try again!");
      } else {
        return [enterTitle, enterDescription, +enterPeople];
      }
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    @autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }
  }