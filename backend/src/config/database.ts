import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('journalapp', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;