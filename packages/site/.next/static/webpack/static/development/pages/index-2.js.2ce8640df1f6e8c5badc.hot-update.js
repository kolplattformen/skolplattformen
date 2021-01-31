webpackHotUpdate("static/development/pages/index-2.js",{

/***/ "./components/HeaderTwo.js":
/*!*********************************!*\
  !*** ./components/HeaderTwo.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NavLinks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavLinks */ "./components/NavLinks.js");
/* harmony import */ var _assets_img_logo2_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/img/logo2.png */ "./assets/img/logo2.png");
/* harmony import */ var _assets_img_logo2_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_img_logo2_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/img/logo.png */ "./assets/img/logo.png");
/* harmony import */ var _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_img_logo_png__WEBPACK_IMPORTED_MODULE_3__);
var _this = undefined,
    _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/HeaderTwo.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var HeaderHome = function HeaderHome(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      sticky = _useState[0],
      setSticky = _useState[1];

  var handleScroll = function handleScroll() {
    if (window.scrollY > 70) {
      setSticky(true);
    } else if (window.scrollY < 70) {
      setSticky(false);
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    window.addEventListener("scroll", handleScroll);
    mobileMenu();
    return function () {
      mobileMenu();
      window.removeEventListener("scroll", handleScroll);
    };
  });

  var mobileMenu = function mobileMenu() {
    document.querySelector(".side-menu__toggler").addEventListener("click", function (e) {
      document.querySelector(".side-menu__block").classList.toggle("active");
      e.preventDefault();
    }); //Close Mobile Menu

    var sideMenuCloser = document.querySelectorAll(".side-menu__close-btn, .side-menu__block-overlay");
    sideMenuCloser.forEach(function (sideMenuCloserBtn) {
      sideMenuCloserBtn.addEventListener("click", function (e) {
        document.querySelector(".side-menu__block").classList.remove("active");
        e.preventDefault();
      });
    });
  };

  return __jsx("header", {
    className: "header ".concat(props.extraClassName),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "main-header inner-header header-2 ".concat(sticky === true ? "sticky fadeInDown" : " "),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "main-menu-wrap",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "row align-items-center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "col-xl-3 col-lg-3 col-md-4 col-6",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "logo",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "/",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 19
    }
  }, __jsx("img", {
    "class": "main-logo2",
    src: _assets_img_logo2_png__WEBPACK_IMPORTED_MODULE_2___default.a,
    alt: "jironis",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 21
    }
  }), __jsx("img", {
    "class": "sticky-logo",
    src: _assets_img_logo_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    alt: "jironis",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 21
    }
  })))), __jsx("div", {
    className: "col-xl-6 col-lg-6 col-md-4 col-6 menu-button",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "menu--inner-area clearfix",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 17
    }
  }, __jsx("div", {
    className: "menu-wraper",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 19
    }
  }, __jsx("nav", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73,
      columnNumber: 21
    }
  }, __jsx("div", {
    className: "header-menu",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 23
    }
  }, __jsx("div", {
    id: "menu-button",
    className: "menu-opened side-menu__toggler",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 25
    }
  }, __jsx("i", {
    className: "fa fa-bars",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 27
    }
  })), __jsx(_NavLinks__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 25
    }
  })))))), __jsx("div", {
    className: "col-lg-3 col-md-4 col-sm-5 d-md-block d-none",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 15
    }
  }, __jsx("div", {
    className: "urgent-call text-right",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 17
    }
  }, __jsx("a", {
    href: "#",
    className: "btn",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 19
    }
  }, "Ladda ner"))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (HeaderHome);

/***/ })

})
//# sourceMappingURL=index-2.js.2ce8640df1f6e8c5badc.hot-update.js.map