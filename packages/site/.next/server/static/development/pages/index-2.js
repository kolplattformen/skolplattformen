module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/img/banner/mockup.png":
/*!**************************************!*\
  !*** ./assets/img/banner/mockup.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/mockup-a7619d65428cf7d61ed96fa9cb9f5cfb.png";

/***/ }),

/***/ "./assets/img/banner/shaps1.png":
/*!**************************************!*\
  !*** ./assets/img/banner/shaps1.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAMAAAC7faEHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAbFBMVEUAAAAAAAAAAAAAAADnvZX+0KP/0aT+0KP/0aQAAAD/0aT+0KP6zaFiUD8AAABVRjcAAAD+0KNmVEIAAAD+0KMAAAD9z6MAAAAAAAAAAAD/0aRtWUb4y5/9z6P+0KP7zqGzk3P7zqH/0aQAAABIeI9zAAAAInRSTlMAAQIDFaz5sfgE7t6WDQgMBfAPCe8G1AoHC/MOl9DNsxuuBhvCSgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAF7SURBVDjLjdTrmoIgEAZgVzrRFrHpJHbYyvu/yJ0DIKg87fenmt5GjYGqivmap5pm/KqWLNsEKEnCc7Vab4ZpNutVKrnZdljKllsmTO0W3U5FKExzef89Zs8VHaEwdoejGXM6sBMoTiltsfZzbtKcW6xZjc8ujtpZwNqly3PBGlhuGNqBI9djvKG35Bz4huSwXXBI8JICxVHD0Rl2ooyX5EzunPH3h4rCkJ1LHQSHzFEYioMFxwwABOZOHoMdMQBrLUqE3vGFc0fdrNZUQFh0RqpKKqbsXOJc0V1vWb/bteCG+5Eeg+8P3Ok+lNzQPn5DHu2QO///FeZ59j8/F90zd7i+r/fCfnu/8vXFeWlolMIg+MnCT5N5oXXq+sn89V1jsvnjGwwt4kDTT0yc57A/ZJQ48TW0q5P9Rgva5AnLXaf7l1c0jwzPuH8DpPlMAhBZcnCQpAGNwU+aLjo9iEhqxpaJJpWycErKAal1IHJazk/Kj+fp/8/nz+f9H26lU0PsJAf3AAAAAElFTkSuQmCC"

/***/ }),

/***/ "./assets/img/banner/shaps2.png":
/*!**************************************!*\
  !*** ./assets/img/banner/shaps2.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAApCAMAAACbSyD5AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABU1BMVEUAAAAAAAAAAADZhZvpj6bpj6bIe4/njqXnjqUAAADhiqDpj6bpj6bWg5hdOULojqXojqUAAADkjKPmjaTeiJ7njqXfiZ+1b4Hpj6a7c4UAAAAAAADQgJTojqVkPUfljaPhiqAAAADkjKLji6HSgZbpj6bojqV/TlqybX/pj6axbX4AAADmjaTZhZreiJ7kjKPch53mjaQTDA5pQEvojqXpj6bUgpdnP0rojqXIe4/YhJrmjaTji6HkjKIAAADljaPdiJ7ojqXFeY0AAADXhJnmjaQAAADhiqDahpxVND3njqXHeo7mjaTUgpcVDQ9nP0rDd4vljaPahpzgiZ/ji6G6coWMVmS6coXojqWVW2rhiqDii6HkjKPahpyIVGHojqXAdonTgpYyHyTZhZvmjaTgiZ/ji6HPf5QkFhnnjqXkjKLNfpKzboDhiqCsaXrpj6YAAAD9/7MrAAAAb3RSTlMAAQIe9eQOpoMDO/73JAXMqwRivWvRQxLnKQkKQtAHiYkLqWoo+OUWJuoVBbFkg5FIyQwU4vosCdQ/XLhvpAjFT9o7B1q6BnFQC9U+uUwLEjCyYoKTLRQj6xmNhqhuGOgoPw5nvGppSQ3NrkIrhybDXSSnAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAjRJREFUOMuVlVd31DAQhTdLVUIzkAASzQESQNTQmwMYRK8JvZddOvv/35g7Y8uSrRxO5mH37Og713dHM+NeL46xMHpLRwP1/8MLFMcSNJMrVo7CWLW6n4JFc80ojrX9BMyoGp9osevWK6ZbLKEbNo7asUkx3EGzzTjdsrWOSfycasNwoLJt2/HUHdpI6J1wtGs3waELoCrbA529xuQSxkwjsS+LhMXB/gN0MjObN3EQFTx0OILZgT0ClaN5GMeQOm4z5VmRPYH8ybnq8WLk1GnKnTkbCLPsufOUnrggoNZa8IsQuNQI8x+zl5G9wqjWRVGAzvO5eaSvemFxew3J64wWRVmWRAO+gfRNL8ysuyW6QMvSOUe0JpZ1bzvPQtbduQu/94A6Z60VmP3eL52FidqCKx5wHR7qgsgsowyxj7gOjykF4ZqlgyeAn5IsHSjF8AJSi7pixxr2Gd/b84B9gXt7+SrBmtdQeROwb5F4Z9qsI/b9B/TZR+/3E/ps8rNnfR1KqtAX6HwdDAbD4ZA+uX+/GVP4OlT1hYnvPzpz8TPnKkZ3wSbyX515+02XU7ro3hSX0+TTLfaPlw2ahx1r8zfeDzOzjAYNLP3LwiaP+lfaw4aDUQtzt0TRlq2FbajcqDrbGU7l4WaOU2i1HwTWfj+g6fnC4y0lLjLuWh4gjBGantHUkiIbFhNRBXo+gVZ7EtJES1j0kErsyWr/ggbPnCdTy1po4fGt+ml0We+LZb2H2nyX+wfTZOIlIQuQRwAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./assets/img/banner/shaps3.png":
/*!**************************************!*\
  !*** ./assets/img/banner/shaps3.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABa1BMVEUAAAAAAABpaWnR0dHPz8+VlZXR0dEAAADPz8+vr6/R0dHR0dEAAADPz8/R0dHBwcHR0dG4uLjR0dHMzMwAAADLy8tpaWnDw8PKysrQ0NDQ0NB9fX0AAABwcHDQ0NC6urrKysrPz8/Pz8/Q0NDR0dHJyckAAADIyMjPz8/Pz8/Pz8/MzMwvLy8aGhrKysrPz8/Q0NDPz899fX3Pz8/KysqwsLAAAADGxsbQ0NCLi4vQ0NDR0dHHx8fHx8fR0dEAAACLi4vQ0NDDw8PCwsKVlZXQ0NC9vb29vb3R0dHQ0NCioqLQ0NCenp6UlJTQ0NC+vr5vb2++vr7CwsLQ0NDIyMjQ0NAXFxe0tLTPz8/Nzc3Pz885OTnGxsbPz8/Q0NDGxsZGRkbOzs7Nzc3Hx8fQ0NDQ0NDIyMjNzc3R0dHNzc3BwcHR0dHR0dHLy8uoqKiamprQ0NCXl5fKysq1tbXKysqAgIDKysrR0dEAAABUpUN+AAAAd3RSTlMAAQKLVAfbAm8S6+oDifEp7SL3fAV0Bi1fv+MPBg3eCTZmmcn1YwdbmJe8hgkIg7nqlgWpUSAIT8EJtvxWUvkED8JKRxXNPzzwzhvYHRjrQhFDVeh00QkzyZOyC13R02AMqptt3eBxlP2hTP70kiQX7BmCJXMScnj8aa4AAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAB7UlEQVQ4y32U6VvUMBDGWwTCUVSwXBoF3LXiASpHFdQtIGq5VJBFWQ7vA7lFfP99p5M0bXeL74d0nvT3vDPTdGJZadm2XXeujlbrLNmR6lHPz/8gDY1obDgTivaFaALQJEQ+xIRobkErWpoFU7kmjtOG8xcuos1xaqwUQUh7By65nehoj6AMpU26unt6cfmKvHoNvT3dXRkrCvr6B64XilQubniedzMKioXBgf4+DUXwLbBab9+5S8zQ8L37auOBcuJEI6NAYWxcEuD7Pq1y/OEjYHREpVO1TEzi8RPJhM+UfFrC5ISqiRnHCaamUZqJEYKeFTE9FVB7iiGbwHVnn6P4wjAvQ8zNukHARpaycaU3v4BwUSNLr7AwL6WrjBLGew0saeYNsEw11TIrCE2ut1jJZVZRprdr79ZofY/VLCMUs46Kv7G5he0PH/1PWFeMyDIVfP7ylT/vt+8/UEkxnIx6l14ZP4HSzq+dErCLMiERwwdmCgqBvf0DKuZgfw8Ik3Isk+wQR8PHuq3j30c4TFIZo5M/p36i078niU1ipE/d1yefttEMt6ahKJDmtOKJcLg1pliSm3JE6mcVMWSkEGF+ej03lC5RoJEMw1BK8fRYVVBGVbNq6yE0HMdVN4OdULHsmsvDzlfu9ZML/APQxIW/OEOkhwAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./assets/img/banner/shaps4.png":
/*!**************************************!*\
  !*** ./assets/img/banner/shaps4.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAoCAMAAACsAtiWAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABSlBMVEUAAAAAAACzs/yvr/a1tf8AAAClpem1tf95eaq0tP4AAAC0tP21tf+0tP2vr/exsfmxsfmqqvC1tf+zs/waGiSzs/ySks60tP60tP58fK4AAAB2dqa0tP5NTW20tP61tf+ent4AAACcnNy1tf+ysvu1tf+rq/EAAACoqO2vr/axsfmxsfmvr/aoqO2zs/wyMkYkJDOzs/yNjca0tP60tP6EhLp+frG0tP6KisO0tP6hoeOgoOIAAACysvusrPKrq/FERGCzs/yent6cnNy1tf+zs/wAAAAAAACLi8S0tP60tP6AgLV2dqahoeOzs/wUFByzs/ysrPKwsPivr/exsfqqqvCqqu9NTW2zs/yamtmYmNaMjMW0tP5zc6JpaZS0tP60tP6kpOeysvuysvusrPOxsfpVVXi0tP2Ojsi0tP6Pj8mkpOe1tf8AAAC9lOszAAAAbHRSTlMAAWQ4+QIX4wbBA4/8kFx/ejL1sAetFd3ZFgcU1ge48S8ILPCE/lgJVFSJhFMqugsKuBLX3xoX3BGsNjQEil9bCLw2M/S7BQYa4N4YFze5CbZkiISVVlEOxS8sH+UWE9XmQLCtbaERzSXrJknlzeamAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAepJREFUOMuFlOk3HEEUxYeZtrQtdopBYbRELAkSQ2GsQxK7BCGx7/f//+zVq15HN/fDnDk1v3PvndevK5WKqIyVShT/XF6eTBmDdCaTTrLSp5ZVUQlUVlhWLMNEVTVI1VXMxBJ2DVBbC9TZMYwh6smi4QN91L9mDNHYBDS3tLQCTY2ljCHa2oGOTiG6uoH2thKGiWwP0NsnSf0DQE+WmbCJbQ8CuSHpkORwDhi07cDGEB/p+BMTxIwQ/jlgTJFRMh8b95CJL8DAqF+Hia+TwNS0SxDz7TswOePV4Zg8kJmVASLnMkCeo1wTNU/zWtD/xgBSLlK1eWVs2EQVlmhey9LXyiqwVlDGRiNqvbixCfz46RG/qMrmRnFdhRGxRdPfHpeCJHd2yXNLlCJyj+rsC9YBfd2TrxF5SPP6rYk/VPVQxiFHxzSvEyH+0hSPjygygqiiZk7PaF7//p8DF6fapKh8xLORlzSvq2ua4qX0csIIMzdg3TDhI4ENMc6tJm5pviIwcXdBmSjn7h64v3NMjAptQxDlPDw+PjnRGH9hTJTjPD/TcwxiImvnRvGTZsIO77excSu7VVVkvSOMVgzh1dGdtTwi5nXUEEnpHkkvtYY0YCdfDRpiwHrjDjJKusrKInrrPnznzmSs9OQFRoiJ+shen18AAAAASUVORK5CYII="

/***/ }),

/***/ "./assets/img/banner/shaps5.png":
/*!**************************************!*\
  !*** ./assets/img/banner/shaps5.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABCFBMVEUAAAAAAAAAAACj1/Kp3/ur4v6s4/+s4/+s4/+n3Per4v6Bqr+r4f2s4/+ErsSUxNyr4v4AAACs4/+q4Pyp3/qq4Pyr4v6h1O5FW2YAAACh1O6k2POo3vlMZHAAAAAAAACp3/oAAACf0eur4v5BVWCr4v4AAACo3vmf0uyf0uyq4Pyr4v5DWGMuPUSr4v6q4PwAAACr4v6p3/up3/us4/+n3PcAAAAAAACo3vmo3vmp3/tHXWkxQUmn3Pen3PeWxt6q4Pyp3/qYyeKp3/pWcoCbzeaj1/E5TFWj1/FSbHmq4Pyq4Pyr4v5xladOZnOn3fip3/uZyuOMudCk2POp3/ur4v6s4/8AAAAx2hkaAAAAVnRSTlMAAQIoeL3m+udBxAyZ/g0WyQPxuJ2b3FwPCVtCnxAKBKULM9sQ2gWEXVzA8RIP7cEG57a1+ZgIB52euBEOhYY2xaRHnA5HWglZFcq26x0UnMhIMX3B6FrFiowAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAACNUlEQVQ4y5WVZ1vbMBSFgxkpFAICAlEBGTECXWAoSCkbEkoToOz8/5/SO2RbHnlozyfn+M3VkXwlVSpFDYEq72ooo3e4INFg2nHDI6Nj1eqH0ZFhR5eS8G58op9oYpzhUvLj5FTf09RkrYQlcnqmn9PMdIFFUtQcOTs3Pz8369iayLJEijq9XFhsSFDj0wL9rIsMy+QS5VxeUU4ry5R3KcNiThHS3FeV0k5KrdI6hALz+uQa+usb2tPGJnprHovDh80ttLd1Rp/R22qGIkGxaPMLuF+/8cgofPq+A+Zuk8qmRaM9cPcJlCSCf4C5FyVlHXoA7iGTBsTsIZgHHorjRxbRFpLGWBDAwP5E1EZxAi5qMcCRJjICEav3MYDlsglqaFrHMDq+wf9ChhOalolRjmrNKS0Wk0IwS4t1ZqwLSyj452hvNgwmA6HVoE9wTpaPygv0L330Ep0LmUUhgLyidml34gCdNrXLtUwCxNOSqsVN+OsGp3Xzm5uwBWuSWwErVbfH7bxzW6/f3vFzr6ukv1gurLrv5TdM7165qIH3YXHF/zxkt+FDVyfjeyiW1frqMSUfn7RWbqFdF3ITRoab6fnl9a1afXt9eeY246IxmpZV2dZWuaJuw5SwKZnbXNwh/jaUBdJtbmIJZknqR/x0xYMAWIZZ1Lh5MmURtoZkESyS7ngTIcERbpiIQM5ZdhRCYaRZ8CjE4AM2EESTBILBoGObLgLhFAw84P/n2kjpf7iMfL7E/gtf77vYUBcxzgAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./assets/img/banner/shaps6.png":
/*!**************************************!*\
  !*** ./assets/img/banner/shaps6.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAMAAADWg4HyAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAsVBMVEUAAAAAAACS5I6X65MAAACO3YqX65OX65OK14YAAACL2IeS446W6ZKV55GX65OV6JGW6ZKQ4Y0AAACV55GP34wAAACW6pKU5pCP3osAAAAAAACV6JEAAACT5ZCU5pAAAACDzH+W6pKT5Y+W6pKG0YON24mO3IqO3IqW6pKU5pCW6pJ/xnx8wXiP3ouO3Yp5vHaR4o2S446S5I6S5I6I1IWR4o2S5I58wnmV6JGX65MAAAAWQPY3AAAAOXRSTlMAASHAAiLf4CMDJDp4efybeWAGemAH1pxZCASYCXuZBSXgmuEkWWJhwZvCJidYVyh9V198Pnx7KMLhSPzvAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAhpJREFUOMuV1Wtb2jAUB3BwcRBlVOtCTaxEjbqLbEUUtnz/L7ZzyemNIs/OG9vwe/6epkk6GvVrLDU6UqxOPp0c5fS7Uqef4+RUqQ90gkpNJzHGyRQvh7lIrYkCPtN6WOPI+Wz2BQroPJsDxpvZ7LyPKfQipppf5pdzublQXcz//0roV2NMja9UFxPVYBdZVhTXFuu6KLJsAVYT7lIH9sYYdGVZ4h9jbsC6Diaq3W2MS4ZccL2M8dZpwo0F6smW7SLrEYvlDvzdfYwPdSJfPMQY7rxrgjHWuccAM/CUOrWp6yeYjfDonARzLNFneSYjz/jMWIIpdtpQY3Is0mX5DfGZBJP9DrNeUANAPRZhGPkBv/xMNrVwT7lMHVbCnSYo1ucvhMEi1TCFiK0l+pJ7Dk7WrBD/Yoprk/BvpCvTt7YCvORhxTOeG3gXobL7tlzXdiyDYNflx7adO2it2Fa/aO0Bu8BF+0rz8IpLebFnE17LvtjA9G5kX6yt9DUeNcFv9X7b+JrGtyZWlhng9+12u9vtQtrHAa5h5D09gljpmBbEKlBe+JPuWy20gnmBMw6rdNeO7QdDwRsMleyQTmy933Ije6f6W8leIqpVfx97Wd/NPjaJtu04vai8dz7k6TXuHSaQXGuRkto5oxgnTUVS6N7hh5g0FcoBKlg0VZJq+LBmrR2XPnSut78Xmuvw96LL1RHY+r795+dwCP4D8BB5ct57TGMAAAAASUVORK5CYII="

/***/ }),

