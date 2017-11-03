'use strict';

console.log('demo');

document.addEventListener('DOMContentLoaded', function (e) {
  var timer = new Timer(document.getElementById('js_timer'), {
    expirationTime: Date.now() + 1000 * 15,
    highlightTime: 10000,
    highlightClassName: 'highlight',
    onStart: function () {
      alert();
    },
    onEnd: function () {
      alert();
    },
  });
});
