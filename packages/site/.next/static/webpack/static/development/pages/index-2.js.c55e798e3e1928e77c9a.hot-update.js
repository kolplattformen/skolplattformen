webpackHotUpdate("static/development/pages/index-2.js",{

/***/ "./components/Features.js":
/*!********************************!*\
  !*** ./components/Features.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swiper */ "./node_modules/swiper/swiper.esm.js");
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! swiper/react */ "./node_modules/swiper/swiper-react.esm.js");
/* harmony import */ var _SectionTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SectionTitle */ "./components/SectionTitle.js");
/* harmony import */ var _FeatureCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FeatureCard */ "./components/FeatureCard.js");
/* harmony import */ var _assets_img_icons_project_management_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/img/icons/project-management.svg */ "./assets/img/icons/project-management.svg");
/* harmony import */ var _assets_img_icons_project_management_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_img_icons_project_management_svg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _assets_img_icons_solution_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/img/icons/solution.svg */ "./assets/img/icons/solution.svg");
/* harmony import */ var _assets_img_icons_solution_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_img_icons_solution_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _assets_img_icons_planning_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/img/icons/planning.svg */ "./assets/img/icons/planning.svg");
/* harmony import */ var _assets_img_icons_planning_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_img_icons_planning_svg__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../assets/img/icons/goal.svg */ "./assets/img/icons/goal.svg");
/* harmony import */ var _assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_10__);


var _this = undefined,
    _jsxFileName = "/Users/cln/src/skolplattformen/api/packages/site/components/Features.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




swiper__WEBPACK_IMPORTED_MODULE_3__["default"].use([swiper__WEBPACK_IMPORTED_MODULE_3__["Pagination"], swiper__WEBPACK_IMPORTED_MODULE_3__["Autoplay"]]);






var FEATURES_DATA = [{
  title: "Öppen källkod",
  text: "Har du egna förslag på förbättringar? Du kan hjälpa till.",
  image: _assets_img_icons_project_management_svg__WEBPACK_IMPORTED_MODULE_7___default.a
}, {
  title: "Bygger på ny teknik",
  text: "Till skillnad från den gamla skolplattformen så bygger den öppna på senaste tekniken.",
  image: _assets_img_icons_solution_svg__WEBPACK_IMPORTED_MODULE_8___default.a
}, {
  title: "Det här är bara början",
  text: "Vi hoppas med denna app inspirera till fler initiativ i hela den offentliga digitaliseringen.",
  image: _assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_10___default.a
}, {
  title: "Stödjer fler skolsystem",
  text: "Just nu stöds bara Stockholm Stads skolplattform men med din hjälp kan fler skolplattformar integreras så att du slipper logga in i flera appar om du har barn i olika skolor.",
  image: _assets_img_icons_planning_svg__WEBPACK_IMPORTED_MODULE_9___default.a
}, {
  title: "New Artwork \n Unveiled",
  text: "There are many variations of passages of lorem Ipsum but majority have suffered.",
  image: _assets_img_icons_project_management_svg__WEBPACK_IMPORTED_MODULE_7___default.a
}, {
  title: "Company Growth \n Strategy",
  text: "There are many variations of passages of lorem Ipsum but majority have suffered.",
  image: _assets_img_icons_solution_svg__WEBPACK_IMPORTED_MODULE_8___default.a
},, {
  title: "Company Growth \n Strategy",
  text: "There are many variations of passages of lorem Ipsum but majority have suffered.",
  image: _assets_img_icons_planning_svg__WEBPACK_IMPORTED_MODULE_9___default.a
}, {
  title: "Creative App \n Display",
  text: "There are many variations of passages of lorem Ipsum but majority have suffered.",
  image: _assets_img_icons_goal_svg__WEBPACK_IMPORTED_MODULE_10___default.a
}];

var Features = function Features() {
  var swiperParams = {
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
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 5
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Container"], {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 7
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "justify-content-center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    md: 12,
    lg: 8,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 11
    }
  }, __jsx(_SectionTitle__WEBPACK_IMPORTED_MODULE_5__["default"], {
    title: "Enkelhet och snabbhet",
    text: "Vi vill att det ska vara enkelt att f\xE5 en \xF6verblick \xF6ver vad som h\xE4nder i skolan. Vi har gjort allt f\xF6r att ge dig en enkel och snabb \xF6versikt \xF6ver alla dina barn och det som \xE4r aktuellt just nu i skolan.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 113,
      columnNumber: 13
    }
  }))), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "justify-content-center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 119,
      columnNumber: 9
    }
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    xl: 10,
    lg: 12,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 120,
      columnNumber: 11
    }
  }, __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_4__["Swiper"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "feature-carousel"
  }, swiperParams, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121,
      columnNumber: 13
    }
  }), FEATURES_DATA.map(function (feature, index) {
    return __jsx(swiper_react__WEBPACK_IMPORTED_MODULE_4__["SwiperSlide"], {
      key: "feature-post-".concat(index),
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 123,
        columnNumber: 17
      }
    }, __jsx(_FeatureCard__WEBPACK_IMPORTED_MODULE_6__["default"], {
      title: feature.title,
      text: feature.text,
      image: feature.image,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 124,
        columnNumber: 19
      }
    }));
  })), __jsx("div", {
    id: "features-paginations",
    className: "swiper-pagination d-flex justify-content-center align-items-center",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 132,
      columnNumber: 13
    }
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = (Features);

/***/ })

})
//# sourceMappingURL=index-2.js.c55e798e3e1928e77c9a.hot-update.js.map