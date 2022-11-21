import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import routes from './app/routes';

export const prod = process.env.NODE_ENV === 'production';
import * as path from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Course } from './app/entities/Course';
import { User } from './app/entities/User';
// establish database connection
export const AppDataSource = new DataSource({
  name: 'sathish',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root', // review
  password: '', // review
  database: 'demo_school',
  synchronize: true,
  logging: false,
  entities: [Course, User],
  // Production Mode
  ...(prod && {
    host: '193.122.144.0',
    username: 'root', // review
    password: 'mypass', // review
    database: 'demo_school',
    logging: true,
    synchronize: true,
    entities: [path.resolve(__dirname, '../entity/*.{ts,js}')],
  }),
});

const CLIENT_BUILD_PATH = path.join(__dirname, '../frontend');

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => {
    if (error.sqlMessage === "Unknown database 'demo_school'") {
      console.log('test', error.sqlMessage);
    }
  });

const app = express();
// Express configuration
app.set('port', process.env.PORT || 3000); // TODO - prod 8080 // local - 3000
app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: any, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/api/', routes);
app.get('*', (request, response) => {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const port = process.env.PORT || process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
