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

  updateCount(event) {
    const value = event.target.value;
    this.countValue = parseInt(value, 10);
  }

  toggleLogging() {
    this.logValue = !this.logValue;
  }

  notify() {
    if (this.logValue) {
      console.log("Counter updated", this.countValue);
    }

    const event = new CustomEvent("counter-updated", { count: this.countValue });
    window.dispatchEvent(event);
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

    this.inputTarget.value = this.countValue;
  }

  countValueChanged() {
    this.notify();
    this.updateOutput();
  }
}

application.register("counter", CounterController);