/***/ "./assets/img/banner/shaps7.png":
/*!**************************************!*\
  !*** ./assets/img/banner/shaps7.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAnCAMAAABOgyq3AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABIFBMVEUAAAAAAADUlODUlOC0fb7XluMAAADVleHEic/XluPXluMAAADVleHKjdbXluPLjtcrHi3WleLXluMAAADQkdzUlODTk9/QkdyPZJfWleLXluOrd7XSkt7PkNoAAADPkNrSkt6+hMjXluPWleJfQmUAAAAAAADUlODGitEAAADGitHKjdXUlN/KjdZROFXWleLXluO2f8DRkt3Rkt3Rkt3Rkt2kcq3XluPWleKXaZ/UlN/OkNnOkNnUlODEiM/XluPWleJCLkXUlODFitDFitDUlODMjtfUlN8AAADMjtd+WIXWleLXluOuebetebbSkt7Rkt3Skt6yfLzXluPRkt3PkdvRkt3UlODUlODIi9PUlODWleIAAAAAAADXluMAAAATXos7AAAAXnRSTlMAAUtMBtcCdBfv8AOcNP01BcP+BFqmplsP4vMihIEJgIUi9d8SCgWsWQtYQcFCCND7NGiamWkV6u0bkXNykiz61A26Skm7T7IIUAzb+Copdot3HfGYjYyfoDil3gYHlegaggAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAHxSURBVDjLhZRpW9QwFIWnAgUMjkBBWTTIkiKKLC4sLiwKMgIKAqOi7fn/P8Obe9PSmTbT86GTm3mfc5fkSaPRrSAI7vXRp1GjwKp/YKCfF7VkOAgMhjUsg+HQMHB/KAx7skyqEZBGFLO9SKUeNC3afKhUD5bJ0TFgfBwYG2XWS4YqmiDLyUf0eRxxDd700dQ0MDM7OwNMT0W+Ejh99IT8nmo9Rz/PIk8Jkn5+AVhcMmZpEViY95TA6eNlcnu+QnpBi+U4qrIV05cErK6wVmn5qspWelpbBzY2Bd3cANbXKjoT09fk9MYIat5S8K5sK6Zb28DObobu7gDbWyVbGdR78vmgjZP+SOGn7oFJ+r194OBQ5zo8APb3ukqQQX0mly+6oCPaOO4cmJh+pT9OLNFi2dUJbX0r2kpPp2fA+fecZPbHOXB2WuhM0l+QwyU1U3A15pI2f96VIKZX17R70263f+Wi4IY2r69yWzH9Da/+5LaM3jb9aPO2A/37r4cmHSqTStKW5hO1jUlXRmLdShM3ry6UWa0z0oeaMmrKaCwsXxOdsRwRGZfQlmPuDpaDIsoXME6SNGUmdXJBYkl3BmxLLMEWT3KlHMRMZnMVluAqRY4M8pdSWbhKypHZfSHWwpUKiy9t4GCPOt/voEalR6OG+w/JuK8qb54/uAAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./assets/img/blog/blog1.png":
/*!***********************************!*\
  !*** ./assets/img/blog/blog1.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./assets/img/blog/blog2.png":
/*!***********************************!*\
  !*** ./assets/img/blog/blog2.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./assets/img/blog/blog3.png":
/*!***********************************!*\
  !*** ./assets/img/blog/blog3.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./assets/img/boys.png":
/*!*****************************!*\
  !*** ./assets/img/boys.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/boys-ec5ee51660c1c36ef9531c24827516f8.png";

/***/ }),

/***/ "./assets/img/favicon.png":
/*!********************************!*\
  !*** ./assets/img/favicon.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./assets/img/feature/app-img.png":
/*!****************************************!*\
  !*** ./assets/img/feature/app-img.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/app-img-fc318b5373a53d19db2db8ce5f5e9cb7.png";

/***/ }),

/***/ "./assets/img/feature/app-img2.png":
/*!*****************************************!*\
  !*** ./assets/img/feature/app-img2.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/app-img2-f97fb7dccb5394c5da4bdde484211b85.png";

/***/ }),

/***/ "./assets/img/feature/app-img3.png":
/*!*****************************************!*\
  !*** ./assets/img/feature/app-img3.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/app-img3-f46b9c2ea140aa95c591f2d6846f408a.png";

/***/ }),

/***/ "./assets/img/feature/app-img4.png":
/*!*****************************************!*\
  !*** ./assets/img/feature/app-img4.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/app-img4-6224ea6b8a7f02f48421589a48adf83c.png";

/***/ }),

/***/ "./assets/img/feature/app-img5.png":
/*!*****************************************!*\
  !*** ./assets/img/feature/app-img5.png ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/app-img5-85cfe305db20ea0819496503d62a7df0.png";

/***/ }),

/***/ "./assets/img/feature/author1.png":
/*!****************************************!*\
  !*** ./assets/img/feature/author1.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaBAMAAADKhlwxAAAAG1BMVEW8vLwAAACNjY0vLy8XFxdGRkakpKReXl51dXUY+uh4AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABDUlEQVRYhe2SwU7DMAxALbTRHhfWkR0bTdwTviChgnP7B620D6B/UDQ+HCeF1k45Iw5+F1vPbeQ4BhAEQRCEv+cSXnsMT6GpYXfEbF9xSSlUo14AStWEM9ypCcCcuaQYnQ4bNH7SQ/cGENpMEroW6xOMFsC9w+40/8QkIWBjHxbclEKpamwkkwSFBeNTHQN03tmN5GcPB4jtmQOmVcwyueKwxXEuYB1b0VtJZhLnRQrq8Re5sMfROr8UCnXaSsJNPRub7hULwzFmmeSM7XJ9553fSA7add6DziWnwF36frb1rYlk3HcPy0rENoLNJOUzVPXPupXpETWX/IrNFANudA3XeXw9k4IgCILwz/kCvDhEILYhlskAAAAASUVORK5CYII="

/***/ }),

/***/ "./assets/img/feature/author2.png":
/*!****************************************!*\
  !*** ./assets/img/feature/author2.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaBAMAAADKhlwxAAAAG1BMVEW8vLwAAACNjY0vLy8XFxdGRkakpKReXl51dXUY+uh4AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABDUlEQVRYhe2SwU7DMAxALbTRHhfWkR0bTdwTviChgnP7B620D6B/UDQ+HCeF1k45Iw5+F1vPbeQ4BhAEQRCEv+cSXnsMT6GpYXfEbF9xSSlUo14AStWEM9ypCcCcuaQYnQ4bNH7SQ/cGENpMEroW6xOMFsC9w+40/8QkIWBjHxbclEKpamwkkwSFBeNTHQN03tmN5GcPB4jtmQOmVcwyueKwxXEuYB1b0VtJZhLnRQrq8Re5sMfROr8UCnXaSsJNPRub7hULwzFmmeSM7XJ9553fSA7add6DziWnwF36frb1rYlk3HcPy0rENoLNJOUzVPXPupXpETWX/IrNFANudA3XeXw9k4IgCILwz/kCvDhEILYhlskAAAAASUVORK5CYII="

/***/ }),

/***/ "./assets/img/footer-bg.png":
/*!**********************************!*\
  !*** ./assets/img/footer-bg.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/footer-bg-b21668ed9c378a19756d811bc8b3d3d1.png";

/***/ }),

/***/ "./assets/img/girls.png":
/*!******************************!*\
  !*** ./assets/img/girls.png ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/girls-b19fe6f4932fa615dc4bc8681c623f6b.png";

/***/ }),

/***/ "./assets/img/icons/goal.svg":
/*!***********************************!*\
  !*** ./assets/img/icons/goal.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDg2LjAzOCA0ODYuMDM4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODYuMDM4IDQ4Ni4wMzg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMzg2LjY2NywxODguMzAxYy0xNi4xODgtNi4wOTMtMzMuMzQxLTkuMjIxLTUwLjYzNy05LjIzMmMtNzkuNTczLDAuMDQ0LTE0NC4wNDQsNjQuNTg3LTE0NCwxNDQuMTYNCgkJCWMwLjAxLDE3LjMwNSwzLjEzNywzNC40NjcsOS4yMzIsNTAuNjY0bDE0Ljk2OC01LjY0OGMtMjQuODg0LTY2LjA5Nyw4LjUyNy0xMzkuODUyLDc0LjYyNC0xNjQuNzM2czEzOS44NTIsOC41MjcsMTY0LjczNiw3NC42MjQNCgkJCXMtOC41MjcsMTM5Ljg1Mi03NC42MjQsMTY0LjczNmMtMjkuMDQyLDEwLjkzNC02MS4wNjksMTAuOTM0LTkwLjExMiwwbC01LjY0OCwxNC45NjhjNzQuNDMsMjguMDE4LDE1Ny40ODEtOS42MDcsMTg1LjQ5OC04NC4wMzcNCgkJCUM0OTguNzIzLDI5OS4zNjksNDYxLjA5OCwyMTYuMzE5LDM4Ni42NjcsMTg4LjMwMXoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM3MS45NzIsMjYwLjY4OGMtMzQuNDQ2LTE5Ljg2Ni03OC40NzUtOC4wNDYtOTguMzQxLDI2LjRjLTEyLjgzOSwyMi4yNjItMTIuODM5LDQ5LjY4LDAsNzEuOTQxbDEzLjg0OC04DQoJCQljLTE1LjQ0Mi0yNi43OTctNi4yMzctNjEuMDM5LDIwLjU2MS03Ni40OHM2MS4wMzktNi4yMzcsNzYuNDgsMjAuNTYxYzE1LjQ0MiwyNi43OTcsNi4yMzcsNjEuMDM5LTIwLjU2LDc2LjQ4DQoJCQljLTguNDk0LDQuODk1LTE4LjEyNSw3LjQ3NC0yNy45MjksNy40NzljLTkuODI4LDAuMDAzLTE5LjQ4NS0yLjU4LTI4LTcuNDg4bC04LDEzLjg0OGMzNC40NDYsMTkuODY2LDc4LjQ3NSw4LjA0Niw5OC4zNDEtMjYuNA0KCQkJQzQxOC4yMzgsMzI0LjU4Myw0MDYuNDE4LDI4MC41NTQsMzcxLjk3MiwyNjAuNjg4eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMzc4LjgyOSwyMTkuODUzYy01Ny4wNTgtMjMuNzE1LTEyMi41MzYsMy4zMTUtMTQ2LjI1MSw2MC4zNzNjLTExLjQ0OCwyNy41NDQtMTEuNDIzLDU4LjUxOCwwLjA2OSw4Ni4wNDNsMTQuNzY4LTYuMTc2DQoJCQljLTIwLjM2OC00OC44ODksMi43NTItMTA1LjAzMiw1MS42NDEtMTI1LjRzMTA1LjAzMiwyLjc1MywxMjUuNCw1MS42NDFzLTIuNzUzLDEwNS4wMzItNTEuNjQxLDEyNS40DQoJCQljLTIzLjU4NCw5LjgyNi01MC4xMTQsOS44MzQtNzMuNzA0LDAuMDIzbC02LjE2LDE0LjcyYzU3LjA1OCwyMy43MTUsMTIyLjUzNi0zLjMxNSwxNDYuMjUxLTYwLjM3Mw0KCQkJQzQ2Mi45MTYsMzA5LjA0Nyw0MzUuODg3LDI0My41NjgsMzc4LjgyOSwyMTkuODUzeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMzM2LjAzLDI5MS4wNjljLTE3LjY3MywwLTMyLDE0LjMyNy0zMiwzMmMwLjAyOCw1LjY5NSwxLjU5NSwxMS4yNzYsNC41MzYsMTYuMTUybC00Ny4yLDQ3LjJsLTM1LjczNi03LjE5Mg0KCQkJYy0zLjA4OC0wLjYxNy02LjI1MSwwLjYzNi04LjA4LDMuMmwtNDAsNTZjLTIuNTY1LDMuNTk3LTEuNzI5LDguNTkzLDEuODY4LDExLjE1OGMwLjY1MiwwLjQ2NSwxLjM3MSwwLjgzLDIuMTMyLDEuMDgybDYuMDgsMi4wMjQNCgkJCWMtMjAuODA3LDkuNDU2LTQzLjM5MywxNC4zNTctNjYuMjQ4LDE0LjM3NkgyNC4wM2MtNC40MTgsMC04LTMuNTgyLTgtOHMzLjU4Mi04LDgtOGgxMTJjMTMuMjU1LDAsMjQtMTAuNzQ1LDI0LTI0DQoJCQlzLTEwLjc0NS0yNC0yNC0yNGgtMTEyYy00LjQxOCwwLTgtMy41ODItOC04czMuNTgyLTgsOC04aDU2YzIzLjkwNi0wLjAyNiw0NC4xNDktMTcuNjM5LDQ3LjQ4LTQxLjMxMg0KCQkJYzkuODI2LTMuMjA1LDE2LjQ4Ny0xMi4zNTIsMTYuNTItMjIuNjg4di04YzEzLjI1NSwwLDI0LTEwLjc0NSwyNC0yNHYtNTguMDg4YzYwLjc0MS0yNi41MSw4OC40OTItOTcuMjQxLDYxLjk4Mi0xNTcuOTgyDQoJCQljLTI2LjUxLTYwLjc0MS05Ny4yNDEtODguNDkxLTE1Ny45ODItNjEuOTgycy04OC40OTEsOTcuMjQxLTYxLjk4MiwxNTcuOTgyYzEyLjEwNiwyNy43MzcsMzQuMjQ1LDQ5Ljg3Niw2MS45ODIsNjEuOTgydjU4LjA4OA0KCQkJYzAsMTMuMjU1LDEwLjc0NSwyNCwyNCwyNHY4YzAuMDI2LDkuODk4LDYuMTI2LDE4Ljc2NSwxNS4zNiwyMi4zMjhjLTMuMDI2LDE0LjkyMS0xNi4xMzUsMjUuNjUzLTMxLjM2LDI1LjY3MmgtNTYNCgkJCWMtMTMuMjU1LDAtMjQsMTAuNzQ1LTI0LDI0czEwLjc0NSwyNCwyNCwyNGgxMTJjNC40MTgsMCw4LDMuNTgyLDgsOHMtMy41ODIsOC04LDhoLTExMmMtMTMuMjU1LDAtMjQsMTAuNzQ1LTI0LDI0DQoJCQlzMTAuNzQ1LDI0LDI0LDI0aDk3LjM1MmMyOC42MTItMC4wMjEsNTYuNzktNyw4Mi4xMDQtMjAuMzM2bDQuOTUyLDE0Ljg2NGMxLjA4OSwzLjI2OCw0LjE0Nyw1LjQ3Myw3LjU5Miw1LjQ3Mg0KCQkJYzEuNjY4LDAuMDA0LDMuMjk1LTAuNTIsNC42NDgtMS40OTZsNTYtNDBjMi41NjEtMS44MjcsMy44MTMtNC45ODYsMy4yLTguMDcybC03LjE2LTM1LjhsNDcuMi00Ny4yDQoJCQljNC44NjIsMi45NDUsMTAuNDI4LDQuNTIzLDE2LjExMiw0LjU2OGMxNy42NzMsMCwzMi0xNC4zMjcsMzItMzJDMzY4LjAzLDMwNS4zOTYsMzUzLjcwNCwyOTEuMDY5LDMzNi4wMywyOTEuMDY5eg0KCQkJIE0xMjguMDMsMzIzLjA2OWMwLDQuNDE4LTMuNTgyLDgtOCw4cy04LTMuNTgyLTgtOHYtOGgxNlYzMjMuMDY5eiBNMTUyLjAzLDI3NS4wNjloLTY0di04aDY0VjI3NS4wNjl6IE0xNTIuMDMsMjUxLjA2OWgtNjQNCgkJCXYtMTIuNDY0YzEwLjQxNSwyLjkzMSwyMS4xOCw0LjQzMywzMiw0LjQ2NGMxMC44Mi0wLjAzMSwyMS41ODUtMS41MzMsMzItNC40NjRWMjUxLjA2OXogTTExNC43MDIsMTcxLjA2OWgxMC42MzJsLTQuNjY0LDU2DQoJCQljLTAuMjE2LDAtMC40MjQsMC0wLjY0LDBzLTAuNDI0LDAtMC42NCwwTDExNC43MDIsMTcxLjA2OXogTTE2LjAzLDEyMy4wNjlDMTUuOTYzLDY1LjYzMiw2Mi40NzEsMTkuMDE1LDExOS45MDgsMTguOTQ3DQoJCQljNTcuNDM4LTAuMDY3LDEwNC4wNTUsNDYuNDQsMTA0LjEyMiwxMDMuODc4YzAuMDYsNTAuOTk5LTM2Ljg3LDk0LjUxOC04Ny4yLDEwMi43NTZsNC41NDQtNTQuNTEyaDE4LjY1Ng0KCQkJYzE3LjY3My0wLjAwNCwzMS45OTctMTQuMzM0LDMxLjk5My0zMi4wMDdjLTAuMDA0LTE3LjY3My0xNC4zMzQtMzEuOTk3LTMyLjAwNy0zMS45OTNjLTE3LjQxMiwwLjAwNC0zMS42MjUsMTMuOTI4LTMxLjk4NiwzMS4zMzYNCgkJCWwtMS4zNiwxNi42NjRoLTEzLjMwNGwtMS4zMzYtMTZjMC0xNy42NzMtMTQuMzI3LTMyLTMyLTMycy0zMiwxNC4zMjctMzIsMzJzMTQuMzI3LDMyLDMyLDMyaDE4LjY0bDQuNTQ0LDU0LjUxMg0KCQkJQzUyLjk5OCwyMTcuMzIzLDE2LjExOSwxNzMuOTYsMTYuMDMsMTIzLjA2OXogTTE0Mi43MDIsMTU1LjA2OWwxLjMyOC0xNmMwLTguODM3LDcuMTYzLTE2LDE2LTE2czE2LDcuMTYzLDE2LDE2cy03LjE2MywxNi0xNiwxNg0KCQkJSDE0Mi43MDJ6IE05Ny4zMzQsMTU1LjA2OUg4MC4wM2MtOC44MzcsMC0xNi03LjE2My0xNi0xNnM3LjE2My0xNiwxNi0xNmM4Ljk1MSwwLjExMSwxNi4xMTcsNy40NTgsMTYuMDA1LDE2LjQwOA0KCQkJYy0wLjAwMSwwLjA4NS0wLjAwMywwLjE3MS0wLjAwNSwwLjI1Nkw5Ny4zMzQsMTU1LjA2OXogTTk2LjAzLDI5OS4wNjljLTQuNDE4LDAtOC0zLjU4Mi04LThoNjRjMCw0LjQxOC0zLjU4Miw4LTgsOEg5Ni4wM3oNCgkJCSBNMjA1Ljg3LDQ0MS45MTdsLTkuMDQtMy4wMTZsMzAuNzA0LTQyLjk3NmwyMC4yNzIsNC4wNTZMMjA1Ljg3LDQ0MS45MTd6IE0yMjAuMTk4LDQ2Mi4yNjlsLTMuMDE2LTkuMDMybDQxLjkzNi00MS45MjgNCgkJCWw0LjA0OCwyMC4yNTZMMjIwLjE5OCw0NjIuMjY5eiBNMzM2LjAzLDMzOS4wNjljLTEuMzgzLTAuMDE5LTIuNzU4LTAuMjIxLTQuMDg4LTAuNmw5Ljc0NC05Ljc0NGwtMTEuMzEyLTExLjMxMmwtOS43NDQsOS43NDQNCgkJCWMtMC4zNzktMS4zMy0wLjU4MS0yLjcwNS0wLjYtNC4wODhjMC04LjgzNyw3LjE2My0xNiwxNi0xNnMxNiw3LjE2MywxNiwxNlMzNDQuODY3LDMzOS4wNjksMzM2LjAzLDMzOS4wNjl6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yOTUuNTI2LDEyNy4yNTNjMC4zMzYtNC4zMDQsMC41MDQtOC4yODgsMC41MDQtMTIuMTg0YzAuMDczLTM1Ljk3Mi0xMC45NDUtNzEuMDkyLTMxLjU1Mi0xMDAuNTc2bC0xMy4xMiw5LjE1Mg0KCQkJYzIzLjEyOSwzMi43ODIsMzIuODE3LDczLjE4MSwyNy4wNzIsMTEyLjg4OGMtMC4zNTcsMi42NDYsMC42MzEsNS4yOTYsMi42MzIsNy4wNjRjMi4wMDcsMS43NjksNC43NjcsMi40MTgsNy4zNTIsMS43MjgNCgkJCWM0Ny4xNDktMTIuNDQxLDk3LjMtNS44MzEsMTM5LjYxNiwxOC40bDgtMTMuODU2QzM5My41MDYsMTI1LjQ5LDM0My41NTMsMTE3LjQ1LDI5NS41MjYsMTI3LjI1M3oiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTQ2OC4zMTgsMTczLjA2OWwtMTAuNTg0LDEyYzUuNzY5LDUuMDg5LDExLjIxNSwxMC41MzUsMTYuMzA0LDE2LjMwNGwxMi0xMC42DQoJCQlDNDgwLjUwMSwxODQuNTEzLDQ3NC41ODQsMTc4LjYwMSw0NjguMzE4LDE3My4wNjl6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo="

/***/ }),

