(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Equalizer = factory();
  }

}(this, function () {
  'use strict';

  var
    $$ = document.querySelectorAll.bind(document),
    $ = document.querySelector.bind(document),

    AudioContext = window.AudioContext || window.webkitAudioContext;

  var Equalizer = function (param) {
    if (!AudioContext) {
      this.trigger('error', {
        message: 'AudioContext not supported'
      }, true);
      return;
    }

    /** AudioContext object */
    this.context = window.__context || new AudioContext();
    window.__context = this.context;

    //значения частот в Hz
    this.frequencies = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];

    this.length = this.frequencies.length;

    this.connected = false;

    this.initInputs(param);

    this.createFilters();
    this.initInputsAttrs();
    this.initEvents();
    this.connectEqualizer();
  };

  addPubsub(Equalizer);

  Equalizer.prototype.createInputs = function (container) {
    var
      inputs = [],
      node,
      i;

    for (i = 0; i < this.length; i++) {
      node = document.createElement('input');
      container.appendChild(node);
      inputs.push(node);
    }

    return inputs;
  };

  Equalizer.prototype.initInputsAttrs = function () {
    [].forEach.call(this.inputs, function (item) {
      item.setAttribute('min', -16);
      item.setAttribute('max', 16);
      item.setAttribute('step', 0.1);
      item.setAttribute('value', 0);
      item.setAttribute('type', 'range');
    });
  };

  Equalizer.prototype.initEvents = function () {
    var
      self = this;

    [].forEach.call(this.inputs, function (item, i) {
      item.addEventListener('change', function (e) {
        self.filters[i].gain.value = e.target.value;

        self.trigger('change', {
          value: e.target.value,
          inputElement: e.target,
          index: i
        });
      }, false);
    });
  };

  Equalizer.prototype.createFilter = function (frequency) {
    var filter = this.context.createBiquadFilter();
    filter.type = 'peaking';
    filter.frequency.value = frequency;
    filter.gain.value = 0;
    filter.Q.value = 1;
    return filter;
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // var distortion = this.context.createWaveShaper();

  // function makeDistortionCurve(amount) {
  //   var k = typeof amount === 'number' ? amount : 50,
  //     n_samples = 44100,
  //     curve = new Float32Array(n_samples),
  //     deg = Math.PI / 180,
  //     i = 0,
  //     x;
  //   for (; i < n_samples; ++i) {
  //     x = i * 2 / n_samples - 1;
  //     curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
  //   }
  //   return curve;
  // };
  // distortion.curve = makeDistortionCurve(400);
  // distortion.oversample = '4x';

  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////



  Equalizer.prototype.createFilters = function () {
    // cозданем фильтры
    this.filters = this.frequencies.map(this.createFilter.bind(this));
    // цепляем их последовательно
    // каждый фильтр, кроме первого, соединяется с предыдущим
    this.filters.reduce(function (prev, curr) {
      prev.connect(curr);
      return curr;
    });
  };

  Equalizer.prototype.initInputs = function (param) {
    if (!param) {
      throw new TypeError('equalizer: param required');
    }

    var
      container,
      inputs = [];

    if (param.audio instanceof HTMLMediaElement) {
      this.audio = param.audio;
    } else if (typeof param.audio === 'string') {
      this.audio = $(param.audio);

      if (!this.audio) {
        throw new TypeError('equalizer: there\'s no element that match selector' +
          param.audio);
      }
    } else {
      throw new TypeError('equalizer: parameter "audio" must be string or an audio element');
    }

    if (param.container) {
      if (typeof param.container === 'string') {
        container = $(param.container);
        if (!container) {
          throw new TypeError('equalizer: there\'s no element that match selector' +
            param.container);
        }
      } else if (param.container instanceof HTMLElement) {
        container = param.container;
      } else if (param.container.jquery && param.container[0]) {
        container = param.container[0];
      } else {
        throw new TypeError('equalizer: invalid parameter container: ' + param.container);
      }

      inputs = this.createInputs(container);
    } else {
      if (typeof param.inputs === 'string') {
        inputs = $$(param.inputs);
      } else if (param.inputs instanceof NodeList) {
        inputs = param.inputs;
      } else if (param.inputs.jquery) {
        param.inputs.each(function (i, item) {
          inputs.push(item);
        });
      } else {
        throw new TypeError('equalizer: invalid parameter inputs: ' + param.container);
      }
    }

    if (inputs.length !== this.length) {
      throw new TypeError('equalizer: required exactly ' + this.length + ' elements, but ' +
        inputs.length + ' found');
    }

    this.inputs = inputs;
  };

  //создание цепи
  Equalizer.prototype.connectEqualizer = function () {

    this.source = this.context.createMediaElementSource(this.audio);

    //подключаемся к выходу
    this.source.connect(this.filters[0]);
    this.filters[this.length - 1].connect(this.context.destination);
  };

  //выключение
  Equalizer.prototype.disconnect = function () {
    if (!this.connected) {
      return this;
    }

    this.trigger('disconnect', {});
    this.source.disconnect();
    this.source.connect(this.destination);

    return this;
  };

  //включение
  Equalizer.prototype.connect = function () {
    if (this.connected) {
      return this;
    }

    this.trigger('connect', {});
    this.source.disconnect();
    this.source.connect(this.filters[0]);

    return this;
  };

  return Equalizer;
}));
