webpackHotUpdate("static/development/pages/index-2.js",{

/***/ "./assets/img/feature/author3.png":
false,

/***/ "./assets/img/wass.png":
/*!*****************************!*\
  !*** ./assets/img/wass.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/_next/static/images/wass-e1b84629231188d449f53d38901ce355.png";

/***/ }),

/***/ "./components/Testimonials.js":
/*!************************************!*\
  !*** ./components/Testimonials.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper/react */ "./node_modules/swiper/swiper-react.esm.js");
/* harmony import */ var _assets_img_wass_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/img/wass.png */ "./assets/img/wass.png");
/* harmony import */ var _assets_img_wass_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_img_wass_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_img_feature_author2_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/img/feature/author2.png */ "./assets/img/feature/author2.png");
/* harmony import */ var _assets_img_feature_author2_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_img_feature_author2_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_img_feature_author1_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/img/feature/author1.png */ "./assets/img/feature/author1.png");
/* harmony import */ var _assets_img_feature_author1_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_img_feature_author1_png__WEBPACK_IMPORTED_MODULE_6__);


var _this = undefined,
    _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/Testimonials.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;






swiper__WEBPACK_IMPORTED_MODULE_2__["default"].use([swiper__WEBPACK_IMPORTED_MODULE_2__["Autoplay"], swiper__WEBPACK_IMPORTED_MODULE_2__["Thumbs"], swiper__WEBPACK_IMPORTED_MODULE_2__["Navigation"]]);

var Testimonials = function Testimonials() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      thumbsSwiper = _useState[0],
      setThumbsSwiper = _useState[1];

  var testimmonialsParams = {
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
  var thumbnailsParam = {
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
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 5
    }
  }, __jsx("div", {
    className: "container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "row justify-content-center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "col-md-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "testimonial-author-arousel text-center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "testimonial-author-inner",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51,
      columnNumber: 15
    }
  }, __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["Swiper"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "author-carousel",
    onSwiper: setThumbsSwiper
  }, thumbnailsParam, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 17
    }
  }), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    className: "single-author-imge",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 19
    }
  }, __jsx("img", {
    src: _assets_img_wass_png__WEBPACK_IMPORTED_MODULE_4___default.a,
    alt: "",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 21
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    className: "single-author-imge",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 19
    }
  }, __jsx("img", {
    src: _assets_img_feature_author2_png__WEBPACK_IMPORTED_MODULE_5___default.a,
    alt: "",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 21
    }
  })), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    className: "single-author-imge",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 19
    }
  }, __jsx("img", {
    src: _assets_img_feature_author1_png__WEBPACK_IMPORTED_MODULE_6___default.a,
    alt: "",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 21
    }
  }))))), __jsx("div", {
    className: "testimonial-author-comment text-center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 13
    }
  }, __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["Swiper"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "author-comment-carousel",
    thumbs: {
      swiper: thumbsSwiper
    }
  }, testimmonialsParams, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 15
    }
  }), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    className: "single-author-comment",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 17
    }
  }, __jsx("h4", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 19
    }
  }, "This is due to their excellent service, competitive", __jsx("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 21
    }
  }), " pricing and customer support. It\u2019s throughly", __jsx("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80,
      columnNumber: 21
    }
  }), " refresing to get such a personal touch."), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 19
    }
  }, "Shirley Smith")), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    className: "single-author-comment",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85,
      columnNumber: 17
    }
  }, __jsx("h4", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86,
      columnNumber: 19
    }
  }, "This is due to their excellent service, competitive", __jsx("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 21
    }
  }), " pricing and customer support. It\u2019s throughly", __jsx("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 21
    }
  }), " refresing to get such a personal touch."), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 19
    }
  }, "Shirley Smith")), __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_3__["SwiperSlide"], {
    className: "single-author-comment",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 17
    }
  }, __jsx("h4", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 19
    }
  }, "This is due to their excellent service, competitive", __jsx("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 21
    }
  }), " pricing and customer support. It\u2019s throughly", __jsx("br", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 21
    }
  }), " refresing to get such a personal touch."), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 19
    }
  }, "Shirley Smith"))), __jsx("div", {
    className: "testimonial-author-comment-nav",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 15
    }
  }, __jsx("button", {
    id: "testi-swiper-button-prev",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 17
    }
  }, __jsx("i", {
    className: "fa fa-angle-left",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 19
    }
  })), __jsx("button", {
    id: "testi-swiper-button-next",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106,
      columnNumber: 17
    }
  }, __jsx("i", {
    className: "fa fa-angle-right",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 19
    }
  }))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Testimonials);

/***/ })

})
//# sourceMappingURL=index-2.js.c6d63c666f7e199baffe.hot-update.js.map