/***/ "./assets/img/icons/planning.svg":
/*!***************************************!*\
  !*** ./assets/img/icons/planning.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDgwIDQ4MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgwIDQ4MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00NDAsMTJINDBDMTcuOTIsMTIuMDI2LDAuMDI2LDI5LjkyLDAsNTJ2MjcyYzAuMDI2LDIyLjA4LDE3LjkyLDM5Ljk3NCw0MCw0MGgyODh2LTE2SDQwYy0xMy4yNTUsMC0yNC0xMC43NDUtMjQtMjRWNTINCgkJCWMwLTEzLjI1NSwxMC43NDUtMjQsMjQtMjRoNDAwYzEzLjI1NSwwLDI0LDEwLjc0NSwyNCwyNHYyNzJjMCwxMy4yNTUtMTAuNzQ1LDI0LTI0LDI0aC02NHYxNmg2NGMyMi4wOC0wLjAyNiwzOS45NzQtMTcuOTIsNDAtNDANCgkJCVY1MkM0NzkuOTc0LDI5LjkyLDQ2Mi4wOCwxMi4wMjYsNDQwLDEyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDA4LDQ0SDQwYy00LjQxOCwwLTgsMy41ODItOCw4djI3MmMwLDQuNDE4LDMuNTgyLDgsOCw4aDI4OHYtMTZINDhWNjBoMzUydjI1NmgtMjR2MTZoMzJjNC40MTgsMCw4LTMuNTgyLDgtOFY1Mg0KCQkJQzQxNiw0Ny41ODIsNDEyLjQxOCw0NCw0MDgsNDR6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9IjQzMiIgeT0iMTQ4IiB3aWR0aD0iMTYiIGhlaWdodD0iODAiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTQ1Niw0MjBIODhjLTEuMjM4LTAuMDE0LTIuNDYyLDAuMjYtMy41NzYsMC44bC0zMiwxNmMtMy45NTQsMS45NzEtNS41NjIsNi43NzQtMy41OTEsMTAuNzI5DQoJCQljMC43NzUsMS41NTUsMi4wMzYsMi44MTYsMy41OTEsMy41OTFsMzIsMTZjMS4xMDcsMC41NjcsMi4zMzIsMC44NjksMy41NzYsMC44OGgzNjhjMTMuMjU1LDAsMjQtMTAuNzQ1LDI0LTI0DQoJCQlTNDY5LjI1NSw0MjAsNDU2LDQyMHogTTQwOCw0NTJIODkuODg4bC0xNi04bDE2LThINDA4VjQ1MnogTTQ1Niw0NTJoLTMydi0xNmgzMmM0LjQxOCwwLDgsMy41ODIsOCw4UzQ2MC40MTgsNDUyLDQ1Niw0NTJ6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0zNjgsMjIwaC0yNHYtMjRjMC00LjQxOC0zLjU4Mi04LTgtOGgtNzJ2LThjMC00LjQxOC0zLjU4Mi04LTgtOGgtMjR2LTI0YzAtNC40MTgtMy41ODItOC04LThoLTQ4di0xNmgzMg0KCQkJYzQuNDE4LDAsOC0zLjU4Miw4LThWODRjMC00LjQxOC0zLjU4Mi04LTgtOGgtODBjLTQuNDE4LDAtOCwzLjU4Mi04LDh2MzJjMCw0LjQxOCwzLjU4Miw4LDgsOGgzMnYxNmgtNTZjLTQuNDE4LDAtOCwzLjU4Mi04LDh2MjQNCgkJCUg3MmMtNC40MTgsMC04LDMuNTgyLTgsOHYzMmMwLDQuNDE4LDMuNTgyLDgsOCw4aDY0YzQuNDE4LDAsOC0zLjU4Miw4LTh2LTMyYzAtNC40MTgtMy41ODItOC04LThoLTI0di0xNmgxMDR2MTZoLTI0DQoJCQljLTQuNDE4LDAtOCwzLjU4Mi04LDh2MzJjMCw0LjQxOCwzLjU4Miw4LDgsOGgyNHYyNGgtMjRjLTQuNDE4LDAtOCwzLjU4Mi04LDh2MzJjMCw0LjQxOCwzLjU4Miw4LDgsOGg2NGM0LjQxOCwwLDgtMy41ODIsOC04di0zMg0KCQkJYzAtNC40MTgtMy41ODItOC04LThoLTI0di0yNGgyNGM0LjQxOCwwLDgtMy41ODIsOC04di04aDY0djE2aC0yNGMtNC40MTgsMC04LDMuNTgyLTgsOHYzMmMwLDQuNDE4LDMuNTgyLDgsOCw4aDY0DQoJCQljNC40MTgsMCw4LTMuNTgyLDgtOHYtMzJDMzc2LDIyMy41ODIsMzcyLjQxOCwyMjAsMzY4LDIyMHogTTEyOCwxODh2MTZIODB2LTE2SDEyOHogTTEzNiwxMDhWOTJoNjR2MTZIMTM2eiBNMjQ4LDI2MHYxNmgtNDh2LTE2DQoJCQlIMjQ4eiBNMjQ4LDIwNGgtNDh2LTE2aDQ4VjIwNHogTTM2MCwyNTJoLTQ4di0xNmg0OFYyNTJ6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0wLDQzNnY4YzAsNC40MTgsMy41ODIsOCw4LDhoOHYtMTZIMHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTMzOS4xNiwzNjQuOTUyYy0yLjIzMiwzLjU2NC01LjE0NCw2LjY1NS04LjU2OCw5LjA5Nmw5LjMxMiwxMy4wMTZjNS4xMTYtMy42NTIsOS40NjUtOC4yNzIsMTIuOC0xMy42TDMzOS4xNiwzNjQuOTUyeiINCgkJCS8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0zNDQsMzM5LjEyOFYzNDhjMCwxLjgxMi0wLjE1MywzLjYyMS0wLjQ1Niw1LjQwOGwxNS43ODQsMi42NDhjMC40NDctMi42NjIsMC42NzItNS4zNTcsMC42NzItOC4wNTZ2LTguODcySDM0NHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHJlY3QgeD0iMjc0LjI0IiB5PSIzODAiIHdpZHRoPSIxNS42MzIiIGhlaWdodD0iMTYiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTMxOS4yODgsMzc5LjJjLTIuMzkxLDAuNTQ0LTQuODM2LDAuODEyLTcuMjg4LDAuOGgtNi40NTZ2MTZIMzEyYzMuNjczLDAuMDA0LDcuMzM1LTAuNDE1LDEwLjkxMi0xLjI0OEwzMTkuMjg4LDM3OS4yeiINCgkJCS8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0zOC4xMzYsMzgxLjAwOGMtNi4xNDYsMS4yODctMTEuOTc4LDMuNzc0LTE3LjE2LDcuMzJsOS4wMTYsMTMuMjE2YzMuNDQ4LTIuMzY0LDcuMzMxLTQuMDIsMTEuNDI0LTQuODcyTDM4LjEzNiwzODEuMDA4eg0KCQkJIi8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik03LjkxMiw0MDEuNmMtMy40NjcsNS4yMzktNS44NjUsMTEuMTEyLTcuMDU2LDE3LjI4bDE1LjcyLDMuMDI0YzAuNzgxLTQuMTA3LDIuMzcyLTguMDE4LDQuNjgtMTEuNTA0TDcuOTEyLDQwMS42eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cmVjdCB4PSIyMTEuNzIiIHk9IjM4MCIgd2lkdGg9IjE1LjY0IiBoZWlnaHQ9IjE2Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9IjI0MyIgeT0iMzgwIiB3aWR0aD0iMTUuNjMyIiBoZWlnaHQ9IjE2Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9IjExNy44OTYiIHk9IjM4MCIgd2lkdGg9IjE1LjY0IiBoZWlnaHQ9IjE2Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9Ijg2LjYyNCIgeT0iMzgwIiB3aWR0aD0iMTUuNjQiIGhlaWdodD0iMTYiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHJlY3QgeD0iMzQ0IiB5PSIzMDcuODQ4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTUuNjQiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHJlY3QgeD0iNTUuMzUyIiB5PSIzODAiIHdpZHRoPSIxNS42MzIiIGhlaWdodD0iMTYiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHJlY3QgeD0iMTQ5LjE2OCIgeT0iMzgwIiB3aWR0aD0iMTUuNjQiIGhlaWdodD0iMTYiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHJlY3QgeD0iMTgwLjQ0OCIgeT0iMzgwIiB3aWR0aD0iMTUuNjQiIGhlaWdodD0iMTYiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHJlY3QgeD0iMzQ0IiB5PSIyNzYiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"

/***/ }),

/***/ "./assets/img/icons/project-management.svg":
/*!*************************************************!*\
  !*** ./assets/img/icons/project-management.svg ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDgyLjEzIDQ4Mi4xMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgyLjEzIDQ4Mi4xMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00NzUuMjY2LDEyNi42MDNjLTAuMDAxLDAtMC4wMDEsMC0wLjAwMiwwbC0wLjAxNi0wLjAxNmwtMzEuMTItNC40NGMtNC4zNzQtMC42MjMtNy40MTUtNC42NzQtNi43OTItOS4wNDgNCgkJCWMwLjI5OS0yLjEwMiwxLjQyMi0zLjk5OCwzLjEyLTUuMjcybDI1LjE1Mi0xOC44NjRjMy41MzUtMi42NTEsNC4yNTEtNy42NjUsMS42LTExLjJsLTI4LjgtMzguNA0KCQkJYy0yLjY1MS0zLjUzNS03LjY2NS00LjI1MS0xMS4yLTEuNmwtMjUuMTQ0LDE4Ljg2NGMtMy41MiwyLjY3MS04LjUzOCwxLjk4My0xMS4yMDktMS41MzdjLTEuMjk3LTEuNzA5LTEuODUzLTMuODY4LTEuNTQzLTUuOTkxDQoJCQlsNC40NDgtMzEuMTJjMC42MjctNC4zNzQtMi40MS04LjQyNy02Ljc4My05LjA1NWMtMC4wMDMsMC0wLjAwNi0wLjAwMS0wLjAwOS0wLjAwMUwzMzkuNDgsMi4xMzkNCgkJCWMtNC4zNzMtMC42MjgtOC40MjgsMi40MDgtOS4wNTYsNi43ODJjMCwwLjAwMSwwLDAuMDAxLDAsMC4wMDJsLTQuNDQ4LDMxLjEyYy0wLjYyMyw0LjM3NC00LjY3NCw3LjQxNS05LjA0OCw2Ljc5Mg0KCQkJYy0yLjEwMi0wLjI5OS0zLjk5OC0xLjQyMi01LjI3Mi0zLjEyTDI5Mi44LDE4LjU2M2MtMi42NTEtMy41MzUtNy42NjUtNC4yNTEtMTEuMi0xLjZsLTI0LjA0LDE4LjA0DQoJCQljLTEwLjg3Ni0xLjE1Ni0yMS44NDQtMS4xNTYtMzIuNzIsMEMxNTMuNjE0LDQzLjE0NCw5Ny43NTksOTkuOTQ2LDkwLjgxNiwxNzEuMjk5Yy0wLjIxNiwyLjI2NC0wLjI5Niw0LjUxMi0wLjQwOCw2Ljc2aC0yLjQNCgkJCWMtMy43OTYsMC4wMDctNy4wNjUsMi42ODEtNy44MjQsNi40bC01LjUyOCwyNi4yODhsLTIyLjE0NC0xNS4yNzJjLTMuMTc4LTIuMTkzLTcuNDctMS44MDItMTAuMiwwLjkyOGwtMjQsMjQNCgkJCWMtMi43MjYsMi43MjktMy4xMTYsNy4wMTUtMC45MjgsMTAuMTkybDE1LjIsMjIuMTA0bC0yNi4yOTYsNS41MjhjLTMuNjc4LDAuODA2LTYuMjk2LDQuMDY3LTYuMjg4LDcuODMydjMyDQoJCQljLTAuMDAyLDMuNzg0LDIuNjQ5LDcuMDUyLDYuMzUyLDcuODMybDI2LjI5Niw1LjUyOGwtMTUuMiwyMi4xMDRjLTIuMTg4LDMuMTc3LTEuNzk4LDcuNDYzLDAuOTI4LDEwLjE5MmwyNCwyNA0KCQkJYzIuNzMsMi43Myw3LjAyMiwzLjEyMSwxMC4yLDAuOTI4bDIyLjEwNC0xNS4yNGw1LjUyOCwyNi4yOTZjMC43NTksMy43MTksNC4wMjgsNi4zOTMsNy44MjQsNi40aDMyDQoJCQljMy43ODQsMC4wMDIsNy4wNTItMi42NDksNy44MzItNi4zNTJsNS41MjgtMjYuMjk2bDIyLjEwNCwxNS4yYzMuMTc3LDIuMTg4LDcuNDYzLDEuNzk4LDEwLjE5Mi0wLjkyOGwxMi40MjQtMTIuNDY0djIyLjgNCgkJCWMwLjAzNiwxMS4zODEsNi4xMzMsMjEuODgsMTYsMjcuNTUydjQ0LjQ0OGMwLDE3LjY3MywxNC4zMjcsMzIsMzIsMzJoMzJjMTcuNjczLDAsMzItMTQuMzI3LDMyLTMydi00NC40NDgNCgkJCWM5Ljg2Ny01LjY3MiwxNS45NjQtMTYuMTcxLDE2LTI3LjU1MnYtMzEuNjY0YzAuMjE3LTEzLjMyMyw3LjE4Ny0yNS42MjMsMTguNTA0LTMyLjY1NmM2LjYzOS00LjMwNywxMi45MzUtOS4xMjIsMTguODMyLTE0LjQNCgkJCWwtMTAuNjcyLTExLjkyYy01LjI3NSw0LjcyOC0xMC45MTEsOS4wMzctMTYuODU2LDEyLjg4OGMtMTUuODg1LDkuOTctMjUuNjA5LDI3LjMzNC0yNS44MDgsNDYuMDg4djMxLjY2NGMwLDguODM3LTcuMTYzLDE2LTE2LDE2DQoJCQloLTY0Yy04LjgzNywwLTE2LTcuMTYzLTE2LTE2di0zMi4zMjhjLTAuMTg1LTE4LjM5OS05Ljc1Ni0zNS40MjgtMjUuMzc2LTQ1LjE1MmMtNjMuNDA3LTM5Ljg0Mi04Mi41MTEtMTIzLjU0MS00Mi42NjktMTg2Ljk0OA0KCQkJYzI0LjcyLTM5LjM0MSw2Ny44NjItNjMuMjg2LDExNC4zMjUtNjMuNDUyYy0wLjExOSwwLjI4NS0wLjIyNCwwLjU3Ni0wLjMxMiwwLjg3MmMtMC4yOTcsMi4xLDAuMjUzLDQuMjMzLDEuNTI4LDUuOTI4DQoJCQlsMTguODU2LDI1LjE0NGMxLjk4OCwyLjU3MywyLjE3OSw2LjEwNywwLjQ4LDguODhjLTEuNjM2LDIuNzktNC43OTksNC4zMTItOCwzLjg0OGwtMzEuMTItNC40NDgNCgkJCWMtNC4zNzQtMC42MjctOC40MjcsMi40MS05LjA1NSw2Ljc4M2MwLDAuMDAzLTAuMDAxLDAuMDA2LTAuMDAxLDAuMDA5bC02Ljc5Miw0Ny41MTJjLTAuNjI3LDQuMzczLDIuNDEsOC40MjcsNi43ODMsOS4wNTUNCgkJCWMwLjAwMywwLDAuMDA2LDAuMDAxLDAuMDA5LDAuMDAxbDMxLjEyLDQuNDQ4YzQuMzc0LDAuNjIzLDcuNDE1LDQuNjc0LDYuNzkyLDkuMDQ4Yy0wLjI5OSwyLjEwMi0xLjQyMiwzLjk5OC0zLjEyLDUuMjcyDQoJCQlsLTI1LjE0NCwxOC44NTZjLTMuNTM1LDIuNjUxLTQuMjUxLDcuNjY1LTEuNiwxMS4ybDI4LjgsMzguNGMyLjY1MSwzLjUzNSw3LjY2NSw0LjI1MSwxMS4yLDEuNmwyNS4xNTItMTguODU2DQoJCQljMy41MzgtMi42NDYsOC41NTItMS45MjMsMTEuMTk4LDEuNjE2YzEuMjY2LDEuNjkzLDEuODExLDMuODE5LDEuNTE0LDUuOTEybC00LjQ0LDMxLjEyYy0wLjYyOCw0LjM3MywyLjQwOCw4LjQyOCw2Ljc4Miw5LjA1Ng0KCQkJYzAuMDAxLDAsMC4wMDEsMCwwLjAwMiwwbDQ3LjUyLDYuNzkyYzAuMzc0LDAuMDQ4LDAuNzUxLDAuMDcyLDEuMTI4LDAuMDcyYzMuOTgzLDAuMDA1LDcuMzYyLTIuOTIxLDcuOTI4LTYuODY0bDQuNDQtMzEuMTINCgkJCWMwLjYyMy00LjM3NCw0LjY3NC03LjQxNSw5LjA0OC02Ljc5MmMyLjEwMiwwLjI5OSwzLjk5OCwxLjQyMiw1LjI3MiwzLjEybDE4Ljg2NCwyNS4xNDRjMi42NTEsMy41MzUsNy42NjUsNC4yNTEsMTEuMiwxLjYNCgkJCWwzOC40LTI4LjhjMy41MzUtMi42NTEsNC4yNTEtNy42NjUsMS42LTExLjJsLTE4Ljg1Ni0yNS4xNDRjLTEuOTc5LTIuNTc3LTIuMTctNi4xMDUtMC40OC04Ljg4YzEuNjAxLTIuODI3LDQuNzkzLTQuMzU5LDgtMy44NA0KCQkJbDMxLjEyLDQuNDRjNC4zNzMsMC42MjgsOC40MjgtMi40MDksOS4wNTYtNi43ODJjMC0wLjAwMSwwLTAuMDAxLDAtMC4wMDJsNi43ODQtNDcuNTINCgkJCUM0ODIuNjc2LDEzMS4yODUsNDc5LjY0LDEyNy4yMzEsNDc1LjI2NiwxMjYuNjAzeiBNMjEwLjExMiw0MTAuMDU5aDY0djE2aC02NFY0MTAuMDU5eiBNMjEwLjExMiw0NDIuMDU5aDY0djgNCgkJCWMwLDguODM3LTcuMTYzLDE2LTE2LDE2aC0zMmMtOC44MzcsMC0xNi03LjE2My0xNi0xNlY0NDIuMDU5eiBNMTQ2LjQyNCwzMDQuMDk5YzQuMzY4LDMuNTcyLDguOTMyLDYuODk4LDEzLjY3Miw5Ljk2DQoJCQljNy41NTksNC43NzcsMTMuMjQ5LDEyLjAwNCwxNi4xMiwyMC40NzJsLTE3LjE2LDE3LjEyOGwtMTYuNjE2LTExLjQ1NmMtNy4yNzYtNS4wMTQtMTcuMjM5LTMuMTgtMjIuMjU0LDQuMDk2DQoJCQljLTEuMjAyLDEuNzQ1LTIuMDQ2LDMuNzExLTIuNDgyLDUuNzg0bC00LjE5MiwxOS45NzZIOTQuNDk2bC00LjE5Mi0xOS45NDRjLTEuODItOC42NDctMTAuMzA1LTE0LjE4Mi0xOC45NTItMTIuMzYyDQoJCQljLTIuMDczLDAuNDM2LTQuMDM5LDEuMjgtNS43ODQsMi40ODJsLTE2LjYyNCwxMS40MjRsLTE0LjU3Ni0xNC41NDRsMTEuNDQ4LTE2LjYwOGM1LjAxOS03LjI3MywzLjE5MS0xNy4yMzctNC4wODItMjIuMjU2DQoJCQljLTEuNzQ2LTEuMjA1LTMuNzE0LTIuMDUxLTUuNzktMi40ODhMMTYsMjkxLjU2M3YtMTkuMDA4bDE5Ljk0NC00LjJjOC42NDQtMS44MzMsMTQuMTY2LTEwLjMyNiwxMi4zMzMtMTguOTcxDQoJCQljLTAuNDM1LTIuMDUxLTEuMjY4LTMuOTk2LTIuNDUzLTUuNzI1bC0xMS40NTYtMTYuNjU2bDE0LjU3Ni0xNC41NDRsMTYuNjMyLDExLjQ1NmM3LjI3OSw1LjAwOSwxNy4yNDIsMy4xNjksMjIuMjUxLTQuMTENCgkJCWMxLjItMS43NDMsMi4wNDItMy43MDcsMi40NzctNS43NzhsMS40LTYuNjU2YzEuMjgyLDkuMjE4LDMuNDA1LDE4LjI5OCw2LjM0NCwyNy4xMjhjLTI2LjMyMywzLjEzOC00NS4xMTgsMjcuMDIyLTQxLjk4LDUzLjM0NQ0KCQkJYzMuMTM4LDI2LjMyMywyNy4wMjIsNDUuMTE4LDUzLjM0NSw0MS45OEMxMjUuMjU5LDMyNy45MzQsMTM5LjEzLDMxOC4yOTMsMTQ2LjQyNCwzMDQuMDk5eiBNMTM0LDI5Mi44MjcNCgkJCWMtNS45NzQsMTYuNjA1LTI0LjI3NywyNS4yMjMtNDAuODgyLDE5LjI1Yy0xNi42MDUtNS45NzQtMjUuMjIzLTI0LjI3Ny0xOS4yNS00MC44ODJjNC41Ny0xMi43MDMsMTYuNjMxLTIxLjE2NCwzMC4xMzEtMjEuMTM2DQoJCQljMC4xMDQsMCwwLjIsMCwwLjMwNCwwQzExMS42NiwyNjUuOTIyLDEyMS43MDcsMjgwLjM5MSwxMzQsMjkyLjgyN3ogTTQ2MC41MTIsMTcyLjk3MWwtMjMuMi0zLjMxMg0KCQkJYy0xMy4xMjItMS44NzQtMjUuMjc4LDcuMjQ1LTI3LjE1MiwyMC4zNjZjLTAuOSw2LjMwMSwwLjc0LDEyLjcwMiw0LjU2LDE3Ljc5NGwxNC4wNTYsMTguNzQ0bC0yNS42LDE5LjJsLTE0LjA2NC0xOC43MzYNCgkJCWMtNy45NTItMTAuNjA1LTIyLjk5NS0xMi43NTYtMzMuNTk5LTQuODA0Yy01LjA5MiwzLjgxOC04LjQ1OSw5LjUwMy05LjM2MSwxNS44MDRsLTMuMjQsMjMuMjMybC0zMS42NzItNC41MjhsMy4zMTItMjMuMg0KCQkJYzEuODc5LTEzLjEyMS03LjIzNS0yNS4yODEtMjAuMzU2LTI3LjE1OWMtNi4zMDUtMC45MDMtMTIuNzA5LDAuNzM3LTE3LjgwNCw0LjU1OWwtMTguNzQ0LDE0LjA1NmwtMTkuMi0yNS42bDE4LjczNi0xNC4wNjQNCgkJCWMxMC42MDUtNy45NTIsMTIuNzU2LTIyLjk5NSw0LjgwNC0zMy41OTljLTMuODE4LTUuMDkyLTkuNTAzLTguNDU5LTE1LjgwNC05LjM2MWwtMjMuMi0zLjMxMmw0LjUyOC0zMS42NzJsMjMuMiwzLjMxMg0KCQkJYzEzLjEyMSwxLjg3OSwyNS4yODEtNy4yMzUsMjcuMTU5LTIwLjM1NmMwLjkwMy02LjMwNS0wLjczNy0xMi43MDktNC41NTktMTcuODA0bC0xNC4xMDQtMTguNzZsMjUuNi0xOS4ybDE0LjA2NCwxOC43NDQNCgkJCWM3Ljk1MiwxMC42MDUsMjIuOTk1LDEyLjc1NiwzMy41OTksNC44MDRjNS4wOTItMy44MTgsOC40NTktOS41MDMsOS4zNjEtMTUuODA0bDMuMzEyLTIzLjJsMzEuNjcyLDQuNTJsLTMuMzEyLDIzLjINCgkJCWMtMS44NzQsMTMuMTIyLDcuMjQ0LDI1LjI3OCwyMC4zNjYsMjcuMTUyYzYuMzAxLDAuOSwxMi43MDItMC43NCwxNy43OTQtNC41NmwxOC43NDQtMTQuMDU2bDE5LjIsMjUuNmwtMTguNzQ0LDE0LjA2NA0KCQkJYy0xMC42MDUsNy45NTItMTIuNzU2LDIyLjk5NS00LjgwNCwzMy41OTljMy44MTgsNS4wOTIsOS41MDMsOC40NTksMTUuODA0LDkuMzYxbDIzLjIsMy4zMTJMNDYwLjUxMiwxNzIuOTcxeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMzQ0LDc2LjE3MWMtMzUuMzQ2LDAtNjQsMjguNjU0LTY0LDY0YzAsMzUuMzQ2LDI4LjY1NCw2NCw2NCw2NGMzNS4zNDYsMCw2NC0yOC42NTQsNjQtNjQNCgkJCUM0MDcuOTYsMTA0Ljg0MSwzNzkuMzMsNzYuMjEsMzQ0LDc2LjE3MXogTTM0NCwxODguMTcxYy0yNi41MSwwLTQ4LTIxLjQ5LTQ4LTQ4czIxLjQ5LTQ4LDQ4LTQ4YzI2LjUxLDAsNDgsMjEuNDksNDgsNDgNCgkJCUMzOTEuOTY5LDE2Ni42NjgsMzcwLjQ5NywxODguMTQsMzQ0LDE4OC4xNzF6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9IjIzNC4xMTIiIHk9IjM1NC4wNTkiIHdpZHRoPSIxNiIgaGVpZ2h0PSIyNCIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjA3LjEyLDI3NS40OTFjLTQ5LjM4NS0xOS4yOTItNzMuNzgtNzQuOTY2LTU0LjQ4Ny0xMjQuMzUxYzcuNDc2LTE5LjEzNiwyMC44OTMtMzUuMzY5LDM4LjI3OS00Ni4zMTNsLTguNTUyLTEzLjUzNg0KCQkJYy01Mi4zMzYsMzIuOTcxLTY4LjAzNSwxMDIuMTI2LTM1LjA2NCwxNTQuNDYyYzEyLjc2OSwyMC4yNjksMzEuNzAxLDM1LjkxLDU0LjAxNiw0NC42MjZjMTkuNzUyLDcuNTY4LDMyLjc5NSwyNi41MjgsMzIuOCw0Ny42OA0KCQkJaDE2QzI1MC4xMzcsMzEwLjMwNywyMzMuMDM1LDI4NS40MTgsMjA3LjEyLDI3NS40OTF6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9IjM5NC4xMTIiIHk9IjI5OC4wNTkiIHdpZHRoPSI1NiIgaGVpZ2h0PSIxNiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cmVjdCB4PSI0MDIuMTEzIiB5PSIzMzQuODIyIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjY0MDEgLTAuNzY4MyAwLjc2ODMgMC42NDAxIC0xMzMuNjQzNyA0NDYuODIzOSkiIHdpZHRoPSIxNiIgaGVpZ2h0PSI2Mi40OCIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cmVjdCB4PSIzNDYuMTEyIiB5PSIzNjIuMDU5IiB3aWR0aD0iMTYiIGhlaWdodD0iNTYiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHJlY3QgeD0iOS4xMjgiIHk9IjEzMC4wNTgiIHRyYW5zZm9ybT0ibWF0cml4KDAuOTcwMSAtMC4yNDI1IDAuMjQyNSAwLjk3MDEgLTMyLjIyNTEgMTQuMzM1MSkiIHdpZHRoPSI2NS45NjgiIGhlaWdodD0iMTUuOTkyIi8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9IjQ2LjExMSIgeT0iMzUuNjU3IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjU4MTIgLTAuODEzNyAwLjgxMzcgMC41ODEyIC0zNC4zNTU3IDczLjM2ODgpIiB3aWR0aD0iMTUuOTkyIiBoZWlnaHQ9IjY4LjgxNiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cmVjdCB4PSI5Ny45MzgiIHk9IjEuMDI0IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk2ODggLTAuMjQ3NyAwLjI0NzcgMC45Njg4IC01LjEzMyAyNy4yOTcxKSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjY2LjA1NiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"

/***/ }),

