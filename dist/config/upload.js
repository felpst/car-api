"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _multer = _interopRequireDefault(require("multer"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A library to deal with cryptography
const tmpFolder = (0, _path.resolve)(__dirname, "..", "..", "tmp"); // I am getting my current directory, and then I am backing by two directories (..), and after I am setting it to the folder variable.

var _default = {
  tmpFolder,
  storage: _multer.default.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = _crypto.default.randomBytes(16).toString("hex");

      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null, fileName); // the first parameter that the callback function receives is an error so in this case will be null.
    }
  })
};
exports.default = _default;