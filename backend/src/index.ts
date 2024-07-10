import {sequelize} from './config/database';
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Server is running on port ${PORT}`);
});