/***/ "./assets/img/icons/solution.svg":
/*!***************************************!*\
  !*** ./assets/img/icons/solution.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDgwLjA0OSA0ODAuMDQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODAuMDQ5IDQ4MC4wNDk7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDQ4LjAyNywxNjAuMDQ5aC0xMDRjLTQuNDE4LDAtOCwzLjU4Mi04LDh2MzJjMCw0LjQxOCwzLjU4Miw4LDgsOGgyNGM4LjgzNywwLDE2LDcuMTYzLDE2LDE2cy03LjE2MywxNi0xNiwxNmgtMjQNCgkJCWMtNC40MTgsMC04LDMuNTgyLTgsOHY0MGgtMTIwYy00LjQxOCwwLTgsMy41ODItOCw4djEwNGMwLDE3LjY3MywxNC4zMjcsMzIsMzIsMzJoMjA4YzE3LjY3MywwLDMyLTE0LjMyNywzMi0zMnYtMjA4DQoJCQlDNDgwLjAyNywxNzQuMzc2LDQ2NS43LDE2MC4wNDksNDQ4LjAyNywxNjAuMDQ5eiBNMzM2LjAyNyw0MTYuMDQ5aC05NmMtOC44MzcsMC0xNi03LjE2My0xNi0xNnYtOTZoMTEydjE2aC0xNg0KCQkJYy0xNy42NzMsMC0zMiwxNC4zMjctMzIsMzJjMCwxNy42NzMsMTQuMzI3LDMyLDMyLDMyaDE2VjQxNi4wNDl6IE00NjQuMDI3LDQwMC4wNDljMCw4LjgzNy03LjE2MywxNi0xNiwxNmgtOTZ2LTQwDQoJCQljMC00LjQxOC0zLjU4Mi04LTgtOGgtMjRjLTguODM3LDAtMTYtNy4xNjMtMTYtMTZzNy4xNjMtMTYsMTYtMTZoMjRjNC40MTgsMCw4LTMuNTgyLDgtOHYtMjRoMjR2MTZjMCwxNy42NzMsMTQuMzI3LDMyLDMyLDMyDQoJCQljMTcuNjczLDAsMzItMTQuMzI3LDMyLTMydi0xNmgyNFY0MDAuMDQ5eiBNNDY0LjAyNywyODguMDQ5aC0zMmMtNC40MTgsMC04LDMuNTgyLTgsOHYyNGMwLDguODM3LTcuMTYzLDE2LTE2LDE2cy0xNi03LjE2My0xNi0xNg0KCQkJdi0yNGMwLTQuNDE4LTMuNTgyLTgtOC04aC0zMnYtMzJoMTZjMTcuNjczLDAsMzItMTQuMzI3LDMyLTMycy0xNC4zMjctMzItMzItMzJoLTE2di0xNmg5NmM4LjgzNywwLDE2LDcuMTYzLDE2LDE2VjI4OC4wNDl6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0zNTIuMDI3LDMyLjA0OWgtMTZ2LTI0YzAtNC40MTgtMy41ODItOC04LThoLTEwNGMtMTcuNjczLDAtMzIsMTQuMzI3LTMyLDMydjg5LjZsLTMzLjA5NiwxNg0KCQkJYy00Ljk3Ny02LjU3NC0xMS4xNTUtMTIuMTQ1LTE4LjIwOC0xNi40MTZjMzEuNjAxLTE1LjgzNCw0NC4zODMtNTQuMjg4LDI4LjU0OS04NS44ODlDMTUzLjQzOCwzLjc0MywxMTQuOTg0LTkuMDM5LDgzLjM4Myw2Ljc5NQ0KCQkJQzUxLjc4MiwyMi42MjksMzksNjEuMDgzLDU0LjgzNCw5Mi42ODRjNS40NiwxMC44OTYsMTMuOTE3LDIwLjAwNywyNC4zNzcsMjYuMjYxYy0xNi43NDUsOC4xNjYtMjkuMTEyLDIzLjIwOC0zMy44ODgsNDEuMjE2DQoJCQlsLTMxLjg3MiwxMDAuMzZjLTkuMDE3LDI4LjM0Ny03LjE4Myw1OS4wMzIsNS4xNDQsODYuMTA0YzEzLjA3NCwyOC42MTYsMTIuNDYyLDYxLjYxNy0xLjY2NCw4OS43MjhsLTE2LjA2NCwzMi4xMg0KCQkJYy0xLjk3NSwzLjk1Mi0wLjM3Miw4Ljc1NywzLjU4LDEwLjczMmMxLjExMiwwLjU1NSwyLjMzNywwLjg0NCwzLjU4LDAuODQ0aDg4YzQuNDE4LDAsOC0zLjU4Miw4LTgNCgkJCWMwLjAyNC0xNC44NDgtOC4yMjUtMjguNDczLTIxLjM5Mi0zNS4zMzZsMy44MjQtNy42MzJjMTEuNTgtMjMuMjgsMTUuMzQ4LTQ5LjY3MywxMC43NDQtNzUuMjY0bC01LjkzNi0zMi42NA0KCQkJYy0wLjc2LTQuMjEzLDIuMDQtOC4yNDUsNi4yNTMtOS4wMDVjMC40NS0wLjA4MSwwLjkwNi0wLjEyMiwxLjM2My0wLjEyM2MzLjc0NC0wLjAwNCw2Ljk1NiwyLjY2OSw3LjYzMiw2LjM1MmwxMC44NjQsNTkuNzc2DQoJCQljMS43NjEsOS43MDksMi42NDgsMTkuNTU3LDIuNjQ4LDI5LjQyNHY2NC40NDhjMCw0LjQxOCwzLjU4Miw4LDgsOGg4OGM0LjQxOCwwLDgtMy41ODIsOC04YzAtMS41NTYtMC4wOTEtMy4xMTEtMC4yNzItNC42NTYNCgkJCWMtMS4zNzYtMTIuMDQxLTguODEyLTIyLjU0My0xOS43MTItMjcuODRjLTguOTI0LTQuNTQ4LTE5LjI2Mi01LjQ2NS0yOC44NDgtMi41Nmw1LjMyOC0yNi42MjQNCgkJCWMyLjMyOC0xMS42NTYsMy41MDEtMjMuNTE0LDMuNTA0LTM1LjR2LTcxLjYwOGwtOS4zNDQtMTA3LjEyOGw1NS41MTItMjYuNDg4YzEwLjI1OC00LjU2MiwxNy4wOTUtMTQuNDg2LDE3LjcwNC0yNS42OTZoODAuMTI4DQoJCQljNC40MTgsMCw4LTMuNTgyLDgtOHYtNDBoMTZjMTcuNjczLDAsMzItMTQuMzI3LDMyLTMyUzM2OS43LDMyLjA0OSwzNTIuMDI3LDMyLjA0OXogTTY0LjAyNyw2NC4wNDljMC0yNi41MSwyMS40OS00OCw0OC00OA0KCQkJYzI2LjUxLDAsNDgsMjEuNDksNDgsNDhzLTIxLjQ5LDQ4LTQ4LDQ4Qzg1LjUyOSwxMTIuMDIzLDY0LjA1NCw5MC41NDgsNjQuMDI3LDY0LjA0OXogTTE3NS4xODcsNDU0LjMwNQ0KCQkJYzYuNjYyLTMuNzgxLDE0Ljc3OS0zLjk1OCwyMS42LTAuNDcyYzQuMzcxLDIuMTE4LDcuODI2LDUuNzQ3LDkuNzI4LDEwLjIxNmgtNzAuNDg4di01Ni40NDgNCgkJCWMtMC4wMDEtMTAuODI4LTAuOTc1LTIxLjYzNC0yLjkxMi0zMi4yODhsLTEwLjg2NC01OS43NjhjLTIuMjM0LTEyLjkyMi0xNC41MjEtMjEuNTg2LTI3LjQ0Mi0xOS4zNTENCgkJCWMtMTIuOTIyLDIuMjM0LTIxLjU4NiwxNC41MjEtMTkuMzUxLDI3LjQ0MmMwLjAyMywwLjEzNSwwLjA0OCwwLjI3LDAuMDc0LDAuNDA1bDUuOTQ0LDMyLjY0DQoJCQljMy45ODMsMjIuMTg0LDAuNzEyLDQ1LjA2MS05LjMyOCw2NS4yNGwtNy43NjgsMTUuNTI4Yy0yLjAwMiwzLjkzOS0wLjQzMiw4Ljc1NSwzLjUwNywxMC43NTcNCgkJCWMwLjU1MywwLjI4MSwxLjEzOCwwLjQ5NywxLjc0MSwwLjY0M2M3Ljg4MiwxLjg1NywxNC4yODksNy41NzcsMTcuMDI0LDE1LjJoLTY1LjY4bDEwLjI1Ni0yMC41NDQNCgkJCWMxNi4yOTEtMzIuNDI4LDE2Ljk5Ny03MC40OTQsMS45Mi0xMDMuNTA0Yy0xMC42OS0yMy40NjYtMTIuMjgxLTUwLjA2Ny00LjQ2NC03NC42NGwzMi0xMDAuOA0KCQkJYzYuNjQtMjQuODc3LDMxLjM1MS00MC40MTQsNTYuNjQ4LTM1LjYxNmMxMC40NTUsMi4wOTQsMTkuODkyLDcuNjY2LDI2Ljc3NiwxNS44MDhsLTQ3LjI4LDIyLjg0DQoJCQljLTEwLjIzOSw0Ljk4MS0xNi43NTUsMTUuMzUtMTYuOCwyNi43MzZjLTAuMDQsMTYuMzc0LDEzLjIwMSwyOS42ODEsMjkuNTc1LDI5LjcyMWM0LjQ2NywwLjAxMSw4Ljg3OC0wLjk4NywxMi45MDUtMi45MjENCgkJCWwzNi44LTE3LjU0NGw4LjcyLDEwMC40NjR2NzAuOTJjLTAuMDA5LDEwLjgzMS0xLjA4MSwyMS42MzUtMy4yLDMyLjI1NmwtOC41MjgsNDIuNjA4Yy0wLjg3LDQuMzMyLDEuOTM1LDguNTQ5LDYuMjY3LDkuNDE5DQoJCQljMS44OTgsMC4zODEsMy44NjksMC4wNjIsNS41NDktMC44OTlMMTc1LjE4Nyw0NTQuMzA1eiBNMjIzLjY1MSwxNTUuMTUzbC0wLjI0LDAuMTA0bC0xMDcuOCw1MS40MzINCgkJCWMtNi44MjksMy4yNTItMTUuMDAyLDAuMzUyLTE4LjI1NC02LjQ3OGMtMC44NzUtMS44MzgtMS4zMjktMy44NDctMS4zMy01Ljg4MmMwLjAyLTUuMjQ3LDMuMDItMTAuMDI3LDcuNzM2LTEyLjMyOGwxMDguNjY0LTUyLjQ4DQoJCQljNC4zMjEtMS45MjksOS4zMjktMS41MTMsMTMuMjcyLDEuMTA0YzMuOTgyLDIuNTU3LDYuMzcyLDYuOTgsNi4zMjgsMTEuNzEyQzIzMi4wMjUsMTQ3Ljg5MywyMjguNzM5LDE1Mi45MjEsMjIzLjY1MSwxNTUuMTUzeg0KCQkJIE0zNTIuMDI3LDgwLjA0OWgtMjRjLTQuNDE4LDAtOCwzLjU4Mi04LDh2NDBoLTc1LjYwOGMtNy4wMzEtMTIuOTg3LTIyLjQ5Mi0xOC44OTQtMzYuMzkyLTEzLjkwNFYzMi4wNDljMC04LjgzNyw3LjE2My0xNiwxNi0xNg0KCQkJaDk2djI0YzAsNC40MTgsMy41ODIsOCw4LDhoMjRjOC44MzcsMCwxNiw3LjE2MywxNiwxNlMzNjAuODY0LDgwLjA0OSwzNTIuMDI3LDgwLjA0OXoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTMyMi4zNzEsMjEwLjM5M2wtMjYuMzQ0LDI2LjM0NHYtNDQuNjg4aC0xNnY2MC42ODhsLTgsOGwtOC04di0yOC42ODhoLTE2djEyLjY4OGwtMjYuMzQ0LTI2LjM0NGwtMTEuMzEyLDExLjMxMmw1Niw1Ng0KCQkJYzMuMTI0LDMuMTIzLDguMTg4LDMuMTIzLDExLjMxMiwwbDU2LTU2TDMyMi4zNzEsMjEwLjM5M3oiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHJlY3QgeD0iMjQ4LjAyNyIgeT0iMTkyLjA0OSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9IjI0OC4wMjciIHk9IjE2MC4wNDkiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cmVjdCB4PSIyODAuMDI3IiB5PSIxNjAuMDQ5IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="

/***/ }),

