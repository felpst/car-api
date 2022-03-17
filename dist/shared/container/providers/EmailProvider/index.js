"use strict";

var _tsyringe = require("tsyringe");

var _EtherealEmailProvider = require("./implementations/EtherealEmailProvider");

var _SESEmailProvider = require("./implementations/SESEmailProvider");

const emailProvider = {
  ethereal: _tsyringe.container.resolve(_EtherealEmailProvider.EtherealEmailProvider),
  ses: _tsyringe.container.resolve(_SESEmailProvider.SESEmailProvider)
};

_tsyringe.container.registerInstance("EmailProvider", emailProvider[process.env.EMAIL_PROVIDER]);