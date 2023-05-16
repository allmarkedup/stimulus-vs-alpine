window.counter = function (start = 0, max = 3) {
  return {
    count: start,

    get isError() {
      return this.count > max;
    },
  };
};