/***/ "./assets/img/icons/solution1.svg":
/*!****************************************!*\
  !*** ./assets/img/icons/solution1.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIxLjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDgwLjMxOCA0ODAuMzE4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODAuMzE4IDQ4MC4zMTg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMTUyLjE1OSwyNzIuMzE4Yy0xMi44LDAtMjMuMi05LjYtMjQtMjIuNGMzMC40LTEyLjgsNDguOC00My4yLDQ4LTc2YzAtMS42LDAtNC44LDAtNS42YzAtNDAtMzItNzItNzItNzJoLTk2DQoJCQljLTQuOCwwLTgsMy4yLTgsOGMwLDE4LjQsNy4yLDM2LDE5LjIsNDguOGMtMS42LDgtMy4yLDE1LjItMy4yLDIzLjJjMCwzMiwxOS4yLDYwLjgsNDgsNzMuNmMtMC44LDEyLjgtMTEuMiwyMi40LTI0LDIyLjQNCgkJCWMtMjIuNCwwLTQwLDE3LjYtNDAsNDB2MTYwYzAsNC44LDMuMiw4LDgsOGgxNzZjNC44LDAsOC0zLjIsOC04di0xNjBDMTkyLjE1OSwyODkuOTE4LDE3NC41NTksMjcyLjMxOCwxNTIuMTU5LDI3Mi4zMTh6DQoJCQkgTTE2Ljk1OSwxMTIuMzE4aDg3LjJjMjgsMCw1MS4yLDIwLjgsNTUuMiw0OGgtODcuMkM0NC4xNTksMTYwLjMxOCwyMC45NTksMTM5LjUxOCwxNi45NTksMTEyLjMxOHogTTMyLjE1OSwxNzYuMzE4DQoJCQljMC00LDAtOCwwLjgtMTEuMmMxMiw3LjIsMjUuNiwxMS4yLDM5LjIsMTEuMmg4OGMwLDI3LjItMTYuOCw1MS4yLTQyLjQsNjBjLTMuMiwwLjgtNS42LDQtNS42LDcuMnY0LjhjMCwxMC40LDQsMjAuOCwxMiwyOC44DQoJCQlsLTIwLjgsMy4yaC0xNC40bC0yMC44LTMuMmM4LTcuMiwxMi0xNy42LDEyLTI4Ljh2LTRjMC0zLjItMi40LTYuNC01LjYtNy4yQzQ4Ljk1OSwyMjcuNTE4LDMyLjE1OSwyMDMuNTE4LDMyLjE1OSwxNzYuMzE4eg0KCQkJIE0xMTIuMTU5LDM4OS45MThsLTE2LDE1LjJsLTE1LjItMTUuMmwxNC40LTkzLjZoMi40TDExMi4xNTksMzg5LjkxOHogTTE2LjE1OSwzMTIuMzE4YzAtMTIuOCwxMC40LTI0LDIzLjItMjRsMzkuMiw2LjRsLTE1LjIsOTYNCgkJCWMwLDIuNCwwLjgsNC44LDIuNCw3LjJsMjQsMjRjMy4yLDMuMiw4LDMuMiwxMS4yLDBsMjQtMjRjMS42LTEuNiwyLjQtNCwyLjQtNy4ybC0xNS4yLTk2bDM5LjItNi40YzEyLjgsMCwyMy4yLDExLjIsMjMuMiwyNHYxMjANCgkJCWgtMTU4LjRWMzEyLjMxOHogTTE3Ni4xNTksNDY0LjMxOGgtMTYwdi0xNmgxNjBWNDY0LjMxOHoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTQ0OC4xNTksNjQuMzE4aC0zNmwtOC44LTEzLjZjLTQtNi40LTEyLTEwLjQtMjAtMTAuNGgtMTcuNmMtNCwwLTcuMi0yLjQtOC02LjRjLTgtMjUuNi0zNC40LTM5LjItNjAtMzINCgkJCWMtMTUuMiw0LjgtMjcuMiwxNi44LTMyLDMyYy0wLjgsMy4yLTQsNi40LTgsNi40aC0xNy42Yy04LDAtMTUuMiw0LTIwLDEwLjRsLTgsMTMuNmgtMzZjLTE3LjYsMC0zMiwxNC40LTMyLDMyaDE2DQoJCQljMC04LjgsNy4yLTE2LDE2LTE2aDI1LjZjLTQuOCw3LjItMS42LDE3LjYsNS42LDIxLjZjMi40LDEuNiw1LjYsMi40LDgsMi40aDE5NC40YzguOCwwLDE2LTcuMiwxNi0xNmMwLTMuMi0wLjgtNS42LTIuNC04aDI0LjgNCgkJCWM4LjgsMCwxNiw3LjIsMTYsMTZ2MzUyYzAsOC44LTcuMiwxNi0xNiwxNmgtMjQwdjE2aDI0MGMxNy42LDAsMzItMTQuNCwzMi0zMnYtMzUyQzQ4MC4xNTksNzguNzE4LDQ2NS43NTksNjQuMzE4LDQ0OC4xNTksNjQuMzE4DQoJCQl6IE0yMTUuMzU5LDg4LjMxOGwxOC40LTI4LjhjMS42LTEuNiw0LTMuMiw3LjItMy4yaDE3LjZjMTAuNCwwLDIwLTcuMiwyMy4yLTE3LjZjNS42LTE2LjgsMjMuMi0yNi40LDQwLTIwLjgNCgkJCWMxMC40LDMuMiwxNy42LDExLjIsMjAuOCwyMC44YzMuMiwxMC40LDEyLjgsMTcuNiwyMy4yLDE3LjZoMTcuNmMyLjQsMCw0LjgsMS42LDYuNCwzLjJsMTkuMiwyOC44SDIxNS4zNTl6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9IjMwNC4xNTkiIHk9IjMyLjMxOCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwb2x5Z29uIHBvaW50cz0iMjc3Ljc1OSwxOTcuOTE4IDI2Ni41NTksMTg2LjcxOCAyNDguMTU5LDIwNS4xMTggMjI5Ljc1OSwxODYuNzE4IDIxOC41NTksMTk3LjkxOCAyMzYuOTU5LDIxNi4zMTggDQoJCQkyMTguNTU5LDIzNC43MTggMjI5Ljc1OSwyNDUuOTE4IDI0OC4xNTksMjI3LjUxOCAyNjYuNTU5LDI0NS45MTggMjc3Ljc1OSwyMzQuNzE4IDI1OS4zNTksMjE2LjMxOCAJCSIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cG9seWdvbiBwb2ludHM9IjM2NS43NTksMzU3LjkxOCAzNTQuNTU5LDM0Ni43MTggMzM2LjE1OSwzNjUuMTE4IDMxNy43NTksMzQ2LjcxOCAzMDYuNTU5LDM1Ny45MTggMzI0Ljk1OSwzNzYuMzE4IA0KCQkJMzA2LjU1OSwzOTQuNzE4IDMxNy43NTksNDA1LjkxOCAzMzYuMTU5LDM4Ny41MTggMzU0LjU1OSw0MDUuOTE4IDM2NS43NTksMzk0LjcxOCAzNDcuMzU5LDM3Ni4zMTggCQkiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgkJPHBhdGggZD0iTTM3My43NTksMjI2LjcxOGMtMy4yLTMuMi04LTMuMi0xMS4yLDBsLTMyLDMybDExLjIsMTEuMmwxOC40LTE4LjR2MTYuOGMwLDIwLTE2LDM2LTM2LDM2Yy0yOC44LDAtNTIsMjMuMi01Miw1MnY4DQoJCQljMCwyMC0xNiwzNi0zNiwzNmgtMjB2MTZoMjBjMjguOCwwLDUyLTIzLjIsNTItNTJ2LThjMC0yMCwxNi0zNiwzNi0zNmMyOC44LDAsNTItMjMuMiw1Mi01MnYtMTYuOGwxOC40LDE4LjRsMTEuMi0xMS4yDQoJCQlMMzczLjc1OSwyMjYuNzE4eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDIxLjc1OSwxMzQuNzE4bC0xMS4yLTEybC0xMC40LDEwLjRjLTE5LjItMTcuNi00OS42LTE2LTY3LjIsNGMtMTcuNiwyMC0xNiw0OS42LDQsNjcuMmMyMCwxNy42LDQ5LjYsMTYsNjcuMi00DQoJCQljMTMuNi0xNS4yLDE2LTM2LjgsNi40LTU0LjRMNDIxLjc1OSwxMzQuNzE4eiBNMzY4LjE1OSwyMDAuMzE4Yy0xNy42LDAtMzItMTQuNC0zMi0zMmMwLTE3LjYsMTQuNC0zMiwzMi0zMmM4LDAsMTUuMiwzLjIsMjAuOCw4DQoJCQlsLTIwLjgsMjAuOGwtMTAuNC0xMC40bC0xMS4yLDExLjJsMTYsMTZjMy4yLDMuMiw4LDMuMiwxMS4yLDBsMjQtMjRjMS42LDMuMiwyLjQsNi40LDIuNCwxMC40DQoJCQlDNDAwLjE1OSwxODUuOTE4LDM4NS43NTksMjAwLjMxOCwzNjguMTU5LDIwMC4zMTh6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxyZWN0IHg9IjEyOC4xNTkiIHk9IjMyOC4zMTgiIHdpZHRoPSIyNCIgaGVpZ2h0PSIxNiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNNDMyLjE1OSwxMDQuMzE4djMyOGgtMjI0djE2aDIzMmM0LjgsMCw4LTMuMiw4LTh2LTMzNkg0MzIuMTU5eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"

/***/ }),

/***/ "./assets/img/logo.png":
/*!*****************************!*\
  !*** ./assets/img/logo.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/logo-75ba2475f33a9b795b3aeabd9d211006.png";

/***/ }),

/***/ "./assets/img/logo2.png":
/*!******************************!*\
  !*** ./assets/img/logo2.png ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAAoCAYAAAAsTRLGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2RDNBRDdDOUU4Q0RFNzExODIwN0I5NjI5RkEzMEQxMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRjY5OUIwNkY4QTUxMUU4OTYxRUY4MUNERDZGOThGMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRjY5OUIwNUY4QTUxMUU4OTYxRUY4MUNERDZGOThGMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCRTcxMEExRDBBRjJFODExQjk2RkNBN0MyM0MzRUY5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2RDNBRDdDOUU4Q0RFNzExODIwN0I5NjI5RkEzMEQxMyIvPiA8L3JkZjpEZXNjcmlwdGlv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"

/***/ }),

/***/ "./assets/img/partner2.png":
/*!*********************************!*\
  !*** ./assets/img/partner2.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAAYBAMAAAAoiZ+4AAAAG1BMVEW8vLwAAAB1dXUvLy9GRkaNjY2kpKReXl4XFxcwX2CLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB1ElEQVQ4jcVUPW/bMBA9SzLt0VfZDke7iPfK6NAxGhp0lFJrt1EU8GgtSUYLyNfPzr07CkHjmu1QoLeQ1PE9Hh/fiegfRfJZh8vO32IcffFrGYoLLHa8peQbP29t645P0BueYvjBEhXRsJPxyYBK4gr5MLO9xXu4u2eDF/lqw3OiPX9tylyK4E9SGB8p5XVTKpcs38NH7NupZq6IljIrP+CjlFHIZCwTfNQsqE/gz9UA8BSJsSfq5FDHB6Lab6mUVDGRTHfE5vLhpHgihY/zwHG3kAkOG/HVECKAzziGvDmVzuDJCnAfOHE6dbOUhetjBThOH0+zc/BfZpkqVfs27zN69/YpDm/1fX7eQDWQ4CVMIWjpeBGFD01fZl/pFTq9A6JWdXOKwvd+a3C+1nV4bRCJhLScR+GuC95yrUro2KrBe1emZwyuOmskWnX65lVokXmKwq1JNNQly3zpAy/Y6lkUnvalSpQTFDs3HBW6Aa0kMTkDL214AQlMlvHB6ctl/YPE4Bk6rK8bRkXl6pvSzNNIfOem+j28d1h7AZcc4Fl03MI6N8TZu4/4EfSV9bsPJaNnWo9EE4cP+pu58Lep1UMiSLjzX8IpsX9dp74Xw/wJ/j/iFavrTJRX7leiAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./assets/img/wass.png":
/*!*****************************!*\
  !*** ./assets/img/wass.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/wass-e1b84629231188d449f53d38901ce355.png";

/***/ }),

/***/ "./components/AppShots.js":
/*!********************************!*\
  !*** ./components/AppShots.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "swiper");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swiper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SectionTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SectionTitle */ "./components/SectionTitle.js");
/* harmony import */ var _assets_img_feature_app_img_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/img/feature/app-img.png */ "./assets/img/feature/app-img.png");
/* harmony import */ var _assets_img_feature_app_img_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_img_feature_app_img_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_img_feature_app_img2_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/img/feature/app-img2.png */ "./assets/img/feature/app-img2.png");
/* harmony import */ var _assets_img_feature_app_img2_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_img_feature_app_img2_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_img_feature_app_img3_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/img/feature/app-img3.png */ "./assets/img/feature/app-img3.png");
/* harmony import */ var _assets_img_feature_app_img3_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_img_feature_app_img3_png__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _assets_img_feature_app_img4_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/img/feature/app-img4.png */ "./assets/img/feature/app-img4.png");
/* harmony import */ var _assets_img_feature_app_img4_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_img_feature_app_img4_png__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _assets_img_feature_app_img5_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/img/feature/app-img5.png */ "./assets/img/feature/app-img5.png");
/* harmony import */ var _assets_img_feature_app_img5_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_img_feature_app_img5_png__WEBPACK_IMPORTED_MODULE_9__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/AppShots.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





swiper__WEBPACK_IMPORTED_MODULE_2___default.a.use([swiper__WEBPACK_IMPORTED_MODULE_2__["Pagination"], swiper__WEBPACK_IMPORTED_MODULE_2__["Autoplay"]]);







const AppShots = () => {
  const swiperParams = {
    speed: 1000,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    pagination: {
      el: "#appshot-paginations",
      type: "bullets",
      clickable: "true"
    },
    slidesPerView: 5,
    // Responsive breakpoints
    breakpoints: {
      0: {
        slidesPerGroup: 2,
        slidesPerView: 2
      },
      767: {
        slidesPerGroup: 3,
        slidesPerView: 3
      },
      991: {
        slidesPerGroup: 2,
        slidesPerView: 3
      },
      1499: {
        slidesPerGroup: 5,
        slidesPerView: 5
      }
    }
  };
  return __jsx("section", {
    className: "pt-120 pb-155 app-shot-one",
    id: "app",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "justify-content-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 12,
    lg: 8,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 11
    }
  }, __jsx(_SectionTitle__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: "S\xE5 h\xE4r ser appen ut",
    text: "Alla fina illustrationer \xE4r gjorda av illustrat\xF6ren och l\xE4raren Karin Nyg\xE5rds. Texterna \xE4r p\xE5hittade och nyheterna \xE4r tagna fr\xE5n andra k\xE4llor f\xF6r att skydda personuppgifter.",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 13
    }
  })))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    fluid: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "app-shot-one__carousel",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }
  }, __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["Swiper"], _extends({
    className: "app-carousel"
  }, swiperParams, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 11
    }
  }), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img_png__WEBPACK_IMPORTED_MODULE_5___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img2_png__WEBPACK_IMPORTED_MODULE_6___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img3_png__WEBPACK_IMPORTED_MODULE_7___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img4_png__WEBPACK_IMPORTED_MODULE_8___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img5_png__WEBPACK_IMPORTED_MODULE_9___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img_png__WEBPACK_IMPORTED_MODULE_5___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img2_png__WEBPACK_IMPORTED_MODULE_6___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img3_png__WEBPACK_IMPORTED_MODULE_7___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img4_png__WEBPACK_IMPORTED_MODULE_8___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img5_png__WEBPACK_IMPORTED_MODULE_9___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img_png__WEBPACK_IMPORTED_MODULE_5___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img2_png__WEBPACK_IMPORTED_MODULE_6___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img3_png__WEBPACK_IMPORTED_MODULE_7___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 131,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img4_png__WEBPACK_IMPORTED_MODULE_8___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img5_png__WEBPACK_IMPORTED_MODULE_9___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img_png__WEBPACK_IMPORTED_MODULE_5___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 146,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img2_png__WEBPACK_IMPORTED_MODULE_6___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 147,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img3_png__WEBPACK_IMPORTED_MODULE_7___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 155,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img4_png__WEBPACK_IMPORTED_MODULE_8___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 17
    }
  }))), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 160,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-app-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_feature_app_img5_png__WEBPACK_IMPORTED_MODULE_9___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 162,
      columnNumber: 17
    }
  })))), __jsx("div", {
    id: "appshot-paginations",
    className: "swiper-pagination d-flex justify-content-center align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 166,
      columnNumber: 11
    }
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (AppShots);

/***/ }),

/***/ "./components/BannerTwo.js":
/*!*********************************!*\
  !*** ./components/BannerTwo.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_img_banner_shaps1_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/img/banner/shaps1.png */ "./assets/img/banner/shaps1.png");
