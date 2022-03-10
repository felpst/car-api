"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteFile = async filename => {
  try {
    await _fs.default.promises.stat(filename); // Verify if a file exists in the dict passed
  } catch {
    return;
  }

  await _fs.default.promises.unlink(filename); // unlink is responsible to remove the file
};

exports.deleteFile = deleteFile;