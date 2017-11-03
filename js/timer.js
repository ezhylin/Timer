class Timer {

  constructor(element, options) {
    this.timer = element;
    this.options = options;

    Timer._delay = 500;

    Timer._diff = null;

    Timer._refs = { // Todo
      hours: this.timer.getElementsByClassName('hours')[0],
      minutes: this.timer.getElementsByClassName('minutes')[0],
      seconds: this.timer.getElementsByClassName('seconds')[0],
    };

    this._init();
  }

  _init() {
    const _this = this;
    let timerId = null;

    _this._handleStart(_this.options.onStart);

    setTimeout(function tick() {
      Timer._diff = _this.options.expirationTime - Date.now();

      if (Timer._diff <= 0) {
        _this._handleEnd(timerId, _options.onEnd);
        return;
      }

      _this._renderTimer(Timer._diff);
      _this._highlight(_this.options.highlightClassName);

      timerId = setTimeout(tick, Timer._delay);
    }, 0);
  }

  _handleStart(callback) {
    if (typeof callback === 'function') {
      callback.call(this);
    }
  }

  _handleEnd(timerId, callback) {
    clearTimeout(timerId);

    if (typeof callback === 'function') {
      callback.call(this);
    }
  }

  _renderTimer(ms) {
    const time = this._convertMsToTime(ms);

    Object.keys(time).forEach(item => {
      Timer._refs[item].innerHTML = time[item];
    });

    this._highlight('highlight');
  }

  _convertMsToTime(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);

    return {
      hours: this._formatTimeUnit(h % 24),
      minutes: this._formatTimeUnit(m % 60),
      seconds: this._formatTimeUnit(s % 60),
    };
  }

  _formatTimeUnit(timeUnit) {
    return timeUnit > 9 ? timeUnit.toString() : `0${timeUnit}`;
  }

  _highlight(className) {
    if (Timer._diff < this.options.highlightTime) {
      Timer._refs.seconds.classList.add(className);
    } else {
      Timer._refs.seconds.classList.remove(className);
    }
  }
}