/* harmony import */ var _assets_img_banner_shaps1_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_img_banner_shaps1_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_img_banner_shaps2_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/img/banner/shaps2.png */ "./assets/img/banner/shaps2.png");
/* harmony import */ var _assets_img_banner_shaps2_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_img_banner_shaps2_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_img_banner_shaps3_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/img/banner/shaps3.png */ "./assets/img/banner/shaps3.png");
/* harmony import */ var _assets_img_banner_shaps3_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_img_banner_shaps3_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_img_banner_shaps4_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/img/banner/shaps4.png */ "./assets/img/banner/shaps4.png");
/* harmony import */ var _assets_img_banner_shaps4_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_img_banner_shaps4_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_img_banner_shaps5_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/img/banner/shaps5.png */ "./assets/img/banner/shaps5.png");
/* harmony import */ var _assets_img_banner_shaps5_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_img_banner_shaps5_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_img_banner_shaps6_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/img/banner/shaps6.png */ "./assets/img/banner/shaps6.png");
/* harmony import */ var _assets_img_banner_shaps6_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_img_banner_shaps6_png__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _assets_img_banner_shaps7_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/img/banner/shaps7.png */ "./assets/img/banner/shaps7.png");
/* harmony import */ var _assets_img_banner_shaps7_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_img_banner_shaps7_png__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _assets_img_banner_mockup_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/img/banner/mockup.png */ "./assets/img/banner/mockup.png");
/* harmony import */ var _assets_img_banner_mockup_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_img_banner_mockup_png__WEBPACK_IMPORTED_MODULE_9__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/BannerTwo.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;











const BannerTwo = () => {
  return __jsx("div", {
    className: "banner-area-inner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "banner-inner-area banner-area1 banner2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 11
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 8,
    lg: 6,
    xl: 5,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "banner-text-inner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 15
    }
  }, __jsx("h1", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 17
    }
  }, "V\xE4lkommen till den \xF6ppna skolplattformen"), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 17
    }
  }, "Vi tr\xF6ttnade p\xE5 att v\xE4nta p\xE5 att Skolplattformen skulle bli anv\xE4ndbar s\xE5 vi tog saken i egna h\xE4nder och byggde en egen. Appen h\xE4mtar samma information som p\xE5 den gamla Skolplattformen men visar den p\xE5 ett snabbare och l\xE4ttare s\xE4tt."), __jsx("a", {
    href: "#",
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 17
    }
  }, "App Store"), __jsx("a", {
    href: "#",
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 17
    }
  }, "Se Exempel"))), __jsx("div", {
    className: "col-lg-5 offset-lg-1 col-md-4 offse-xl-2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "banner-shape-wrap",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "banner-shape-inner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_banner_shaps1_png__WEBPACK_IMPORTED_MODULE_2___default.a,
    alt: "",
    className: "shape shape1 rotate3d",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 19
    }
  }), __jsx("img", {
    src: _assets_img_banner_shaps2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    className: "shape shape2 rotate2d",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 19
    }
  }), __jsx("img", {
    src: _assets_img_banner_shaps3_png__WEBPACK_IMPORTED_MODULE_4___default.a,
    alt: "",
    className: "shape shape3 rotate-2d",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 19
    }
  }), __jsx("img", {
    src: _assets_img_banner_shaps4_png__WEBPACK_IMPORTED_MODULE_5___default.a,
    alt: "",
    className: "shape shape4 rotate3d",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 19
    }
  }), __jsx("img", {
    src: _assets_img_banner_shaps5_png__WEBPACK_IMPORTED_MODULE_6___default.a,
    alt: "",
    className: "shape shape5 rotate2d",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 19
    }
  }), __jsx("img", {
    src: _assets_img_banner_shaps6_png__WEBPACK_IMPORTED_MODULE_7___default.a,
    alt: "",
    className: "shape shape6 rotate-2d",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 19
    }
  }), __jsx("img", {
    src: _assets_img_banner_shaps7_png__WEBPACK_IMPORTED_MODULE_8___default.a,
    alt: "",
    className: "shape shape7 rotate3d",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 19
    }
  }))), __jsx("div", {
    className: "banner-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 15
    }
  }, __jsx("img", {
    src: _assets_img_banner_mockup_png__WEBPACK_IMPORTED_MODULE_9___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 17
    }
  })))))));
};

/* harmony default export */ __webpack_exports__["default"] = (BannerTwo);

/***/ }),

/***/ "./components/BlogHome.js":
/*!********************************!*\
  !*** ./components/BlogHome.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BlogPost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BlogPost */ "./components/BlogPost.js");
/* harmony import */ var _SectionTitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SectionTitle */ "./components/SectionTitle.js");
/* harmony import */ var _assets_img_blog_blog1_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/img/blog/blog1.png */ "./assets/img/blog/blog1.png");
/* harmony import */ var _assets_img_blog_blog1_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_img_blog_blog1_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_img_blog_blog2_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/img/blog/blog2.png */ "./assets/img/blog/blog2.png");
/* harmony import */ var _assets_img_blog_blog2_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_img_blog_blog2_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_img_blog_blog3_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/img/blog/blog3.png */ "./assets/img/blog/blog3.png");
/* harmony import */ var _assets_img_blog_blog3_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_img_blog_blog3_png__WEBPACK_IMPORTED_MODULE_6__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/BlogHome.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const BLOG_HOME_DATA = [{
  title: "Pre and Post Launch Mobile App Marketing Pitfalls to Avoid",
  content: "There are many variations of passages of available but majority have alteration in some by inject humour or random words.",
  link: "/news-details",
  date: "30",
  month: "Sep",
  author: "Admin",
  commentCount: "2",
  image: _assets_img_blog_blog1_png__WEBPACK_IMPORTED_MODULE_4___default.a,
  btnClass: "blog-btn"
}, {
  title: "Pre and Post Launch Mobile App Marketing Pitfalls to Avoid",
  content: "There are many variations of passages of available but majority have alteration in some by inject humour or random words.",
  link: "/news-details",
  date: "30",
  month: "Sep",
  author: "Admin",
  commentCount: "2",
  image: _assets_img_blog_blog2_png__WEBPACK_IMPORTED_MODULE_5___default.a,
  btnClass: "blog-btn"
}, {
  title: "Pre and Post Launch Mobile App Marketing Pitfalls to Avoid",
  content: "There are many variations of passages of available but majority have alteration in some by inject humour or random words.",
  link: "/news-details",
  date: "30",
  month: "Sep",
  author: "Admin",
  commentCount: "2",
  image: _assets_img_blog_blog3_png__WEBPACK_IMPORTED_MODULE_6___default.a,
  btnClass: "blog-btn"
}];

const BlogHome = () => {
  return __jsx("section", {
    className: "border-top pt-115 pb-80",
    id: "blog",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "justify-content-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 12,
    lg: 8,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 11
    }
  }, __jsx(_SectionTitle__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Our News & Articles",
    text: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt    mollit lorem ipsum anim id est laborum perspiciatis unde.",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 13
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 9
    }
  }, BLOG_HOME_DATA.map((blogPost, index) => __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 4,
    lg: 4,
    key: `blog-post-${index}`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 13
    }
  }, __jsx(_BlogPost__WEBPACK_IMPORTED_MODULE_2__["default"], {
    postLink: blogPost.link,
    postAuthor: blogPost.author,
    postDate: blogPost.date,
    postMonth: blogPost.month,
    postCommentCount: blogPost.commentCount,
    postTitle: blogPost.title,
    postContent: blogPost.content,
    postImage: blogPost.image,
    btnClass: blogPost.btnClass,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 15
    }
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (BlogHome);

/***/ }),

/***/ "./components/BlogPost.js":
/*!********************************!*\
  !*** ./components/BlogPost.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/BlogPost.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const BlogPost = props => {
  return __jsx("div", {
    className: "single-blog-inner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "post-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: props.postLink,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 9
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 11
    }
  }, __jsx("img", {
    src: props.postImage,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 13
    }
  }))), __jsx("div", {
    className: "post-date",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 9
    }
  }, __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 11
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 13
    }
  }, props.postDate), props.postMonth))), __jsx("div", {
    className: "post-content",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "post-details",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "post-info d-flex",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 11
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: props.postLink,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 15
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 17
    }
  }, "By"), props.postAuthor)), __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: props.postLink,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 13
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 15
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 17
    }
  }, props.postCommentCount), " Comment"))), __jsx("div", {
    className: "post-title",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 11
    }
  }, __jsx("h3", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 13
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: props.postLink,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 15
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 17
    }
  }, props.postTitle)))), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 11
    }
  }, props.postContent), __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: props.postLink,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 11
    }
  }, __jsx("a", {
    className: props.btnClass,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 13
    }
  }, "Read More")))));
};

/* harmony default export */ __webpack_exports__["default"] = (BlogPost);

/***/ }),

/***/ "./components/Clients.js":
/*!*******************************!*\
  !*** ./components/Clients.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper */ "swiper");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(swiper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/img/partner2.png */ "./assets/img/partner2.png");
/* harmony import */ var _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/Clients.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




swiper__WEBPACK_IMPORTED_MODULE_1___default.a.use([swiper__WEBPACK_IMPORTED_MODULE_1__["Autoplay"]]);


const Clients = () => {
  const params = {
    spaceBetween: 100,
    loop: true,
    autoplay: {
      delay: 3000
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      500: {
        spaceBetween: 50,
        slidesPerView: 3
      },
      768: {
        spaceBetween: 50,
        slidesPerView: 4
      },
      992: {
        slidesPerView: 5
      }
    }
  };
  return __jsx("section", {
    className: "pt-120 pb-120",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "row",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "col",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "partner-carousel-wrap",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 13
    }
  }, __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["Swiper"], _extends({
    className: "partner-carousel"
  }, params, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 15
    }
  }), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 19
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 19
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 19
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 19
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 19
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 19
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 19
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 19
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 19
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 19
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-partner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 17
    }
  }, __jsx("img", {
    src: _assets_img_partner2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 19
    }
  }))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Clients);

/***/ }),

/***/ "./components/CtaOne.js":
/*!******************************!*\
  !*** ./components/CtaOne.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/CtaOne.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const CtaOne = () => {
  return __jsx("section", {
    className: "border-top pt-110 pb-150",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "justify-content-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 12,
    lg: 10,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "download-app-inner text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 13
    }
  }, __jsx("h2", {
    className: "h1",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 15
    }
  }, "Ladda ner appen idag &", __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 39
    }
  }), "spara flera minuter varje dag"), __jsx("h3", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 15
    }
  }, "Du kommer inte att \xE5ngra dig."), __jsx("a", {
    href: "#",
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 15
    }
  }, "App Store"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (CtaOne);

/***/ }),

/***/ "./components/CtaThree.js":
/*!********************************!*\
  !*** ./components/CtaThree.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_img_icons_solution1_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/img/icons/solution1.svg */ "./assets/img/icons/solution1.svg");
/* harmony import */ var _assets_img_icons_solution1_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_img_icons_solution1_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_img_girls_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/img/girls.png */ "./assets/img/girls.png");
/* harmony import */ var _assets_img_girls_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_img_girls_png__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/CtaThree.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const CtaThree = () => {
  return __jsx("section", {
    className: "pt-120 pb-120",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    lg: 5,
    sm: 5,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "user-interact-inner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 13
    }
  }, __jsx("h2", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 15
    }
  }, "Se summering f\xF6r alla dina barn p\xE5 ett st\xE4lle"), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 15
    }
  }, "Vi har r\xE4knat, det tar flera minuter att f\xE5 en uppfattning om vad som h\xE4nder i skolan imorgon f\xF6r dina barn. I v\xE5r app kan du direkt se allt som \xE4r aktuellt f\xF6r alla barnen p\xE5 en och samma sk\xE4rm."), __jsx("a", {
    href: "#",
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 15
    }
  }, "App Store"))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    lg: 7,
    sm: 7,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "user-interact-image type2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }
  }, __jsx("img", {
    src: _assets_img_girls_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 15
    }
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (CtaThree);

/***/ }),

/***/ "./components/CtaTwo.js":
/*!******************************!*\
  !*** ./components/CtaTwo.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_img_boys_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/img/boys.png */ "./assets/img/boys.png");
/* harmony import */ var _assets_img_boys_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_img_boys_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/img/icons/goal.svg */ "./assets/img/icons/goal.svg");
/* harmony import */ var _assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/CtaTwo.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const CtaTwo = () => {
  return __jsx("section", {
    className: "bg-2 pt-120 pb-120",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    lg: 7,
    sm: 7,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "user-interact-image",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 13
    }
  }, __jsx("img", {
    src: _assets_img_boys_png__WEBPACK_IMPORTED_MODULE_2___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 15
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    lg: 5,
    sm: 5,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "user-interact-inner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 13
    }
  }, __jsx("h2", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 15
    }
  }, "Lika s\xE4kert"), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 15
    }
  }, "Ingen information om dina barn skickas till oss, all kommunikatoin g\xE5r direkt mellan din telefon och Skolplattformens servrar. Du loggar in med BankID som vanligt."), __jsx("a", {
    href: "#",
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 15
    }
  }, "App Store"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (CtaTwo);

/***/ }),

/***/ "./components/FeatureCard.js":
/*!***********************************!*\
  !*** ./components/FeatureCard.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/FeatureCard.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const FeatureCard = props => {
  return __jsx("div", {
    className: "single-feature-inner text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "feature-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 7
    }
  }, __jsx("img", {
    src: props.image,
    className: "svg",
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 9
    }
  })), __jsx("h5", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }
  }, props.title), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }
  }, props.text));
};

/* harmony default export */ __webpack_exports__["default"] = (FeatureCard);

/***/ }),

/***/ "./components/Features.js":
/*!********************************!*\
  !*** ./components/Features.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "swiper");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swiper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SectionTitle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SectionTitle */ "./components/SectionTitle.js");
/* harmony import */ var _FeatureCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FeatureCard */ "./components/FeatureCard.js");
/* harmony import */ var _assets_img_icons_project_management_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/img/icons/project-management.svg */ "./assets/img/icons/project-management.svg");
/* harmony import */ var _assets_img_icons_project_management_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_img_icons_project_management_svg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_img_icons_solution_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/img/icons/solution.svg */ "./assets/img/icons/solution.svg");
/* harmony import */ var _assets_img_icons_solution_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_img_icons_solution_svg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _assets_img_icons_planning_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/img/icons/planning.svg */ "./assets/img/icons/planning.svg");
/* harmony import */ var _assets_img_icons_planning_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_img_icons_planning_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/img/icons/goal.svg */ "./assets/img/icons/goal.svg");
/* harmony import */ var _assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_9__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/Features.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





swiper__WEBPACK_IMPORTED_MODULE_2___default.a.use([swiper__WEBPACK_IMPORTED_MODULE_2__["Pagination"], swiper__WEBPACK_IMPORTED_MODULE_2__["Autoplay"]]);






const FEATURES_DATA = [{
  title: "Öppen källkod",
  text: "Har du egna förslag på förbättringar? Du kan hjälpa till.",
  image: _assets_img_icons_project_management_svg__WEBPACK_IMPORTED_MODULE_6___default.a
}, {
  title: "Bygger på ny teknik",
  text: "Till skillnad från den gamla skolplattformen så bygger den öppna på senaste tekniken.",
  image: _assets_img_icons_solution_svg__WEBPACK_IMPORTED_MODULE_7___default.a
}, {
  title: "Det här är bara början",
  text: "Vi hoppas med denna app inspirera till fler initiativ i hela den offentliga digitaliseringen.",
  image: _assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_9___default.a
}, {
  title: "Stödjer fler skolsystem",
  text: "Just nu stöds bara Stockholm Stads skolplattform men med din hjälp kan fler skolplattformar integreras så att du slipper logga in i flera appar om du har barn i olika skolor.",
  image: _assets_img_icons_planning_svg__WEBPACK_IMPORTED_MODULE_8___default.a
}, {
  title: "Skolan är allas vårt ansvar",
  text: "Vi insåg att klaga inte hjälper så mycket så vi tog tag i problemet istället. Häng med!",
  image: _assets_img_icons_project_management_svg__WEBPACK_IMPORTED_MODULE_6___default.a
}];

const Features = () => {
  const swiperParams = {
    slidesPerView: 3,
    slidesPerGroup: 3,
    centeredSlides: true,
    spaceBetween: 30,
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: "#features-paginations",
      type: "bullets",
      clickable: true
    },
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0
      },
      575: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0
      },
      768: {
        slidesPerGroup: 2,
        slidesPerView: 2
      },
      991: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      992: {
        slidesPerGroup: 3,
        slidesPerView: 3
      }
    }
  };
  return __jsx("section", {
    className: "pb-110",
    id: "features",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "justify-content-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 12,
    lg: 8,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 11
    }
  }, __jsx(_SectionTitle__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: "Enkelhet och snabbhet",
    text: "Vi vill att det ska vara enkelt att f\xE5 en \xF6verblick \xF6ver vad som h\xE4nder i skolan. Vi har gjort allt f\xF6r att ge dig en enkel och snabb \xF6versikt \xF6ver alla dina barn och det som \xE4r aktuellt just nu i skolan.",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 13
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "justify-content-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    xl: 10,
    lg: 12,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 11
    }
  }, __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["Swiper"], _extends({
    className: "feature-carousel"
  }, swiperParams, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 13
    }
  }), FEATURES_DATA.map((feature, index) => __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    key: `feature-post-${index}`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 17
    }
  }, __jsx(_FeatureCard__WEBPACK_IMPORTED_MODULE_5__["default"], {
    title: feature.title,
    text: feature.text,
    image: feature.image,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 19
    }
  })))), __jsx("div", {
    id: "features-paginations",
    className: "swiper-pagination d-flex justify-content-center align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 13
    }
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Features);

/***/ }),

/***/ "./components/Footer.js":
/*!******************************!*\
  !*** ./components/Footer.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_img_footer_bg_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/img/footer-bg.png */ "./assets/img/footer-bg.png");
