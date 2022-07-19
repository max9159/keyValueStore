// It's a locker to prevent race conditions make sure GET/SET data thread-safe
class Locker {
  constructor() {
    this._locked = false;
    this._waiting = [];
  }

  lock() {
    var unlock = () => {
      var nextResolve;
      if (this._waiting.length > 0) {
        nextResolve = this._waiting.pop(0);
        if (this._waiting.length === 0)
          this._locked = false;

        nextResolve(unlock);
      } else {
        this._locked = false;
      }
    };
    if (this._locked) {
      return new Promise((resolve) => {
        this._waiting.push(resolve);
      });
    } else {
      this._locked = true;
      return new Promise((resolve) => {
        resolve(unlock);
      });
    }
  }
}
module.exports = {
  Locker,
};