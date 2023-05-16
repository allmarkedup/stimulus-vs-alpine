window.counter = function (start = 0, max = 3) {
  return {
    count: start,
    log: false,

    get isError() {
      return this.count > max;
    },

    notify() {
      if (this.log) {
        console.log("Counter updated", this.count);
      }
      this.$dispatch("counter-updated", { count: this.count });
    },
  };
};
