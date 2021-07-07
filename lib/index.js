"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("url-polyfill");

var _utmStorage = _interopRequireDefault(require("./utmStorage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_name", "utm_term", "gclid"];
var storage = null;

function createStorageIfNotCreated() {
  if (!storage) {
    storage = new _utmStorage["default"]();
  }
}

var UTMParams = /*#__PURE__*/function () {
  function UTMParams() {
    _classCallCheck(this, UTMParams);
  }

  _createClass(UTMParams, null, [{
    key: "parse",
    value:
    /**
     * Get utm params allowed by GA
     *
     * @return {Object}
     */
    function parse() {
      createStorageIfNotCreated();
      var urlSearch = new URL(window.location);
      var urlParams = new URLSearchParams(urlSearch.search);
      var parsedParams = {};
      allowedParams.forEach(function (key) {
        var paramValue = urlParams.get(key);

        if (paramValue) {
          parsedParams[key] = paramValue;
        }
      });
      return parsedParams;
    }
    /**
     * Save UTM params in localStorage
     *
     * @param {Object} params
     * @return {Boolean}
     */

  }, {
    key: "save",
    value: function save(params) {
      createStorageIfNotCreated();

      if (!params || !allowedParams.some(function (key) {
        return !!params[key];
      })) {
        return false;
      }

      try {
        storage.setItem("utmSavedParams", JSON.stringify(params));
        return true;
      } catch (e) {
        throw new Error(e);
        return false;
      }
    }
    /**
     * Reads UTM params from localStorage
     *
     * @return {Object}
     */

  }, {
    key: "get",
    value: function get() {
      createStorageIfNotCreated();
      var savedParams = storage.getItem("utmSavedParams");

      if (savedParams) {
        return JSON.parse(savedParams);
      }

      return null;
    }
  }]);

  return UTMParams;
}();

var _default = UTMParams;
exports["default"] = _default;