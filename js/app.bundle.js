/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _tinyRandom = __webpack_require__(1);

	var _tinyRandom2 = _interopRequireDefault(_tinyRandom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// webpack --progress --colors --watch
	// http-server -o

	var rnd = new _tinyRandom2.default();

	var App = function () {
	  function App() {
	    var _this = this;

	    _classCallCheck(this, App);

	    this.ctx = document.getElementById('cnv').getContext('2d');
	    this.sizeCanvas();
	    window.requestAnimationFrame(function (t) {
	      return _this.draw(t);
	    });
	  }

	  _createClass(App, [{
	    key: 'sizeCanvas',
	    value: function sizeCanvas() {
	      this.w = this.ctx.canvas.width = window.innerWidth;
	      this.h = this.ctx.canvas.height = window.innerHeight;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(t) {
	      var _this2 = this;

	      //this.ctx.clearRect(0,0,this.w,this.h);
	      window.requestAnimationFrame(function (t) {
	        return _this2.draw(t);
	      });
	      for (var i = 1; i <= 10; i++) {
	        this.ctx.fillRect(rnd.int(0, this.w), rnd.int(0, this.h), rnd.int(1, 30), rnd.int(1, 30));
	      }
	      //console.log(t);
	    }
	  }]);

	  return App;
	}();

	var app = new App();
	window.onresize = function (e) {
	  return app.sizeCanvas();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*!
	 * Random JavaScript Library v1.0.0
	 * Jeremy Zevin
	 *
	 * Released under the MIT license
	 * http://opensource.org/licenses/MIT
	 *
	 * Date: 7/8/16
	 *
	 */
	"use strict";
	var Random = (function () {
	    function Random() {
	        this.native = Math.random;
	        this.uniq = this.unique;
	    }
	    //random integer beyween min and max
	    Random.prototype.int = function (min, max) {
	        if (min === void 0) { min = 0; }
	        if (max === void 0) { max = 1; }
	        return Math.floor(this.native() * (max - min + 1) + min);
	    };
	    //random real number between min and max
	    Random.prototype.real = function (min, max) {
	        if (min === void 0) { min = 0.0; }
	        if (max === void 0) { max = 1.0; }
	        return this.native() * (max - min) + min;
	    };
	    //random pick from an array
	    Random.prototype.pick = function (array) {
	        return array[this.int(0, array.length - 1)];
	    };
	    //boolean result based on result of expression
	    Random.prototype.chance = function (percent) {
	        if (percent === void 0) { percent = 10; }
	        return percent / 100 > this.native() ? true : false;
	    };
	    //random color rgb,rgba,hsl,hsla,hex
	    Random.prototype.color = function (operation) {
	        if (operation === void 0) { operation = "rgb"; }
	        if (operation === 'hex') {
	            var out = "#";
	            for (var i = 0; i <= 5; i++) {
	                out += this.pick([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]);
	            }
	            return out;
	        }
	        else if (operation === 'rgba') {
	            return "rgba(" + this.int(0, 255) + "," + this.int(0, 255) + "," + this.int(0, 255) + "," + this.native() + ")";
	        }
	        else if (operation === 'hsl') {
	            return "hsl(" + this.int(0, 360) + "," + this.int(0, 100) + "%," + this.int(0, 100) + "%)";
	        }
	        else if (operation === 'hsla') {
	            return "hsla(" + this.int(0, 360) + "," + this.int(0, 100) + "%," + this.int(0, 100) + "%," + this.native() + ")";
	        }
	        else {
	            return "rgb(" + this.int(0, 255) + "," + this.int(0, 255) + "," + this.int(0, 255) + ")";
	        }
	    };
	    Random.prototype.unique = function (array, howMany) {
	        if (howMany === void 0) { howMany = 0; }
	        if (howMany > array.length)
	            return false;
	        if (howMany === 0)
	            howMany = array.length;
	        var results = [];
	        while (results.length < howMany) {
	            var randomObj = this.pick(array);
	            var found = false;
	            for (var i = 0; i < results.length; i++) {
	                if (results[i] == randomObj) {
	                    found = true;
	                    break;
	                }
	            }
	            if (!found) {
	                results.push(randomObj);
	            }
	        }
	        return results;
	    };
	    return Random;
	}());
	module.exports = Random;


/***/ }
/******/ ]);