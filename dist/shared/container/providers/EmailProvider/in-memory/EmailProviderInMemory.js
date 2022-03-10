"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailProviderInMemory = void 0;

class EmailProviderInMemory {
  constructor() {
    this.message = [];
  }

  async sendEmail(to, subject, variables, path) {
    this.message.push({
      to,
      subject,
      variables,
      path
    });
  }

}

exports.EmailProviderInMemory = EmailProviderInMemory;