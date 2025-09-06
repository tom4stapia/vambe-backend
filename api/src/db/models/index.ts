import { Sequelize, Options, Dialect } from 'sequelize';
import { initClient, Client } from './Client';
import { initSeller, Seller } from './Seller';
import { initMeeting, Meeting } from './Meeting';

interface DatabaseConfig extends Options {
  username?: string;
  password?: string;
  database?: string;
  dialect: Dialect;
  use_env_variable?: string;
}

interface Database {
  Client: typeof Client;
  Seller: typeof Seller;
  Meeting: typeof Meeting;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const env = process.env.NODE_ENV || 'development';
import configFile from '../config/config';
const config: DatabaseConfig = configFile[env as keyof typeof configFile];

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config as Options);
} else {
  sequelize = new Sequelize(
    config.database as string,
    config.username as string,
    config.password as string,
    config as Options,
  );
}

// Initialize models
const ClientModel = initClient(sequelize);
const SellerModel = initSeller(sequelize);
const MeetingModel = initMeeting(sequelize);

// Setup associations
const models = {
  Client: ClientModel,
  Seller: SellerModel,
  Meeting: MeetingModel
};

// Define associations
Object.values(models).forEach((model: any) => {
  if (model.associate) {
    model.associate(models);
  }
});

const db: Database = {
  Client: ClientModel,
  Seller: SellerModel,
  Meeting: MeetingModel,
  sequelize,
  Sequelize
};

export default db;