"use strict";

var _app = require("./app");

_app.app.listen(3333, () => console.log("Server is running")); // I have separated the server from the app, so I can access the app without starting the server.