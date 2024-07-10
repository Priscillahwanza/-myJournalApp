"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = __importDefault(require("./User"));
class JournalEntry extends sequelize_1.Model {
}
JournalEntry.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    content: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    category: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: 'journalEntries',
    sequelize: database_1.sequelize,
});
JournalEntry.belongsTo(User_1.default, { foreignKey: 'userId' });
exports.default = JournalEntry;
