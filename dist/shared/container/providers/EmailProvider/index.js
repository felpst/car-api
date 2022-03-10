"use strict";

var _tsyringe = require("tsyringe");

var _EtherealEmailProvider = require("./implementations/EtherealEmailProvider");

var _SesEmailProvider = require("./implementations/SesEmailProvider");

const emailProvider = {
  ethereal: _tsyringe.container.resolve(_EtherealEmailProvider.EtherealEmailProvider),
  ses: _tsyringe.container.resolve(_SesEmailProvider.SESEmailProvider)
};

_tsyringe.container.registerInstance("EmailProvider", emailProvider[process.env.EMAIL_PROVIDER]);