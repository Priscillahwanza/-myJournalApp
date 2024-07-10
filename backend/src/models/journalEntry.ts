import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../config/database';
import User from './User';

class JournalEntry extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public category!: string;
  public date!: Date;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

JournalEntry.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    category: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'journalEntries',
    sequelize,
  }
);

JournalEntry.belongsTo(User, { foreignKey: 'userId' });

export default JournalEntry;
