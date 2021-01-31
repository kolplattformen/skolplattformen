webpackHotUpdate("static/development/pages/index-2.js",{

/***/ "./components/FunFacts.js":
/*!********************************!*\
  !*** ./components/FunFacts.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-countup */ "./node_modules/react-countup/build/index.js");
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_countup__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_visibility_sensor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-visibility-sensor */ "./node_modules/react-visibility-sensor/dist/visibility-sensor.js");
/* harmony import */ var react_visibility_sensor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_visibility_sensor__WEBPACK_IMPORTED_MODULE_3__);
var _this = undefined,
    _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/FunFacts.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var FUNFACTS_DATA = [{
  count: "1000000000",
  title: "Kostade Skolplattformen"
}, {
  count: "6389",
  title: "Likes"
}, {
  count: "3",
  title: "5 stjärniga reviews"
}, {
  count: "7",
  title: "År att utveckla"
}];

var FunFacts = function FunFacts() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    startCounter: false
  }),
      counter = _useState[0],
      setCounter = _useState[1];

  var onVisibilityChange = function onVisibilityChange(isVisible) {
    if (isVisible) {
      setCounter({
        startCounter: true
      });
    }
  };

  return __jsx("section", {
    className: "border-top pt-120 pb-80",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  }, FUNFACTS_DATA.map(function (funfact, index) {
    return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
      md: 3,
      sm: 6,
      key: "funfact-post-".concat(index),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41,
        columnNumber: 13
      }
    }, __jsx("div", {
      className: "single-counter text-center",
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 15
      }
    }, __jsx("span", {
      className: "counter",
      __self: _this,
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
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44,
        columnNumber: 19
      }
    }, __jsx(react_countup__WEBPACK_IMPORTED_MODULE_2___default.a, {
      end: counter.startCounter ? funfact.count : 0,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 21
      }
    }))), __jsx("p", {
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52,
        columnNumber: 17
      }
    }, funfact.title)));
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (FunFacts);

/***/ })

})
//# sourceMappingURL=index-2.js.4bdbb81c1e77cf5cb650.hot-update.js.map