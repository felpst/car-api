"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserAddAvatar1626957961762 = void 0;

var _typeorm = require("typeorm");

class AlterUserAddAvatar1626957961762 {
  async up(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true // This can be null because the user may or not set an avatar.

    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("users", "avatar");
  }

}

exports.AlterUserAddAvatar1626957961762 = AlterUserAddAvatar1626957961762;