/* harmony import */ var _assets_img_footer_bg_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_img_footer_bg_png__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/img/logo.png */ "./assets/img/logo.png");
/* harmony import */ var _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_img_logo_png__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/Footer.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Footer = () => {
  return __jsx("footer", {
    className: "footer",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "footerbg",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }
  }, __jsx("img", {
    src: _assets_img_footer_bg_png__WEBPACK_IMPORTED_MODULE_1___default.a,
    className: "svg",
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 9
    }
  })), __jsx("div", {
    className: "footer-top pt-120 pb-110",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "row",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "col-lg-3 col-sm-6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "footer-widget",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "footer-logo",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "index.html",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 19
    }
  }, __jsx("img", {
    src: _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_2___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 21
    }
  }))), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 17
    }
  }, "Skolplattformen utvecklas av f\xF6r\xE4ldrar f\xF6r f\xF6r\xE4ldrar. Vill du hj\xE4lpa till? Kom till v\xE5r ", __jsx("a", {
    href: "https://github.com/kolplattformen",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 107
    }
  }, "Github"), ", d\xE4r finns all k\xE4llkod och \xE4ven uppgifter att ta tag i, vi beh\xF6ver hj\xE4lp med allt fr\xE5n illustrationer, UX, Design och programmering. Vi har \xE4ven en Discord d\xE4r vi hj\xE4lps \xE5t."), __jsx("div", {
    className: "footer-social-area",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 17
    }
  }, __jsx("ul", {
    className: "social-icons social-icons-light nav",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 19
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 21
    }
  }, __jsx("a", {
    href: "#",
    target: "_blank",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 23
    }
  }, __jsx("i", {
    className: "fa fa-facebook-f",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 25
    }
  }))), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 21
    }
  }, __jsx("a", {
    href: "#",
    target: "_blank",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 23
    }
  }, __jsx("i", {
    className: "fa fa-twitter",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 25
    }
  }))), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 21
    }
  }, __jsx("a", {
    href: "#",
    target: "_blank",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 23
    }
  }, __jsx("i", {
    className: "fa fa-google-plus",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 25
    }
  }))), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 21
    }
  }, __jsx("a", {
    href: "#",
    target: "_blank",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 23
    }
  }, __jsx("i", {
    className: "fa fa-linkedin",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 25
    }
  }))))))), __jsx("div", {
    className: "col-lg-3 col-sm-6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "footer-widget",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "widget-header",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 17
    }
  }, __jsx("h5", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 19
    }
  }, "Vilka \xE4r vi?")), __jsx("div", {
    className: "widget-body",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 17
    }
  }, __jsx("ul", {
    className: "address-list",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 19
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 21
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 23
    }
  }, __jsx("i", {
    className: "fa  fa-twitter",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 25
    }
  })), __jsx("a", {
    href: "https://twitter.com/@landgren",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 23
    }
  }, "Christian Landgren")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 21
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 23
    }
  }, __jsx("i", {
    className: "fa  fa-twitter",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 25
    }
  })), __jsx("a", {
    href: "https://twitter.com/@erikhellman",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 23
    }
  }, "Erik Hellman")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 21
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 23
    }
  }, __jsx("i", {
    className: "fa  fa-twitter",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 25
    }
  })), __jsx("a", {
    href: "https://twitter.com/@johanobrink",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 23
    }
  }, "Johan \xD6brink")))))), __jsx("div", {
    className: "col-lg-3 col-sm-6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "footer-widget",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "widget-header",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 17
    }
  }, __jsx("h5", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 19
    }
  }, "Extra Links"))), __jsx("div", {
    className: "widget-body",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "extra-link",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: "link-left",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 19
    }
  }, __jsx("ul", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 21
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 23
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 25
    }
  }, "About")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 23
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 25
    }
  }, "Our Team")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101,
      columnNumber: 23
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 25
    }
  }, "Features")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 23
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 25
    }
  }, "Blog")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 23
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 25
    }
  }, "How It Works")))), __jsx("div", {
    className: "link-right",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 19
    }
  }, __jsx("ul", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 21
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 23
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 25
    }
  }, "Help")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 23
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 25
    }
  }, "Support")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 23
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 25
    }
  }, "Clients")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 23
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 25
    }
  }, "Blog")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 126,
      columnNumber: 23
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 127,
      columnNumber: 25
    }
  }, "Contact"))))))), __jsx("div", {
    className: "col-lg-3 col-sm-6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "footer-widget",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 136,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "widget-body",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: "twetter-post-inner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: "footer-post-details",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 21
    }
  }, "@iteam1337 Digitalisering p\xE5 riktigt. ", __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 140,
      columnNumber: 61
    }
  }), __jsx("a", {
    href: "https://iteam.se",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 23
    }
  }, "https://iteam.se")), __jsx("div", {
    className: "twetter-post",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 21
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 144,
      columnNumber: 23
    }
  }, __jsx("i", {
    className: "fa fa-twitter",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145,
      columnNumber: 25
    }
  })), "Iteam, en sponsor")))))))), __jsx("div", {
    className: "footer-bottom",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 156,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "footer-text text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 157,
      columnNumber: 9
    }
  }, __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 158,
      columnNumber: 11
    }
  }, "\xA9 copyright 2019 by Layerdrops.com"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./components/FunFacts.js":
/*!********************************!*\
  !*** ./components/FunFacts.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "react-bootstrap");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-countup */ "react-countup");
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_countup__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_visibility_sensor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-visibility-sensor */ "react-visibility-sensor");
/* harmony import */ var react_visibility_sensor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_visibility_sensor__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/FunFacts.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const FUNFACTS_DATA = [{
  count: "1000000000",
  title: "Kostade orginalet"
}, {
  count: "6389",
  title: "Negativa kommentarer"
}, {
  count: "3",
  title: "5 stjärniga reviews"
}, {
  count: "7",
  title: "År att utveckla"
}];

const FunFacts = () => {
  const {
    0: counter,
    1: setCounter
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    startCounter: false
  });

  const onVisibilityChange = isVisible => {
    if (isVisible) {
      setCounter({
        startCounter: true
      });
    }
  };

  return __jsx("section", {
    className: "border-top pt-120 pb-80",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  }, FUNFACTS_DATA.map((funfact, index) => __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    md: 3,
    sm: 6,
    key: `funfact-post-${index}`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "single-counter text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 15
    }
  }, __jsx("span", {
    className: "counter",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 17
    }
  }, __jsx(react_visibility_sensor__WEBPACK_IMPORTED_MODULE_3___default.a, {
    onChange: onVisibilityChange,
    offset: {
      top: 10
    },
    delayedCall: true,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 19
    }
  }, __jsx(react_countup__WEBPACK_IMPORTED_MODULE_2___default.a, {
    end: counter.startCounter ? funfact.count : 0,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 21
    }
  }))), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 17
    }
  }, funfact.title)))))));
};

/* harmony default export */ __webpack_exports__["default"] = (FunFacts);

/***/ }),

/***/ "./components/HeaderTwo.js":
/*!*********************************!*\
  !*** ./components/HeaderTwo.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NavLinks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavLinks */ "./components/NavLinks.js");
/* harmony import */ var _assets_img_logo2_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/img/logo2.png */ "./assets/img/logo2.png");
/* harmony import */ var _assets_img_logo2_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_img_logo2_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/img/logo.png */ "./assets/img/logo.png");
/* harmony import */ var _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_img_logo_png__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/HeaderTwo.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const HeaderHome = props => {
  const {
    0: sticky,
    1: setSticky
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleScroll = () => {
    if (window.scrollY > 70) {
      setSticky(true);
    } else if (window.scrollY < 70) {
      setSticky(false);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    window.addEventListener("scroll", handleScroll);
    mobileMenu();
    return () => {
      mobileMenu();
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const mobileMenu = () => {
    document.querySelector(".side-menu__toggler").addEventListener("click", function (e) {
      document.querySelector(".side-menu__block").classList.toggle("active");
      e.preventDefault();
    }); //Close Mobile Menu

    let sideMenuCloser = document.querySelectorAll(".side-menu__close-btn, .side-menu__block-overlay");
    sideMenuCloser.forEach(sideMenuCloserBtn => {
      sideMenuCloserBtn.addEventListener("click", function (e) {
        document.querySelector(".side-menu__block").classList.remove("active");
        e.preventDefault();
      });
    });
  };

  return __jsx("header", {
    className: `header ${props.extraClassName}`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: `main-header inner-header header-2 ${sticky === true ? "sticky fadeInDown" : " "}`,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "main-menu-wrap",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "row align-items-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "col-xl-3 col-lg-3 col-md-4 col-6",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "logo",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "/",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 19
    }
  }, __jsx("img", {
    class: "main-logo2",
    src: _assets_img_logo2_png__WEBPACK_IMPORTED_MODULE_2___default.a,
    alt: "jironis",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 21
    }
  }), __jsx("img", {
    class: "sticky-logo",
    src: _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "jironis",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 21
    }
  })))), __jsx("div", {
    className: "col-xl-6 col-lg-6 col-md-4 col-6 menu-button",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "menu--inner-area clearfix",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: "menu-wraper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 19
    }
  }, __jsx("nav", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: "header-menu",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 23
    }
  }, __jsx("div", {
    id: "menu-button",
    className: "menu-opened side-menu__toggler",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 25
    }
  }, __jsx("i", {
    className: "fa fa-bars",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 27
    }
  })), __jsx(_NavLinks__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 25
    }
  })))))), __jsx("div", {
    className: "col-lg-3 col-md-4 col-sm-5 d-md-block d-none",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "urgent-call text-right",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "#",
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 19
    }
  }, "Ladda ner"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (HeaderHome);

/***/ }),

/***/ "./components/Layout.js":
/*!******************************!*\
  !*** ./components/Layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-scroll */ "react-scroll");
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_scroll__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_img_favicon_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/img/favicon.png */ "./assets/img/favicon.png");
/* harmony import */ var _assets_img_favicon_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_img_favicon_png__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/Layout.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const Layout = props => {
  const {
    0: scrollTop,
    1: setScrollTop
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleScrollTop = () => {
    if (window.scrollY > 70) {
      setScrollTop(true);
    } else if (window.scrollY < 70) {
      setScrollTop(false);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    window.addEventListener("scroll", handleScrollTop);
    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  });
  return __jsx("div", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 5
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }
  }, __jsx("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 9
    }
  }), __jsx("title", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 9
    }
  }, props.pageTitle), __jsx("link", {
    rel: "shortcut icon",
    type: "image/png",
    href: _assets_img_favicon_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 9
    }
  }), __jsx("link", {
    href: "https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700",
    rel: "stylesheet",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 9
    }
  })), __jsx("div", {
    className: "page-wrapper",
    id: "wrapper",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }, props.children), scrollTop === true ? __jsx("div", {
    class: "back-to-top show",
    style: {
      cursor: "pointer"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  }, __jsx(react_scroll__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "wrapper",
    smooth: true,
    duration: 500,
    className: "scroll-to-top",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 11
    }
  }, __jsx("i", {
    class: "fa fa-chevron-up",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 13
    }
  }))) : null);
};

/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./components/MobileMenu.js":
/*!**********************************!*\
  !*** ./components/MobileMenu.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NavLinks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavLinks */ "./components/NavLinks.js");
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/MobileMenu.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const MobileMenu = () => {
  return __jsx("div", {
    className: "side-menu__block",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "side-menu__block-overlay custom-cursor__overlay",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "cursor",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 9
    }
  }), __jsx("div", {
    className: "cursor-follower",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 9
    }
  })), __jsx("div", {
    className: "side-menu__block-inner ",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "side-menu__top justify-content-end",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }
  }, __jsx("a", {
    href: "#",
    className: "side-menu__toggler side-menu__close-btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 11
    }
  }, __jsx("i", {
    className: "fa fa-times",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 13
    }
  }))), __jsx("nav", {
    className: "mobile-nav__container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 9
    }
  }, __jsx(_NavLinks__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "side-menu__sep",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 9
    }
  }), __jsx("div", {
    className: "side-menu__content",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }
  }, __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 11
    }
  }, "Skolplattformen.org \xE4r en \xF6ppen programvara som byggs av frustrerade f\xF6r\xE4ldrar. Hj\xE4lp till du ocks\xE5. Kontakta oss nedan:"), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 11
    }
  }, __jsx("a", {
    href: "mailto:info@skolplattformen.org",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 13
    }
  }, "info@skolplattformen.org"), " ", __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 84
    }
  }), __jsx("a", {
    href: "tel:+46707755831",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 13
    }
  }, "+46 70 775 58 31")), __jsx("div", {
    className: "side-menu__social",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 11
    }
  }, __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 13
    }
  }, __jsx("i", {
    className: "fa fa-facebook-square",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 15
    }
  })), __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 13
    }
  }, __jsx("i", {
    className: "fa fa-twitter",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 15
    }
  })), __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 13
    }
  }, __jsx("i", {
    className: "fa fa-instagram",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 15
    }
  })), __jsx("a", {
    href: "#",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 13
    }
  }, __jsx("i", {
    className: "fa fa-pinterest-p",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 15
    }
  }))))));
};

/* harmony default export */ __webpack_exports__["default"] = (MobileMenu);

/***/ }),

/***/ "./components/NavLinks.js":
/*!********************************!*\
  !*** ./components/NavLinks.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-scroll */ "react-scroll");
/* harmony import */ var react_scroll__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_scroll__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/NavLinks.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const NavLinks = () => {
  // const [dropdownStatus, setDropdownStatus] = useState(false);
  const handleDropdownStatus = e => {
    // setDropdownStatus(!dropdownStatus);
    let clickedItem = e.currentTarget.parentNode;
    clickedItem.querySelector(".dropdown-list").classList.toggle("show");
  };

  return __jsx("ul", {
    className: "main-nav__navigation-box",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 5
    }
  }, __jsx("li", {
    className: "dropdown",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 9
    }
  }, __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 13
    }
  }, "Home"), __jsx("i", {
    className: "fa fa-angle-down",
    onClick: handleDropdownStatus,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 13
    }
  }))), __jsx("ul", {
    className: "dropdown-list",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 9
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 11
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 13
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 15
    }
  }, "Home One"))), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 11
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/index-2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 13
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 15
    }
  }, "Home Two"))))), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }
  }, __jsx(react_scroll__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    activeClass: "current",
    to: "features",
    spy: true,
    smooth: true,
    offset: -70,
    duration: 500,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 9
    }
  }, "Features")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }
  }, __jsx(react_scroll__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    activeClass: "current",
    to: "app",
    spy: true,
    smooth: true,
    offset: -70,
    duration: 500,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }
  }, "App Screens")), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 7
    }
  }, __jsx(react_scroll__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    activeClass: "current",
    to: "pricing",
    spy: true,
    smooth: true,
    offset: -70,
    duration: 500,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 9
    }
  }, "Pricing")), __jsx("li", {
    className: "dropdown",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 7
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/news",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 9
    }
  }, __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 13
    }
  }, "News"), __jsx("i", {
    className: "fa fa-angle-down",
    onClick: handleDropdownStatus,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 13
    }
  }))), __jsx("ul", {
    className: "dropdown-list",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 9
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 11
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/news",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 13
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 15
    }
  }, "News"))), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 11
    }
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_1___default.a, {
    href: "/news-details",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 13
    }
  }, __jsx("a", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 15
    }
  }, "News Details"))))));
};

/* harmony default export */ __webpack_exports__["default"] = (NavLinks);

/***/ }),

/***/ "./components/Pricing.js":
/*!*******************************!*\
  !*** ./components/Pricing.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/Pricing.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const Pricing = () => {
  const {
    0: pricing,
    1: setPricing
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);

  const handleClick = e => {
    e.preventDefault();
    setPricing(!pricing);
  };

  return __jsx("section", {
    className: "pb-90",
    id: "pricing",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "row justify-content-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "col-md-12 col-lg-8",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "section-title text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 13
    }
  }, __jsx("h2", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 15
    }
  }, "Vad kostar det och varf\xF6r \xE4r det inte gratis?"), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 15
    }
  }, "Vi som bygger appen vill g\xE4rna forts\xE4tta vidareutveckla den och \xE4ven ha m\xF6jlighet att ge ers\xE4ttning till de som hj\xE4lper till. D\xE4rf\xF6r kostar det 10kr att ladda ner appen. Det \xE4r en eng\xE5ngskostnad och hj\xE4lper oss att g\xF6ra appen b\xE4ttre.")))), __jsx("div", {
    className: "row",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "col-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "price-content",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }
  }, pricing === false ? __jsx("div", {
    id: "month",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: "row",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: "col-md-6 col-lg-4",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: "single-price-plan text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 23
    }
  }, __jsx("div", {
    className: "single-price-top",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 25
    }
  }, __jsx("h4", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 27
    }
  }, "Eng\xE5ngskostnad"), __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 27
    }
  }, "10kr")), __jsx("div", {
    className: "single-price-body",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 25
    }
  }, __jsx("div", {
    className: "price-list",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 27
    }
  }, __jsx("ul", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 29
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 35
    }
  })), "BankID inloggning"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 35
    }
  })), "Se nyheter"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 35
    }
  })), "Se notifieringar"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 35
    }
  })), "Kontaktuppgifter till andra f\xF6r\xE4ldrar"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-times",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 35
    }
  })), "Gratis support"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-times",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84,
      columnNumber: 35
    }
  })), "Pushnotifieringar"))), __jsx("a", {
    href: "#",
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 27
    }
  }, "App Store")))))) : null, pricing === true ? __jsx("div", {
    id: "year",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: "row",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 19
    }
  }, __jsx("div", {
    className: "col-md-6 col-lg-4",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: "single-price-plan text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 23
    }
  }, __jsx("div", {
    className: "single-price-top",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 25
    }
  }, __jsx("h4", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 27
    }
  }, "Standard"), __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 27
    }
  }, "$200")), __jsx("div", {
    className: "single-price-body",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 25
    }
  }, __jsx("div", {
    className: "price-list",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 27
    }
  }, __jsx("ul", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 29
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 35
    }
  })), "10 pages"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125,
      columnNumber: 35
    }
  })), "500 gb storage"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 133,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 35
    }
  })), "10 sdd Database"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 142,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-times",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 143,
      columnNumber: 35
    }
  })), "Free coustom domain"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 150,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 151,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-times",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 152,
      columnNumber: 35
    }
  })), "24/7 free support"))), __jsx("a", {
    href: "#",
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161,
      columnNumber: 27
    }
  }, "Get Started")))), __jsx("div", {
    className: "col-md-6 col-lg-4",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 167,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: "single-price-plan active text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 168,
      columnNumber: 23
    }
  }, __jsx("div", {
    className: "single-price-top",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 169,
      columnNumber: 25
    }
  }, __jsx("h4", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 27
    }
  }, "Business"), __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 171,
      columnNumber: 27
    }
  }, "$300")), __jsx("div", {
    className: "single-price-body",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173,
      columnNumber: 25
    }
  }, __jsx("div", {
    className: "price-list",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 174,
      columnNumber: 27
    }
  }, __jsx("ul", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 175,
      columnNumber: 29
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 176,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178,
      columnNumber: 35
    }
  })), "10 pages"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 187,
      columnNumber: 35
    }
  })), "500 gb storage"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 194,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 195,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 196,
      columnNumber: 35
    }
  })), "10 sdd Database"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 203,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 204,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 205,
      columnNumber: 35
    }
  })), "Free coustom domain"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 212,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 213,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-times",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 214,
      columnNumber: 35
    }
  })), "24/7 free support"))), __jsx("a", {
    href: "#",
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 27
    }
  }, "Get Started")))), __jsx("div", {
    className: "col-md-6 col-lg-4",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 229,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: "single-price-plan text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 23
    }
  }, __jsx("div", {
    className: "single-price-top",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 25
    }
  }, __jsx("h4", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 232,
      columnNumber: 27
    }
  }, "Professional"), __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 233,
      columnNumber: 27
    }
  }, "$400")), __jsx("div", {
    className: "single-price-body",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 25
    }
  }, __jsx("div", {
    className: "price-list",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 27
    }
  }, __jsx("ul", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 29
    }
  }, __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 35
    }
  })), "10 pages"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 247,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 249,
      columnNumber: 35
    }
  })), "500 gb storage"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 35
    }
  })), "10 sdd Database"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 267,
      columnNumber: 35
    }
  })), "Free coustom domain"), __jsx("li", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 31
    }
  }, __jsx("span", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 33
    }
  }, __jsx("i", {
    className: "fa fa-check",
    "aria-hidden": "true",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 276,
      columnNumber: 35
    }
  })), "24/7 free support"))), __jsx("a", {
    href: "#",
    className: "btn",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 285,
      columnNumber: 27
    }
  }, "Get Started")))))) : null)))));
};

/* harmony default export */ __webpack_exports__["default"] = (Pricing);

/***/ }),

/***/ "./components/SectionTitle.js":
/*!************************************!*\
  !*** ./components/SectionTitle.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/SectionTitle.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


const SectionTitle = props => {
  return __jsx("div", {
    className: "section-title text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5,
      columnNumber: 5
    }
  }, __jsx("h2", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 7
    }
  }, props.title), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7,
      columnNumber: 7
    }
  }, props.text));
};

/* harmony default export */ __webpack_exports__["default"] = (SectionTitle);

/***/ }),

/***/ "./components/Testimonials.js":
/*!************************************!*\
  !*** ./components/Testimonials.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper */ "swiper");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(swiper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/react */ "swiper/react");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swiper_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_img_wass_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/img/wass.png */ "./assets/img/wass.png");
