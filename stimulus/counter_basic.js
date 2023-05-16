const application = Stimulus.Application.start();

class CounterController extends Stimulus.Controller {
  static targets = ["output"];
  static classes = ["error", "valid"];
  static values = {
    count: { type: Number, default: 0 },
    log: { type: Boolean, default: false },
    max: { type: Number, default: 3 },
  };

  get isError() {
    return this.countValue > this.maxValue;
  }

  connect() {
    this.countValueChanged();
  }

  addOne() {
    this.countValue++;
  }

  updateOutput() {
    // update the text
    this.outputTarget.innerText = this.countValue;

    // update the classes
    const elementClasses = this.element.classList;

    if (this.isError) {
      elementClasses.add(...this.errorClasses);
      elementClasses.remove(...this.validClasses);
    } else {
      elementClasses.remove(...this.errorClasses);
      elementClasses.add(...this.validClasses);
    }
  }

  countValueChanged() {
    this.updateOutput();
  }
}

application.register("counter", CounterController);
