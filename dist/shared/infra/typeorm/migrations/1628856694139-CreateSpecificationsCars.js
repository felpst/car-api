"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsCars1628856694139 = void 0;

var _typeorm = require("typeorm");

class CreateSpecificationsCars1628856694139 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specifications_cars",
      columns: [{
        name: "car_id",
        type: "uuid"
      }, {
        name: "specifications_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
    await queryRunner.createForeignKey("specifications_cars", new _typeorm.TableForeignKey({
      name: "FKSpecificationCar",
      referencedTableName: "specifications",
      referencedColumnNames: ["id"],
      columnNames: ["specifications_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
    await queryRunner.createForeignKey("specifications_cars", new _typeorm.TableForeignKey({
      name: "FKCarSpecification",
      referencedTableName: "cars",
      referencedColumnNames: ["id"],
      columnNames: ["car_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  } // Since I am creating first the table and columns, and then the foreign keys, the drop must be executed in reverse of the creation, first dorpping the forign keys and then the table.


  async down(queryRunner) {
    await queryRunner.dropForeignKey("specifications_cars", "FKCarSpecification");
    await queryRunner.dropForeignKey("specifications_cars", "FKSpecificationCar");
    await queryRunner.dropTable("specifications_cars");
  }

}

exports.CreateSpecificationsCars1628856694139 = CreateSpecificationsCars1628856694139;