/* harmony import */ var _assets_img_wass_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_img_wass_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_img_feature_author2_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/img/feature/author2.png */ "./assets/img/feature/author2.png");
/* harmony import */ var _assets_img_feature_author2_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_img_feature_author2_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_img_feature_author1_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/img/feature/author1.png */ "./assets/img/feature/author1.png");
/* harmony import */ var _assets_img_feature_author1_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_img_feature_author1_png__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/Testimonials.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







swiper__WEBPACK_IMPORTED_MODULE_1___default.a.use([swiper__WEBPACK_IMPORTED_MODULE_1__["Autoplay"], swiper__WEBPACK_IMPORTED_MODULE_1__["Thumbs"], swiper__WEBPACK_IMPORTED_MODULE_1__["Navigation"]]);

const Testimonials = () => {
  const {
    0: thumbsSwiper,
    1: setThumbsSwiper
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const testimmonialsParams = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: "#testi-swiper-button-next",
      prevEl: "#testi-swiper-button-prev"
    },
    autoplay: {
      delay: 3000
    }
  };
  const thumbnailsParam = {
    slidesPerView: 3,
    spaceBetween: 20,
    autoplay: {
      delay: 3000
    },
    breakpoints: {
      0: {
        slidesPerView: 2
      },
      500: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      }
    }
  };
  return __jsx("section", {
    className: "pt-120 pb-110 bg-2",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "row justify-content-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "col-md-8",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "testimonial-author-arousel text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "testimonial-author-inner",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 15
    }
  }, __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["Swiper"], _extends({
    className: "author-carousel",
    onSwiper: setThumbsSwiper
  }, thumbnailsParam, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 17
    }
  }), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-author-imge",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 19
    }
  }, __jsx("img", {
    src: _assets_img_wass_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 21
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-author-imge",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 19
    }
  }, __jsx("img", {
    src: _assets_img_feature_author2_png__WEBPACK_IMPORTED_MODULE_4___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 21
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-author-imge",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 19
    }
  }, __jsx("img", {
    src: _assets_img_feature_author1_png__WEBPACK_IMPORTED_MODULE_5___default.a,
    alt: "",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 21
    }
  }))))), __jsx("div", {
    className: "testimonial-author-comment text-center",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 13
    }
  }, __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["Swiper"], _extends({
    className: "author-comment-carousel",
    thumbs: {
      swiper: thumbsSwiper
    }
  }, testimmonialsParams, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 15
    }
  }), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-author-comment",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 17
    }
  }, __jsx("h4", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 19
    }
  }, "This is due to their excellent service, competitive", __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 21
    }
  }), " pricing and customer support. It\u2019s throughly", __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 21
    }
  }), " refresing to get such a personal touch."), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 19
    }
  }, "Shirley Smith")), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-author-comment",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 17
    }
  }, __jsx("h4", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 19
    }
  }, "This is due to their excellent service, competitive", __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 21
    }
  }), " pricing and customer support. It\u2019s throughly", __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 21
    }
  }), " refresing to get such a personal touch."), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 19
    }
  }, "Shirley Smith")), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_2__["SwiperSlide"], {
    className: "single-author-comment",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 17
    }
  }, __jsx("h4", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 19
    }
  }, "This is due to their excellent service, competitive", __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 21
    }
  }), " pricing and customer support. It\u2019s throughly", __jsx("br", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 21
    }
  }), " refresing to get such a personal touch."), __jsx("p", {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 19
    }
  }, "Shirley Smith"))), __jsx("div", {
    className: "testimonial-author-comment-nav",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 15
    }
  }, __jsx("button", {
    id: "testi-swiper-button-prev",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 17
    }
  }, __jsx("i", {
    className: "fa fa-angle-left",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 19
    }
  })), __jsx("button", {
    id: "testi-swiper-button-next",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 17
    }
  }, __jsx("i", {
    className: "fa fa-angle-right",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 19
    }
  }))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Testimonials);

/***/ }),

/***/ "./components/Video.js":
/*!*****************************!*\
  !*** ./components/Video.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_modal_video__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-modal-video */ "react-modal-video");
/* harmony import */ var react_modal_video__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_modal_video__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/Video.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Video = () => {
  const {
    0: open,
    1: setOpen
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    isOpen: false
  });

  const openModal = e => {
    e.preventDefault();
    setOpen({
      isOpen: true
    });
  };

  return __jsx("section", {
    className: "app-video",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15,
      columnNumber: 5
    }
  }, __jsx(react_modal_video__WEBPACK_IMPORTED_MODULE_1___default.a, {
    channel: "youtube",
    isOpen: open.isOpen,
    videoId: "Kl5B6MBAntI",
    onClose: () => setOpen({
      isOpen: false
    }),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }
  }), __jsx("div", {
    className: "container",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "row",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "col-12",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "theme-video-wrap",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 13
    }
  }, __jsx("span", {
    onClick: openModal,
    style: {
      cursor: "pointer"
    },
    className: "video-btn",
    "data-popup": "video",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 15
    }
  }, __jsx("i", {
    className: "fa fa-play",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 17
    }
  })))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Video);

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _url = __webpack_require__(/*! url */ "url");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "./node_modules/next/dist/next-server/lib/utils.js");

var _router = _interopRequireDefault(__webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js"));

function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

var observer;
var listeners = new Map();
var IntersectionObserver = false ? undefined : null;
var prefetched = {};

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (observer) {
    return observer;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      var cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

var listenToIntersections = (el, cb) => {
  var observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: formatUrl(href),
        as: asHref ? formatUrl(asHref) : asHref
      };
    });

    this.linkClicked = e => {
      var {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      var {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (true) {
      if (props.prefetch) {
        console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://err.sh/zeit/next.js/prefetch-true-deprecated');
      }
    }

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  getPaths() {
    var {
      pathname
    } = window.location;
    var {
      href: parsedHref,
      as: parsedAs
    } = this.formatUrls(this.props.href, this.props.as);
    var resolvedHref = (0, _url.resolve)(pathname, parsedHref);
    return [resolvedHref, parsedAs ? (0, _url.resolve)(pathname, parsedAs) : resolvedHref];
  }

  handleRef(ref) {
    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();
      var isPrefetched = prefetched[this.getPaths().join( // Join on an invalid URI character
      '%')];

      if (!isPrefetched) {
        this.cleanUpListeners = listenToIntersections(ref, () => {
          this.prefetch();
        });
      }
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch(options) {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    var paths = this.getPaths(); // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch

    _router.default.prefetch(paths[
    /* href */
    0], paths[
    /* asPath */
    1], options).catch(err => {
      if (true) {
        // rethrow to show invalid URL errors
        throw err;
      }
    });

    prefetched[paths.join( // Join on an invalid URI character
    '%')] = true;
  }

  render() {
    var {
      children
    } = this.props;
    var {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = _react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    var child = _react.Children.only(children);

    var props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch({
          priority: true
        });
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      }
    }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) { var rewriteUrlForNextExport; }

    return _react.default.cloneElement(child, props);
  }

}

if (true) {
  var warn = (0, _utils.execOnce)(console.error); // This module gets removed by webpack.IgnorePlugin

  var PropTypes = __webpack_require__(/*! prop-types */ "prop-types");

  var exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact"); // @ts-ignore the property is supported, when declaring it on the class it outputs an extra bit of code which is not needed.


  Link.propTypes = exact({
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
    replace: PropTypes.bool,
    shallow: PropTypes.bool,
    passHref: PropTypes.bool,
    scroll: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, (props, propName) => {
      var value = props[propName];

      if (typeof value === 'string') {
        warn("Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>");
      }

      return null;
    }]).isRequired
  });
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "./node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "./node_modules/next/dist/next-server/lib/router-context.js");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter.default;
/* global window */

var singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      var router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = function () {
    var router = getRouter();
    return router[field](...arguments);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, function () {
      var eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);
      var _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...arguments);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error("Error when running the Router event: " + eventField); // tslint:disable-next-line:no-console

          console.error(err.message + "\n" + err.stack);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


var createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  var _router = router;
  var instance = {};

  for (var property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = function () {
      return _router[field](...arguments);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return _react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    var name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = "withRouter(" + name + ")";
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/mitt.js":
/*!********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/mitt.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) Jason Miller (https://jasonformat.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

exports.default = mitt;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router-context.js":
/*!******************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router-context.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = __importStar(__webpack_require__(/*! react */ "react"));

exports.RouterContext = React.createContext(null);

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/router.js":
/*!*****************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/router.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");

const mitt_1 = __importDefault(__webpack_require__(/*! ../mitt */ "./node_modules/next/dist/next-server/lib/mitt.js"));

const utils_1 = __webpack_require__(/*! ../utils */ "./node_modules/next/dist/next-server/lib/utils.js");

const is_dynamic_1 = __webpack_require__(/*! ./utils/is-dynamic */ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

const route_matcher_1 = __webpack_require__(/*! ./utils/route-matcher */ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js");

const route_regex_1 = __webpack_require__(/*! ./utils/route-regex */ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js");

function addBasePath(path) {
  // variable is always a string
  const p = "";
  return path.indexOf(p) !== 0 ? p + path : path;
}

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

const prepareRoute = path => toRoute(!path || path === '/' ? '/index' : path);

function fetchNextData(pathname, query, isServerRender, cb) {
  let attempts = isServerRender ? 3 : 1;

  function getResponse() {
    return fetch(utils_1.formatWithValidation({
      // @ts-ignore __NEXT_DATA__
      pathname: `/_next/data/${__NEXT_DATA__.buildId}${pathname}.json`,
      query
    }), {
      // Cookies are required to be present for Next.js' SSG "Preview Mode".
      // Cookies may also be required for `getServerSideProps`.
      //
      // > `fetch` won’t send cookies, unless you set the credentials init
      // > option.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      //
      // > For maximum browser compatibility when it comes to sending &
      // > receiving cookies, always supply the `credentials: 'same-origin'`
      // > option instead of relying on the default.
      // https://github.com/github/fetch#caveats
      credentials: 'same-origin'
    }).then(res => {
      if (!res.ok) {
        if (--attempts > 0 && res.status >= 500) {
          return getResponse();
        }

        throw new Error(`Failed to load static props`);
      }

      return res.json();
    });
  }

  return getResponse().then(data => {
    return cb ? cb(data) : data;
  }).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      ;
      err.code = 'PAGE_LOAD_ERROR';
    }

    throw err;
  });
}

class Router {
  constructor(pathname, query, as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback
  }) {
    // Static Data Cache
    this.sdc = {};

    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', utils_1.formatWithValidation({
          pathname,
          query
        }), utils_1.getURL());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state && this.isSsr && e.state.as === this.asPath && url_1.parse(e.state.url).pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (true) {
        if (typeof url === 'undefined' || typeof as === 'undefined') {
          console.warn('`popstate` event triggered but `event.state` did not have `url` or `as` https://err.sh/zeit/next.js/popstate-state-empty');
        }
      }

      this.replace(url, as, options);
    };

    this._getStaticData = asPath => {
      const pathname = prepareRoute(url_1.parse(asPath).pathname);
      return  false ? undefined : fetchNextData(pathname, null, this.isSsr, data => this.sdc[pathname] = data);
    };

    this._getServerData = asPath => {
      let {
        pathname,
        query
      } = url_1.parse(asPath, true);
      pathname = prepareRoute(pathname);
      return fetchNextData(pathname, query, this.isSsr);
    }; // represents the current component key


    this.route = toRoute(pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname;
    this.query = query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    is_dynamic_1.isDynamicRoute(pathname) && __NEXT_DATA__.autoExport ? pathname : as;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    if (false) {} else {
      return url;
    }
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = Object.assign(Object.assign({}, data), {
      Component,
      __N_SSG: mod.__N_SSG,
      __N_SSP: mod.__N_SSP
    });
    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
   * Go back in history
   */


  back() {
    window.history.back();
  }
  /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new Promise((resolve, reject) => {
      if (!options._h) {
        this.isSsr = false;
      } // marking route changes as a navigation start entry


      if (utils_1.ST) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      const url = typeof _url === 'object' ? utils_1.formatWithValidation(_url) : _url;
      let as = typeof _as === 'object' ? utils_1.formatWithValidation(_as) : _as; // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, addBasePath(as), options);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = url_1.parse(url, true);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      }

      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if (is_dynamic_1.isDynamicRoute(route)) {
        const {
          pathname: asPathname
        } = url_1.parse(as);
        const routeRegex = route_regex_1.getRouteRegex(route);
        const routeMatch = route_matcher_1.getRouteMatcher(routeRegex)(asPathname);

        if (!routeMatch) {
          const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

          if (missingParams.length > 0) {
            if (true) {
              console.warn(`Mismatching \`as\` and \`href\` failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
            }

            return reject(new Error(`The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). ` + `Read more: https://err.sh/zeit/next.js/incompatible-href-as`));
          }
        } else {
          // Merge params into `query`, overwriting any specified in search
          Object.assign(query, routeMatch);
        }
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, addBasePath(as), options);

        if (true) {
          const appComp = this.components['/_app'].Component;
          window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
        }

        this.set(route, pathname, query, as, routeInfo);

        if (error) {
          Router.events.emit('routeChangeError', error, as);
          throw error;
        }

        Router.events.emit('routeChangeComplete', as);
        return resolve(true);
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || utils_1.getURL() !== as) {
      window.history[method]({
        url,
        as,
        options
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return Promise.resolve(cachedRouteInfo);
    }

    const handleError = (err, loadErrorFail) => {
      return new Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR' || loadErrorFail) {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(res => {
          const {
            page: Component
          } = res;
          const routeInfo = {
            Component,
            err
          };
          return new Promise(resolve => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolve(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolve(routeInfo);
            });
          });
        }).catch(err => handleError(err, true)));
      });
    };

    return new Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(res => resolve({
        Component: res.page,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }), reject);
    }).then(routeInfo => {
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "react-is");

        if (!isValidElementType(Component)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      return this._getData(() => __N_SSG ? this._getStaticData(as) : __N_SSP ? this._getServerData(as) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      })).then(props => {
        routeInfo.props = props;
        this.components[route] = routeInfo;
        return routeInfo;
      });
    }).catch(handleError);
  }

  set(route, pathname, query, as, data) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.notify(data);
  }
  /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
   * Prefetch page code, you may wait for the data during page rendering.
   * This feature only works in production!
   * @param url the href of prefetched page
   * @param asPath the as path of the prefetched page
   */


  prefetch(url, asPath = url, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = url_1.parse(url);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (true) {
        return;
      }

      Promise.all([this.pageLoader.prefetchData(url, asPath), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](toRoute(pathname))]).then(() => resolve(), reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return utils_1.loadGetInitialProps(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = mitt_1.default();

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
/*!***************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

exports.isDynamicRoute = isDynamicRoute;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
/*!******************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = decodeURIComponent;
    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

exports.getRouteMatcher = getRouteMatcher;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
/*!****************************************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/router/utils/route-regex.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = (normalizedRoute.replace(/\/$/, '') || '/').replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
    const isCatchAll = /^(\\\.){3}/.test($1);
    groups[$1 // Un-escape key
    .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '') // eslint-disable-next-line no-sequences
    ] = {
      pos: groupIndex++,
      repeat: isCatchAll
    };
    return isCatchAll ? '/(.+?)' : '/([^/]+?)';
  });
  return {
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups
  };
}

exports.getRouteRegex = getRouteRegex;

/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");
/**
 * Utils
 */


function execOnce(fn) {
  let used = false;
  let result = null;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}

exports.execOnce = execOnce;

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

exports.getLocationOrigin = getLocationOrigin;

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

exports.getURL = getURL;

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

exports.getDisplayName = getDisplayName;

function isResSent(res) {
  return res.finished || res.headersSent;
}

exports.isResSent = isResSent;

async function loadGetInitialProps(App, ctx) {
  var _a;

  if (true) {
    if ((_a = App.prototype) === null || _a === void 0 ? void 0 : _a.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://err.sh/zeit/next.js/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://err.sh/zeit/next.js/empty-object-getInitialProps`);
    }
  }

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (exports.urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "./pages/index-2.js":
/*!**************************!*\
  !*** ./pages/index-2.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Layout */ "./components/Layout.js");
/* harmony import */ var _components_HeaderTwo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/HeaderTwo */ "./components/HeaderTwo.js");
/* harmony import */ var _components_MobileMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/MobileMenu */ "./components/MobileMenu.js");
/* harmony import */ var _components_BannerTwo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/BannerTwo */ "./components/BannerTwo.js");
/* harmony import */ var _components_FunFacts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/FunFacts */ "./components/FunFacts.js");
/* harmony import */ var _components_CtaTwo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/CtaTwo */ "./components/CtaTwo.js");
/* harmony import */ var _components_CtaThree__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/CtaThree */ "./components/CtaThree.js");
/* harmony import */ var _components_Video__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Video */ "./components/Video.js");
/* harmony import */ var _components_Pricing__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Pricing */ "./components/Pricing.js");
/* harmony import */ var _components_AppShots__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/AppShots */ "./components/AppShots.js");
/* harmony import */ var _components_Features__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/Features */ "./components/Features.js");
/* harmony import */ var _components_Testimonials__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/Testimonials */ "./components/Testimonials.js");
/* harmony import */ var _components_BlogHome__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/BlogHome */ "./components/BlogHome.js");
/* harmony import */ var _components_Clients__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../components/Clients */ "./components/Clients.js");
/* harmony import */ var _components_CtaOne__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/CtaOne */ "./components/CtaOne.js");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/Footer */ "./components/Footer.js");
var _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/pages/index-2.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


















const HomePageTwo = () => {
  return __jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
    pageTitle: "Jironis",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 5
    }
  }, __jsx(_components_HeaderTwo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }
  }), __jsx(_components_MobileMenu__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }
  }), __jsx(_components_BannerTwo__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }), __jsx(_components_Features__WEBPACK_IMPORTED_MODULE_11__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }
  }), __jsx(_components_FunFacts__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 7
    }
  }), __jsx(_components_CtaTwo__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 7
    }
  }), __jsx(_components_CtaThree__WEBPACK_IMPORTED_MODULE_7__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  }), __jsx(_components_Video__WEBPACK_IMPORTED_MODULE_8__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }
  }), __jsx(_components_AppShots__WEBPACK_IMPORTED_MODULE_10__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }
  }), __jsx(_components_Pricing__WEBPACK_IMPORTED_MODULE_9__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }
  }), __jsx(_components_Testimonials__WEBPACK_IMPORTED_MODULE_12__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }
  }), __jsx(_components_Clients__WEBPACK_IMPORTED_MODULE_14__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 7
    }
  }), __jsx(_components_BlogHome__WEBPACK_IMPORTED_MODULE_13__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }
  }), __jsx(_components_CtaOne__WEBPACK_IMPORTED_MODULE_15__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }), __jsx(_components_Footer__WEBPACK_IMPORTED_MODULE_16__["default"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (HomePageTwo);

/***/ }),

/***/ 4:
/*!********************************!*\
  !*** multi ./pages/index-2.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/cln/src/skolplattformen/api/packages/site/pages/index-2.js */"./pages/index-2.js");


/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "react-countup":
/*!********************************!*\
  !*** external "react-countup" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-countup");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ }),

/***/ "react-modal-video":
/*!************************************!*\
  !*** external "react-modal-video" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-modal-video");

/***/ }),

/***/ "react-scroll":
/*!*******************************!*\
  !*** external "react-scroll" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-scroll");

/***/ }),

/***/ "react-visibility-sensor":
/*!******************************************!*\
  !*** external "react-visibility-sensor" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-visibility-sensor");

/***/ }),

/***/ "swiper":
/*!*************************!*\
  !*** external "swiper" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swiper");

/***/ }),

/***/ "swiper/react":
/*!*******************************!*\
  !*** external "swiper/react" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swiper/react");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=index-2.js.map